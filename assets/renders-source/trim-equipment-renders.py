"""Trim transparent padding around the equipment renders used in the gallery.

Each render is cut to the bounding box of its visible pixels (the baked floor shadow included)
plus a small margin, so every machine fills its frame consistently; faint shadow/haze pixels are
feathered out toward the edges so no straight cut shows.

Usage: python trim-equipment-renders.py <out_dir> <render.png> [<render.png> ...]
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image

OUT = Path(sys.argv[1])
OUT.mkdir(parents=True, exist_ok=True)
MARGIN = 0.04  # of the object's size, per side
EDGE = 0.06  # feather width, as a fraction of the output size
FEATHER_BELOW = 60  # alpha below which a pixel counts as shadow/haze

for src in map(Path, sys.argv[2:]):
    im = Image.open(src).convert("RGBA")
    alpha = np.asarray(im.getchannel("A"))
    ys, xs = np.where(alpha > 8)
    x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()
    mx, my = int((x1 - x0) * MARGIN), int((y1 - y0) * MARGIN)
    box = (max(x0 - mx, 0), max(y0 - my, 0), min(x1 + mx + 1, im.width), min(y1 + my // 2 + 1, im.height))
    out = im.crop(box)
    # Faint pixels (baked floor shadow, matting haze) would stop in a straight line at the crop edge
    # and outline the file's rectangle on a tinted background, so they fade to zero near every edge.
    # Solid equipment pixels (alpha >= FEATHER_BELOW) are never changed.
    arr = np.asarray(out).copy()
    h, w = arr.shape[:2]
    fx = np.clip(np.minimum(np.arange(w), np.arange(w)[::-1]) / (w * EDGE), 0, 1)
    fy = np.clip(np.minimum(np.arange(h), np.arange(h)[::-1]) / (h * EDGE), 0, 1)
    ramp = np.minimum(fy[:, None], fx[None, :])
    a = arr[..., 3].astype(np.float32)
    faint = a < FEATHER_BELOW
    arr[..., 3] = np.where(faint, a * ramp, a).astype(np.uint8)
    out = Image.fromarray(arr)
    out.save(OUT / src.name, optimize=True)
    print(src.name, im.size, "->", out.size)
