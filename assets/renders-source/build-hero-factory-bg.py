"""Build the full-screen factory hero background from the original plant photo.

Output canvas: 2600 x 1500 (ratio 1.73), machine anchored near the right edge.

1. Ceiling (top 306 px): the photo's own upper rows mirrored upward, so the navbar sits on
   real trusses and windows. Above the machine (src x 500-1440) the mirror would repeat the
   motor and pipe tops, so those columns continue the clean roof-beam band instead.
2. Floor (bottom 253 px): the glossy floor continued downward with soft streaks, easing
   toward a pale floor tone.
3. Width: the empty margin right of the control panel is trimmed (keep src x < 1555), and
   1045 px of plant are added on the left by alternately mirroring the window/tank strip
   (src x < 330); that area sits under the copy wash, is progressively softened, and its
   floor band is smeared so the drain channel never forms a chevron.

The photo's own pixels are unchanged apart from short feathers at each seam.
"""
import sys
import numpy as np
from PIL import Image, ImageFilter

SRC, OUT = sys.argv[1], sys.argv[2]
# Optional 3rd arg: how many source rows above the machine are pure ceiling (default 20).
TOP, BOTTOM = 306, 253
MACHINE_X0, MACHINE_X1 = 500, 1440   # columns where the machine reaches into the top rows
CLEAN_ROWS = int(sys.argv[3]) if len(sys.argv) > 3 else 20  # source rows above the motor that are pure ceiling
# Optional 4th arg "real": fill above the machine with real ceiling borrowed from the left of the
# photo, and continue the floor with a perspective stretch of its own clean bottom rows.
REAL = len(sys.argv) > 4 and sys.argv[4] == "real"
FLOOR_CLEAN_FROM = 862  # first source row below the machine's feet (tall-vessel photos)
KEEP_RIGHT, LEFT_PAD, STRIP = 1555, 1045, 330


def blur(a: np.ndarray, r: float) -> np.ndarray:
    return np.asarray(Image.fromarray(np.clip(a, 0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(r)), np.float32)


def box_smear_x(a: np.ndarray, k: int) -> np.ndarray:
    padded = np.pad(a, ((0, 0), (k // 2, k // 2), (0, 0)), mode="edge")
    c = np.cumsum(padded, axis=1)
    c = np.concatenate([np.zeros_like(c[:, :1]), c], axis=1)
    return (c[:, k:] - c[:, :-k]) / k


photo = np.asarray(Image.open(SRC).convert("RGB"), np.float32)
h, w, _ = photo.shape

# --- 1. Ceiling -----------------------------------------------------------------
top = photo[:TOP][::-1].copy()  # row 0 of `top` is the far top; last row sits on the seam
span = MACHINE_X1 - MACHINE_X0
if REAL:
    # Borrow real mirrored ceiling from the plant left of the machine: [flip(L), L] where L is the
    # `span / 2` columns just left of MACHINE_X0. Seamless at the left edge and in the middle;
    # the right edge is feathered into the mirrored ceiling.
    half = span // 2
    left_block = top[:, MACHINE_X0 - half:MACHINE_X0]
    fill = np.concatenate([left_block[:, ::-1], left_block], axis=1)
    fill = np.pad(fill, ((0, 0), (0, span - fill.shape[1]), (0, 0)), mode="edge")
    edge = 90
    fx = np.ones(span, np.float32)
    fx[-edge:] = np.linspace(1, 0, edge)
    alpha = np.broadcast_to(fx[None, :, None], (TOP, span, 1)).copy()
    alpha[-CLEAN_ROWS:] = 0
    alpha[-CLEAN_ROWS - 12:-CLEAN_ROWS] *= np.linspace(1, 0, 12)[:, None, None]
    region = top[:, MACHINE_X0:MACHINE_X1]
    top[:, MACHINE_X0:MACHINE_X1] = region * (1 - alpha) + fill * alpha
else:
    # Above the machine, the mirror would repeat the motor and pipe tops. Those columns instead
    # continue the clean ceiling band (source rows 0..CLEAN_ROWS) upward, ping-ponged, which
    # reads as more horizontal roof beams; it is feathered into the mirror at both sides.
    band = photo[:CLEAN_ROWS, MACHINE_X0:MACHINE_X1]
    pingpong = np.concatenate([band[::-1], band], axis=0)
    reps = int(np.ceil(TOP / pingpong.shape[0]))
    fill = np.concatenate([pingpong] * reps, axis=0)[-TOP:]
    fill = blur(fill, 2)
    edge = int(span * 0.1)
    fx = np.ones(span, np.float32)
    fx[:edge] = np.linspace(0, 1, edge)
    fx[-edge:] = np.linspace(1, 0, edge)
    alpha = np.broadcast_to(fx[None, :, None], (TOP, span, 1)).copy()
    alpha[-CLEAN_ROWS:] = 0  # the seam band is already clean ceiling
    ramp = np.linspace(1, 0, 16)[:, None, None]
    alpha[-CLEAN_ROWS - 16:-CLEAN_ROWS] *= ramp
    region = top[:, MACHINE_X0:MACHINE_X1]
    top[:, MACHINE_X0:MACHINE_X1] = region * (1 - alpha) + fill * alpha

# Lift the far top slightly toward light so it reads as bright roof glazing, not a second floor.
lift = np.linspace(0.18 if REAL else 0.35, 0.0, TOP)[:, None, None]
top = top * (1 - lift) + 246 * lift

# --- 2. Floor -------------------------------------------------------------------
if REAL:
    # Perspective continuation: output rows from FLOOR_CLEAN_FROM to the new bottom sample the
    # clean floor rows with a stretch that starts at 1:1 (seamless) and grows toward the camera.
    n_src = h - FLOOR_CLEAN_FROM
    n_out = n_src + BOTTOM
    k = n_out / n_src
    t = np.linspace(0, 1, n_out)
    src_rows = FLOOR_CLEAN_FROM + (n_src - 1) * (1 - (1 - t) ** k)
    lo = np.floor(src_rows).astype(int)
    hi = np.minimum(lo + 1, h - 1)
    frac = (src_rows - lo)[:, None, None]
    stretched = photo[lo] * (1 - frac) + photo[hi] * frac
    # The diagonal floor drain (src x ~150-800) would bend into a curve under this stretch, so it
    # dissolves into a sideways-smoothed floor just below the seam.
    GX0, GX1 = 150, 800
    smooth = box_smear_x(stretched[:, GX0:GX1], 121)
    gx = np.clip(np.minimum(np.arange(GX1 - GX0), np.arange(GX1 - GX0)[::-1]) / 100.0, 0, 1)
    gy = np.clip((np.arange(n_out) - 10) / 40.0, 0, 1)
    weight = (gy[:, None] * gx[None, :])[..., None]
    stretched[:, GX0:GX1] = stretched[:, GX0:GX1] * (1 - weight) + smooth * weight
    photo = np.concatenate([photo[:FLOOR_CLEAN_FROM], stretched], axis=0)
    bottom = np.zeros((0, w, 3), np.float32)
else:
    floor_tone = np.array([232, 236, 241], np.float32)
    bottom_rows = photo[-10:]
    seed = blur(np.repeat(bottom_rows.mean(axis=0, keepdims=True), 6, axis=0), 3)[3]
    b = (np.linspace(0.0, 1.0, BOTTOM) ** 0.9)[:, None, None]
    bottom = seed[None] * (1 - 0.7 * b) + floor_tone * (0.7 * b)
    bottom += (bottom_rows.mean(axis=0) - seed)[None] * (1 - b) * 0.35


canvas = np.concatenate([top, photo, bottom], axis=0)


def feather_seam(c: np.ndarray, y: int, half: int) -> np.ndarray:
    soft = blur(c, 3)
    ramp = np.zeros(c.shape[0], np.float32)
    idx = np.arange(y - half, y + half)
    ramp[idx] = 1 - np.abs(idx - y) / half
    return c * (1 - ramp[:, None, None]) + soft * ramp[:, None, None]


canvas = feather_seam(canvas, TOP, 6)
if not REAL:
    canvas = feather_seam(canvas, TOP + h, 10)

# --- 3. Width -------------------------------------------------------------------
canvas = canvas[:, :KEEP_RIGHT]
strip = canvas[:, :STRIP]
tiles = []
width = 0
flip = True
while width < LEFT_PAD:
    tiles.insert(0, strip[:, ::-1] if flip else strip)
    width += STRIP
    flip = not flip
pad = np.concatenate(tiles, axis=1)[:, -LEFT_PAD:].copy()

floor_from = TOP + int(0.64 * h)
floor = pad[floor_from:]
ease = np.clip(np.arange(floor.shape[0]) / 70.0, 0, 1)[:, None, None]
pad[floor_from:] = floor * (1 - ease) + box_smear_x(floor, 161) * ease

soft = blur(pad, 10)
x = np.linspace(1.0, 0.0, LEFT_PAD)[None, :, None]
pad = pad * (1 - x) + soft * x
pad = pad * (1 - 0.35 * x) + 250 * (0.35 * x)

final = np.concatenate([pad, canvas], axis=1)
Image.fromarray(np.clip(final, 0, 255).astype(np.uint8)).save(OUT, quality=88, optimize=True, progressive=True)
print("saved", OUT, final.shape[1], final.shape[0])
