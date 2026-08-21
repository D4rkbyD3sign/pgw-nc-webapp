"""Generate the app icons from the PGW brand mark.

Run when the mark or the colourway changes — otherwise never. The PNGs it
writes are committed, so a normal build needs nothing but a browser.

    python tools/make-icons.py

Requires PyMuPDF + Pillow (Python only — NO Node, per the project constraint).
Verified against PyMuPDF 1.27.2.2 / Pillow 10.4.0 on Adam's work machine,
2026-08-21.

THE COLOURWAY (Adam's call, 2026-08-21 — option B of two he was shown):
charcoal ground, lime bars, and the ring recoloured from charcoal to PAPER.

That recolour matters and is not a typo. None of the four marks PGW issue
work on a dark ground: mark-base loses its ring, mark-inverted loses its
bars, mark-mono disappears entirely, and mark-white throws away the lime. So
the dark icon needs a fifth colourway that PGW have never issued. It is an
in-family move — mark-white already recolours the ring, just wholesale — but
it IS an invention, made knowingly and recorded here so nobody later
"corrects" it back to a shipped variant and quietly breaks the icon.

Adam chose it on the ground that ~9 in 10 phones run light mode, so the
charcoal tile is the one that separates from the wallpaper it will actually
sit on. Rejected option A was mark-base untouched on paper.
"""

import os
import fitz
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
SRC = os.path.join(REPO, "img", "brand", "mark-base.svg")
OUT = os.path.join(REPO, "img", "icons")

INK = "#272728"    # ground, and the ring's colour in the source file
PAPER = "#faf9f6"  # the ring, recoloured — see the note above
RING = PAPER

# Fraction of the canvas taken by the mark's HEIGHT.
#
# maskable: Android crops to a circle 80% of the canvas width. The mark is
# 44x50, so its bounding box diagonal is height * sqrt(1 + 0.88**2) = 1.3327h.
# Keeping that under 0.8 * size caps the height at 0.60. Anything larger and
# the tips of the bars get sliced off on a Pixel and nowhere else, which is
# exactly the kind of bug that is only ever found by the wrong person.
#
# any: no guaranteed crop (iOS rounds the corners, it does not cut into the
# middle), so it can breathe.
SCALE = {"any": 0.70, "maskable": 0.60}

# purpose, pixel size, filename
TARGETS = [
    ("any", 192, "icon-192.png"),
    ("any", 512, "icon-512.png"),
    ("maskable", 512, "icon-maskable-512.png"),
    # iOS reads the manifest, but the apple-touch-icon link is still what older
    # iPhones use and it costs one file. 180 is the size iOS asks for.
    ("any", 180, "apple-touch-icon.png"),
]


def render_mark(height_px):
    """Rasterise the mark at a pixel height, ring recoloured for the dark ground."""
    svg = open(SRC, encoding="utf-8").read()
    if RING.lower() != INK:
        svg = svg.replace(f'fill="{INK}"', f'fill="{RING}"')
    page = fitz.open(stream=svg.encode("utf-8"), filetype="svg")[0]
    z = height_px / page.rect.height
    pix = page.get_pixmap(matrix=fitz.Matrix(z, z), alpha=True)
    return Image.frombytes("RGBA", (pix.width, pix.height), pix.samples)


def build(size, purpose):
    """One icon: opaque ground, mark centred.

    The ground is opaque on purpose. A transparent icon does not stay
    transparent on a home screen — iOS fills it and Android mats it — so
    leaving it transparent means handing the colour decision to the handset.
    """
    canvas = Image.new("RGBA", (size, size), INK)
    mark = render_mark(int(size * SCALE[purpose]))
    canvas.alpha_composite(mark, ((size - mark.width) // 2, (size - mark.height) // 2))
    return canvas


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for purpose, size, name in TARGETS:
        build(size, purpose).save(os.path.join(OUT, name))
        print(f"  {name:26} {size}x{size}  ({purpose})")
    print(f"\nWrote {len(TARGETS)} icons to img/icons/")
