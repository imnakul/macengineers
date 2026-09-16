"""Prepare an outpainted factory photo (already a full scene) as the full-screen hero background.

Only lossless-looking edits, no stretching or smearing:
- Right: trim the empty margin past the control panel (keep x < KEEP_RIGHT), so the machine can
  sit against the right edge.
- Top: mirror the photo's own top TOP rows upward. Those rows are pure roof glazing (the agitator
  motor starts lower), so the mirror is seamless and reads as more roof.
- Left: mirror the first LEFT columns (plant hall, under the copy wash) so the machine starts at
  ~50% of the canvas width.

Usage: python build-hero-factory-direct.py <source.png> <out.jpg>
"""
import sys

import numpy as np
from PIL import Image

SRC, OUT = sys.argv[1], sys.argv[2]
KEEP_RIGHT = 1535  # control panel ends at ~1497
TOP = 142          # clean roof rows available: motor top is at ~163
LEFT = 160

photo = np.asarray(Image.open(SRC).convert("RGB"))
photo = photo[:, :KEEP_RIGHT]
photo = np.concatenate([photo[:TOP][::-1], photo], axis=0)
photo = np.concatenate([photo[:, :LEFT][:, ::-1], photo], axis=1)

Image.fromarray(photo).save(OUT, quality=90, optimize=True, progressive=True)
print("saved", OUT, photo.shape[1], photo.shape[0])
