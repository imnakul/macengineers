"""Find candidate floor touchpoints (runs of columns whose lowest solid pixel is near the floor) and draw them."""
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw

SRC = Path(sys.argv[1])
OUT = Path(sys.argv[2])
OUT.mkdir(parents=True, exist_ok=True)
BAND = 0.2


def segments(mask: np.ndarray, band_frac: float) -> list[tuple[int, int, int]]:
    H, W = mask.shape
    rows = np.where(mask.any(axis=1))[0]
    top, bottom = rows.min(), rows.max()
    has = mask.any(axis=0)
    lowest = np.where(has, H - 1 - mask[::-1].argmax(axis=0), -1)
    ok = has & (lowest >= bottom - band_frac * (bottom - top))
    segs: list[tuple[int, int, int]] = []
    start = None
    for x in range(W + 1):
        cont = x < W and ok[x] and start is not None and abs(int(lowest[x]) - int(lowest[x - 1])) <= 4
        if start is not None and not cont:
            x1 = x - 1
            if x1 - start >= 5:
                segs.append((start, x1, int(lowest[start: x1 + 1].max())))
            start = None
        if x < W and ok[x] and start is None:
            start = x
    return segs


if __name__ == "__main__":
    for p in sorted(SRC.glob("*.png")):
        im = Image.open(p).convert("RGBA")
        mask = np.asarray(im.getchannel("A")) > 150
        segs = segments(mask, BAND)
        bg = Image.new("RGBA", im.size, (236, 240, 245, 255))
        bg.alpha_composite(im)
        d = ImageDraw.Draw(bg)
        for i, (x0, x1, y) in enumerate(segs):
            d.line([(x0, y + 3), (x1, y + 3)], fill=(255, 0, 80, 255), width=5)
            d.text(((x0 + x1) // 2 - 4, y + 8), str(i), fill=(255, 0, 80, 255), font_size=26)
        h = im.size[1]
        bg.crop((0, int(h * 0.55), im.size[0], h)).convert("RGB").resize((im.size[0] * 2 // 3, int(h * 0.45) * 2 // 3)).save(OUT / (p.stem + ".jpg"))
        print(p.name, segs)
