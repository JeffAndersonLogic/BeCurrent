#!/usr/bin/env python3
"""Outline the BeCurrent wordmark into SVG paths.

Writes assets/images/brand/*.svg and assets/favicon.svg. Run from the repo root:

    pip install fonttools brotli
    python3 scripts/brand/build-wordmark.py

── What the mark is ────────────────────────────────────────────────────────────

Be + an oversized red C + URRENT, set as one line, with the word crossing the C.
The C is the C of "Current" and it is also the logo: it is drawn at 2.4 times the
cap height of the word, sits behind it, and the URRENT emerges out of its
aperture. Reading it is the joke, and the joke only works if the C is big enough
to stop being a letter.

── Which face, and why it is not the display face ──────────────────────────────

The word is Libre Baskerville 700. The red C is Cinzel 900.

Cinzel is this project's display face and would have been the obvious choice for
all of it, except that Cinzel has no true lowercase: its lowercase codepoints are
small capitals, so "Be" comes out as "BE" with a small E. The mark needs a round
lowercase e, so the word is set in the family's text face instead. Both faces are
BeHistorical's, so the mark is still inside the shared family, which is the part
that matters.

The C is the exception and it is a deliberate one. It is not a letter in the
running word, it is a graphic element at two and a half times the size of one, so
taking it from a different member of the family costs nothing and buys weight:
Libre Baskerville tops out at 700 and its C is noticeably thinner than the
artwork's, while Cinzel at 900 matches. **Do not extend this to the word.** Mixing
faces inside the word itself puts two different B weights side by side, which was
tried and is visible.

── The lockup has a legibility floor, and it is not 21px ───────────────────────

This shape is about 4.1:1. The mark it replaced was 9.7:1, and the difference is
not cosmetic: at a fixed height, a squarer lockup gives the word far less width.
At 21px tall, the old masthead height, the C swallows the word and the result is
unreadable. **40px is the floor**, which is why the masthead and the footer both
grew when this mark landed. If a future lockup gets squarer still, re-measure
rather than assuming the existing heights carry over.

── Two properties carried over from every previous mark ────────────────────────

  1. NO DROP SHADOW. At masthead size a shadow is not a shadow, it is a grey
     smear along one edge, and it is the first thing to turn to mud on a
     projector.

  2. BE IS NOT WHITE ON A LIGHT GROUND. Every reading surface in this course is
     newsprint, so a white word would vanish on the hero. There are two
     colourways instead: paper for dark grounds, ink for light, red constant in
     both. The two-tone split is what the mark is built on, not one specific
     white.

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
WORD_SRC = os.path.join(FONTS, 'libre-baskerville-latin-700-normal.woff2')
C_SRC = os.path.join(FONTS, 'cinzel-latin-wght-normal.woff2')
TAG_SRC = os.path.join(FONTS, 'montserrat-latin-wght-normal.woff2')
OUT = os.path.join(ROOT, 'assets', 'images', 'brand')

C_WGHT = 900      # Cinzel's heaviest. The C is looked at, not read.
TAG_WGHT = 500

TRACK = 24        # word letterspacing, per mille of the em
C_SCALE = 2.4     # the C's cap height, as a multiple of the word's
C_GAP = 0.02      # gap between the end of "Be" and the C's left edge, in ems
C_INTO = 0.58     # where URRENT starts, as a fraction across the C's width.
                  # Below about 0.5 the C's right-hand terminals collide with
                  # the U's stem; above about 0.65 the C stops reading as part
                  # of the word and becomes a decoration behind it.

TAG_TRACK = 320   # the tagline is wide and light: quiet under a loud line
TAG_SIZE = 0.26   # tagline cap height, as a fraction of the word's
TAG_GAP = 0.30    # gap under the C's descender, as a fraction of cap height

RED = '#D5211A'      # --signal
PAPER = '#FFFFFF'    # the word on a dark ground
INK = '#141414'      # the word on a light ground
PLATE = '#111111'    # --black-900
TAG_ON_PLATE = '#BDBDBD'


def load(path, wght=None):
    """Open a woff2, pinning the weight axis if it is a variable font, so the
    outlines are the weight we asked for rather than the axis default."""
    font = TTFont(path)
    if 'fvar' in font and wght:
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


word = load(WORD_SRC)
cfont = load(C_SRC, C_WGHT)
tagfont = load(TAG_SRC, TAG_WGHT)
os.makedirs(OUT, exist_ok=True)

# ── The lockup ────────────────────────────────────────────────────────────────
be_d, be_w, be_box = run(word, 'Be', 1.0, 0, TRACK)
cap_h = -be_box[1]

_, _, c_unit = run(cfont, 'C', 1.0, 0, 0)
c_scale = (cap_h * C_SCALE) / (c_unit[3] - c_unit[1])
c_d, _, c_box = run(cfont, 'C', c_scale, 0, 0)
c_w = c_box[2] - c_box[0]

# The C's left edge sits just past the end of "Be", and it is centred on the
# word's own x-height band rather than on its baseline, so the overhang above and
# below the line is even.
c_x = be_box[2] + C_GAP * 1000 - c_box[0]
c_y = (be_box[1] / 2) - ((c_box[1] + c_box[3]) / 2)

ur_x = c_x + c_box[0] + C_INTO * c_w
ur_d, _, ur_box = run(word, 'URRENT', 1.0, ur_x, TRACK)

c_bounds = [c_box[0] + c_x, c_box[1] + c_y, c_box[2] + c_x, c_box[3] + c_y]
t_bounds = [be_box[0], min(be_box[1], ur_box[1]),
            ur_box[2], max(be_box[3], ur_box[3])]
box = [min(c_bounds[0], t_bounds[0]), min(c_bounds[1], t_bounds[1]),
       max(c_bounds[2], t_bounds[2]), max(c_bounds[3], t_bounds[3])]
W, H = box[2] - box[0], box[3] - box[1]
shift = f'translate({-box[0]:.1f} {-box[1]:.1f})'

HEAD = """<!-- The BeCurrent wordmark. Generated by scripts/brand/build-wordmark.py:
     the word in Libre Baskerville 700, the oversized C in Cinzel 900, outlined.
     The C is behind the word and is the C of "Current". Two colourways exist
     because the word is the neutral half of a two-tone mark and cannot be white
     on a light ground. This lockup is unreadable below about 40px tall; see the
     script header. Width and height are set explicitly, per the image contract
     in CLAUDE.md. -->
"""


def lockup(neutral, indent=''):
    """The C is painted first so the word crosses in front of it."""
    return (f'{indent}<g transform="{shift}">'
            f'<path fill="{RED}" transform="translate({c_x:.1f} {c_y:.1f})" d="{c_d}"/>'
            f'<path fill="{neutral}" d="{be_d}"/>'
            f'<path fill="{neutral}" d="{ur_d}"/></g>')


def wordmark(neutral):
    return (f'{HEAD}<svg xmlns="http://www.w3.org/2000/svg" width="{W:.0f}" '
            f'height="{H:.0f}" viewBox="0 0 {W:.1f} {H:.1f}" role="img" '
            f'aria-label="BeCurrent">{lockup(neutral)}</svg>\n')


print(f'wordmark {W:.0f} x {H:.0f}, ratio {W / H:.2f}')
write('becurrent-wordmark.svg', wordmark(PAPER))
write('becurrent-wordmark-ink.svg', wordmark(INK))

# ── The plate: the shareable logo, and the only lockup carrying the tagline ───
tag_scale = (cap_h * TAG_SIZE) / (tagfont['head'].unitsPerEm * 0.72)
tag_d, tag_w, tag_box = run(tagfont, 'CURRENT EVENTS', tag_scale, 0, TAG_TRACK)
tag_h = tag_box[3] - tag_box[1] if tag_box[2] > tag_box[0] else 0

# The tagline clears the C's descender, not the word's baseline. Measuring from
# the baseline put it straight through the bottom of the C: the C overhangs the
# line by more than half a cap height at each end, which is the whole point of it.
PW, PH = 2000, 600
tag_top = H + cap_h * TAG_GAP
block_h = tag_top + tag_h
s = (PW * 0.76) / W
if block_h * s > PH * 0.72:
    s = (PH * 0.72) / block_h
mx = (PW - W * s) / 2
my = (PH - block_h * s) / 2

plate = (f'{HEAD}<svg xmlns="http://www.w3.org/2000/svg" width="{PW}" height="{PH}" '
         f'viewBox="0 0 {PW} {PH}" role="img" aria-label="BeCurrent, Current Events">'
         f'<rect width="{PW}" height="{PH}" rx="40" fill="{PLATE}"/>'
         f'<g transform="translate({mx:.1f} {my:.1f}) scale({s:.4f})">'
         f'{lockup(PAPER)}'
         # The tagline sits centred under the whole lockup, a line of quiet caps
         # against a very loud one, clear of the C's descender.
         f'<g transform="translate({(W - tag_w) / 2 - tag_box[0]:.1f} '
         f'{tag_top - tag_box[1]:.1f})">'
         f'<path fill="{TAG_ON_PLATE}" d="{tag_d}"/></g>'
         f'</g></svg>\n')
write('becurrent-logo.svg', plate)

# ── The favicon: the one letter the mark can be reduced to ───────────────────
#
# The C, and it is the mark's own C rather than a letter picked out of the word:
# the whole logo is already a C with a word through it, so at 16px the C alone is
# not an abbreviation of the mark, it is the mark. Paper on red, which is the
# strongest pairing in the palette and holds against light or dark browser chrome.
c_ico, _, ico_box = run(cfont, 'C', 1.0, 0, 0)
cw, ch = ico_box[2] - ico_box[0], ico_box[3] - ico_box[1]
fs = 38.0 / ch
icon = ('<!-- The BeCurrent mark reduced to its C. Generated by\n'
        '     scripts/brand/build-wordmark.py, the same outline the wordmark uses. -->\n'
        f'<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" '
        f'viewBox="0 0 64 64" role="img" aria-label="BeCurrent">'
        f'<rect width="64" height="64" rx="13" fill="{RED}"/>'
        f'<g transform="translate({32 - cw * fs / 2 - ico_box[0] * fs:.1f} '
        f'{32 - ch * fs / 2 - ico_box[1] * fs:.1f}) scale({fs:.4f})">'
        f'<path fill="{PAPER}" d="{c_ico}"/></g></svg>\n')
write('favicon.svg', icon)
