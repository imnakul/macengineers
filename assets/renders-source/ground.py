"""Bake physically-attached floor shadows under transparent product renders.

The product pixels are never modified: a shadow layer is built from hand-picked
floor touchpoints and composited *underneath* the render.

Per touchpoint: a tight dark contact shadow plus a softer spread.
Per group (one machine, one person, one tool): the floor area enclosed by its
touchpoints is darkened as occlusion, with a wide faint falloff. Because those
touchpoints already sit on the floor plane in the render's perspective, the
shadow follows the real footprint and viewing angle.
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

from detect import BAND, segments

SRC = Path(sys.argv[1])
OUT = Path(sys.argv[2])
PREVIEW = Path(sys.argv[3])
OUT.mkdir(parents=True, exist_ok=True)
PREVIEW.mkdir(parents=True, exist_ok=True)

INK = (17, 21, 28)  # near-black with a faint cool cast, matching the page ink without tinting the floor blue
Touch = tuple[int, int, int]  # x0, x1, floor y

# Groups of touchpoints: detected segment indices (int) or manual (x0, x1, y) tuples.
CONFIG: dict[str, dict] = {
    "jacketed-reactor-vessel.png": {"groups": [[0, 1, 2, 3, 5, 6]]},
    "agitated-mixing-vessel-cutaway.png": {"groups": [[0, 1, 5, 6]]},
    "conical-storage-silo.png": {"groups": [[0, 1, 2, 4, 6, (712, 742, 882)]]},
    "hydraulic-lift-disperser.png": {"groups": [[0, 1, 2, 7, 9, 12, 14, 15]]},
    "screw-conveyor-hopper.png": {"groups": [[1, 2, 4, 5, (510, 585, 853), (922, 997, 808)]]},
    "commissioning-crew.png": {
        "groups": [[0, 1, 2, 4], [5, 6], [7, 9], [10, 11, 12], [14, 15]],
    },
    "site-erection-crew.png": {
        # Right-hand worker's feet are cropped at the canvas edge: no padding, the plate bleeds them off instead.
        "pad": 0,
        "groups": [[0], [1], [2], [3, 4], [5], [6, 7], [8, 9], [11, 12, (510, 600, 954)], [13, 14]],
    },
    "turnkey-system-cutout.png": {"groups": [[1, 3, 5, 7, 9, 11, 13]]},
    # Base is cropped in the source; it bleeds off the plate instead.
    "design-engineering-desk.png": {"pad": 0, "groups": []},
}
DEFAULT_PAD = 72


def blur(img: Image.Image, radius: float) -> np.ndarray:
    return np.asarray(img.filter(ImageFilter.GaussianBlur(radius)), dtype=np.float32) / 255


def hull(points: list[tuple[float, float]]) -> list[tuple[float, float]]:
    pts = sorted(set(points))
    if len(pts) <= 2:
        return pts

    def cross(o, a, b):
        return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])

    lower: list = []
    for p in pts:
        while len(lower) >= 2 and cross(lower[-2], lower[-1], p) <= 0:
            lower.pop()
        lower.append(p)
    upper: list = []
    for p in reversed(pts):
        while len(upper) >= 2 and cross(upper[-2], upper[-1], p) <= 0:
            upper.pop()
        upper.append(p)
    return lower[:-1] + upper[:-1]


def ground(path: Path) -> Image.Image:
    cfg = CONFIG.get(path.name, {"groups": []})
    pad = cfg.get("pad", DEFAULT_PAD)
    src = Image.open(path).convert("RGBA")
    w, h = src.size
    canvas = Image.new("RGBA", (w, h + pad), (0, 0, 0, 0))
    canvas.paste(src, (0, 0))
    if not cfg["groups"]:
        return canvas

    mask = np.asarray(src.getchannel("A")) > 150
    detected = segments(mask, BAND)
    size = canvas.size
    scale = max(w, h) / 1448

    contact = Image.new("L", size, 0)
    spread = Image.new("L", size, 0)
    occlusion = Image.new("L", size, 0)
    dc, ds, do = ImageDraw.Draw(contact), ImageDraw.Draw(spread), ImageDraw.Draw(occlusion)

    for group in cfg["groups"]:
        touches: list[Touch] = [detected[t] if isinstance(t, int) else t for t in group]
        corners: list[tuple[float, float]] = []
        for x0, x1, y in touches:
            xc, half = (x0 + x1) / 2, max((x1 - x0) / 2, 4)
            ry = max(6.0, half * 0.2)
            # Centred just above the lowest pixel, so the shadow sits under the foot plate, not below it.
            dc.ellipse([xc - half * 1.2, y - ry * 1.7, xc + half * 1.2, y + ry * 0.15], fill=255)
            rs = max(16.0, half * 0.5)
            ds.ellipse([xc - half * 2.6, y - rs * 0.95, xc + half * 2.6, y + rs * 0.6], fill=255)
            corners += [(x0 - 4, y - 2), (x1 + 4, y - 2), (x0, y + 4), (x1, y + 4)]
        if len(touches) > 1:
            poly = hull(corners)
            do.polygon(poly, fill=255) if len(poly) >= 3 else do.line(poly, fill=255, width=int(14 * scale))

    # Tuned for display at ~15-35% scale: sub-pixel detail vanishes there, so every layer is broad and firm.
    c = blur(contact, 3.5 * scale)
    s = blur(spread, 14 * scale)
    o = blur(occlusion, 20 * scale)
    a = blur(occlusion.filter(ImageFilter.MaxFilter(41)), 50 * scale)

    shadow = 1 - (1 - 0.92 * c) * (1 - 0.55 * s) * (1 - 0.5 * o) * (1 - 0.32 * a)
    shadow = np.clip(shadow, 0, 0.88)

    layer = np.zeros((size[1], size[0], 4), np.uint8)
    layer[..., :3] = INK
    layer[..., 3] = (shadow * 255).astype(np.uint8)
    out = Image.fromarray(layer, "RGBA")
    out.alpha_composite(canvas)
    return out


def preview(img: Image.Image) -> Image.Image:
    bg = Image.new("RGBA", img.size, (236, 240, 245, 255))
    bg.alpha_composite(img)
    w, h = bg.size
    return bg.convert("RGB").resize((300, round(300 * h / w)), Image.LANCZOS)


if __name__ == "__main__":
    for p in sorted(q for q in SRC.glob("*.png") if not q.name.startswith("hero-")):
        result = ground(p)
        result.save(OUT / p.name, optimize=True)
        preview(result).save(PREVIEW / (p.stem + ".jpg"), quality=90)
        print("grounded", p.name, result.size)
