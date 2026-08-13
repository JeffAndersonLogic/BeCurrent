#!/usr/bin/env python3
"""Outline the BeCurrent wordmark into SVG paths.

Writes assets/images/brand/*.svg and assets/favicon.svg. Run from the repo root:

    pip install fonttools brotli
    python3 scripts/brand/build-wordmark.py

── What the mark is ────────────────────────────────────────────────────────────

BECURRENT set in Cinzel, tracked wide, two-tone: BE in the neutral, CURRENT in
red. Cinzel is BeHistorical's display face, and that is the point. The two
courses are taught by the same teacher out of the same method, so they are one
family: same face, different colour. BeHistorical is bronze on parchment and
BeCurrent is red on black, which is the half of the identity that has to tell
them apart at a glance.

Cinzel is an inscriptional Roman with no lowercase to speak of, so the mark is
set in caps and the tracking is opened up rather than closed. A Trajan-descended
face set tight looks like a mistake; set wide it looks like what it is.

Two properties carried over from the earlier condensed-gothic mark, both because
they are about how the mark gets used rather than how it was drawn:

  1. NO DROP SHADOW. The masthead renders this 21px tall. A shadow at that size
     is not a shadow, it is a grey smear along one edge, and it is the first
     thing to turn to mud on a projector.

  2. BE IS NOT WHITE ON A LIGHT GROUND. Every reading surface in this course is
     newsprint, so a white BE would vanish on the hero. There are two colourways
     instead: paper for dark grounds, ink for light, red constant in both. The
     two-tone split is what the mark is built on, not one specific white.

The tagline is in the plate only. At masthead size it would be four illegible
pixels, and the front door already prints the course name in the dateline
directly under the mark, so putting it in the wordmark would say it twice.

── Why paths and not <text> ────────────────────────────────────────────────────

An SVG loaded through an <img> cannot reach a webfont, and a <text> element that
falls back to whatever the machine has stops being the brand mark. Outlines
render identically on a Chromebook, a projector, and a browser tab.

Deliberately off the test path: reading a woff2 needs fontTools and brotli, and
validate.js has to stay runnable on a bare checkout. The SVGs are committed, so
nothing in the build or the gate depends on this file. It exists so the mark can
be redrawn rather than only inherited.
"""
import os
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.transformPen import TransformPen
from fontTools.misc.transform import Transform

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
FONTS = os.path.join(ROOT, 'assets', 'fonts')
SRC = os.path.join(FONTS, 'cinzel-latin-wght-normal.woff2')
TAG_SRC = os.path.join(FONTS, 'montserrat-latin-wght-normal.woff2')
OUT = os.path.join(ROOT, 'assets', 'images', 'brand')

MARK_WGHT = 900   # Cinzel's heaviest. A wordmark is looked at, not read.
TAG_WGHT = 500

TRACK = 34        # wordmark letterspacing, per mille of the em. Roman caps want air.
TAG_TRACK = 320   # the tagline is wider still, and light: quiet under a loud line.
TAG_SIZE = 0.26   # tagline cap height, as a fraction of the wordmark's
TAG_GAP = 0.60    # space between the two lines, same units

RED = '#D5211A'      # --signal
PAPER = '#FFFFFF'    # BE on a dark ground
INK = '#141414'      # BE on a light ground
PLATE = '#111111'    # --black-900
TAG_ON_PLATE = '#BDBDBD'


def load(path, wght):
    """Open a variable woff2 and pin its weight axis, so the outlines are the
    weight we asked for rather than the axis default."""
    font = TTFont(path)
    if 'fvar' in font:
        font = instancer.instantiateVariableFont(font, {'wght': wght})
    return font


def run(font, text, scale, dx, track):
    """Outline a string. Returns (path data, advance width, bounds)."""
    glyphs = font.getGlyphSet()
    cmap = font.getBestCmap()
    upem = font['head'].unitsPerEm
    parts, x = [], dx
    box = [1e9, 1e9, -1e9, -1e9]
    for ch in text:
        if ch == ' ':
            x += upem * 0.26 * scale + track / 1000.0 * upem * scale
            continue
        name = cmap[ord(ch)]
        # Font space is y-up, SVG is y-down, so the y scale is negated and the
        # baseline lands on y=0.
        t = Transform(scale, 0, 0, -scale, x, 0)
        pen = SVGPathPen(glyphs, ntos=lambda v: f'{v:.1f}')
        glyphs[name].draw(TransformPen(pen, t))
        parts.append(pen.getCommands())
        bp = BoundsPen(glyphs)
        glyphs[name].draw(TransformPen(bp, t))
        if bp.bounds:
            box = [min(box[0], bp.bounds[0]), min(box[1], bp.bounds[1]),
                   max(box[2], bp.bounds[2]), max(box[3], bp.bounds[3])]
        x += glyphs[name].width * scale + track / 1000.0 * upem * scale
    return ' '.join(parts), x - dx, box


def write(name, body):
    path = os.path.join(ROOT, 'assets', name) if name == 'favicon.svg' \
        else os.path.join(OUT, name)
    with open(path, 'w') as fh:
        fh.write(body)
    print(f'  {os.path.relpath(path, ROOT)}  {len(body)} bytes')


mark = load(SRC, MARK_WGHT)
tagfont = load(TAG_SRC, TAG_WGHT)
os.makedirs(OUT, exist_ok=True)

# ── The wordmark: BE in the neutral, CURRENT in red, set as one tracked line ──
be_d, be_w, be_box = run(mark, 'BE', 1.0, 0, TRACK)
cur_d, cur_w, cur_box = run(mark, 'CURRENT', 1.0, be_w, TRACK)

box = [min(be_box[0], cur_box[0]), min(be_box[1], cur_box[1]),
       max(be_box[2], cur_box[2]), max(be_box[3], cur_box[3])]
W, H = box[2] - box[0], box[3] - box[1]
shift = f'translate({-box[0]:.1f} {-box[1]:.1f})'

HEAD = f"""<!-- The BeCurrent wordmark. Generated by scripts/brand/build-wordmark.py:
     Cinzel 900, outlined. Cinzel is BeHistorical's display face; the colour is
     what separates the two courses. Two colourways exist because BE is the
     neutral half of a two-tone mark and cannot be white on a light ground.
     Width and height are set explicitly, per the image contract in CLAUDE.md. -->
"""


def wordmark(neutral):
    return (f'{HEAD}<svg xmlns="http://www.w3.org/2000/svg" width="{W:.0f}" '
            f'height="{H:.0f}" viewBox="0 0 {W:.1f} {H:.1f}" role="img" '
            f'aria-label="BeCurrent">'
            f'<g transform="{shift}">'
            f'<path fill="{neutral}" d="{be_d}"/>'
            f'<path fill="{RED}" d="{cur_d}"/></g></svg>\n')


print(f'wordmark {W:.0f} x {H:.0f}, ratio {W / H:.2f}')
write('becurrent-wordmark.svg', wordmark(PAPER))
write('becurrent-wordmark-ink.svg', wordmark(INK))

# ── The plate: the shareable logo, and the only lockup carrying the tagline ───
tag_scale = (H * TAG_SIZE) / (tagfont['head'].unitsPerEm * 0.72)
tag_d, tag_w, tag_box = run(tagfont, 'CURRENT EVENTS', tag_scale, 0, TAG_TRACK)

PW, PH = 2000, 600
block_h = H + H * TAG_GAP + (tag_box[3] - tag_box[1] if tag_box[2] > tag_box[0] else 0)
s = (PW * 0.76) / W
if block_h * s > PH * 0.72:
    s = (PH * 0.72) / block_h
mx = (PW - W * s) / 2
my = (PH - block_h * s) / 2

plate = (f'{HEAD}<svg xmlns="http://www.w3.org/2000/svg" width="{PW}" height="{PH}" '
         f'viewBox="0 0 {PW} {PH}" role="img" aria-label="BeCurrent, Current Events">'
         f'<rect width="{PW}" height="{PH}" rx="40" fill="{PLATE}"/>'
         f'<g transform="translate({mx:.1f} {my:.1f}) scale({s:.4f})">'
         f'<g transform="{shift}">'
         f'<path fill="{PAPER}" d="{be_d}"/>'
         f'<path fill="{RED}" d="{cur_d}"/></g>'
         # The tagline sits centred under the wordmark, a line of quiet caps
         # against a very loud one.
         f'<g transform="translate({(W - tag_w) / 2 - tag_box[0]:.1f} '
         f'{H * (1 + TAG_GAP) - tag_box[1] - (tag_box[3] - tag_box[1]):.1f})">'
         f'<path fill="{TAG_ON_PLATE}" d="{tag_d}"/></g>'
         f'</g></svg>\n')
write('becurrent-logo.svg', plate)

# ── The favicon: the one letter the mark can be reduced to ───────────────────
#
# The red C, which is where the mark changes colour and the only letter that
# reads as BeCurrent rather than as a generic capital. Paper on red, which is the
# strongest pairing in the palette and holds at 16px against light or dark
# browser chrome.
c_d, c_w, c_box = run(mark, 'C', 1.0, 0, 0)
cw, ch = c_box[2] - c_box[0], c_box[3] - c_box[1]
fs = 38.0 / ch
icon = ('<!-- The BeCurrent mark reduced to its one letter. Generated by\n'
        '     scripts/brand/build-wordmark.py, the same C outline as the wordmark. -->\n'
        f'<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" '
        f'viewBox="0 0 64 64" role="img" aria-label="BeCurrent">'
        f'<rect width="64" height="64" rx="13" fill="{RED}"/>'
        f'<g transform="translate({32 - cw * fs / 2 - c_box[0] * fs:.1f} '
        f'{32 - ch * fs / 2 - c_box[1] * fs:.1f}) scale({fs:.4f})">'
        f'<path fill="{PAPER}" d="{c_d}"/></g></svg>\n')
write('favicon.svg', icon)
