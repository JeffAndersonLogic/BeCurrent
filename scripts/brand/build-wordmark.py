#!/usr/bin/env python3
"""Derive every BeCurrent lockup from the supplied artwork.

Writes assets/images/brand/*.svg and assets/favicon.svg. Run from the repo root:

    pip install fonttools brotli svgelements
    python3 scripts/brand/build-wordmark.py

── The source of truth ─────────────────────────────────────────────────────────

assets/images/brand/becurrent-mark-source.svg is the real artwork, supplied as
vector. Everything else in the brand folder is derived from it by this script,
which does exactly three things: trim the canvas, recolour, and compose. It never
redraws. Earlier marks in this repo were reproductions built from fonts because
the artwork had only ever arrived as a raster; this replaces all of that, and the
font-drawing code is gone.

**Do not hand-edit the four outputs.** Edit the source or this script.

Be, an oversized red C, then URRENT, with the word crossing in front of the C.
The C is the C of "Current" and it is also the mark.

── The three things the source cannot be used as-is for ────────────────────────

  1. THE CANVAS IS MOSTLY EMPTY. The artwork is drawn inside a 1500x1500 square
     and occupies a band about 1102 x 450 in the middle of it, roughly a fifth of
     the height. An <img> renders the whole canvas, so used untrimmed the mark
     comes out about a fifth of the size the height attribute asks for, floating
     in space. Every output here is trimmed to the artwork's real bounds, which
     is what makes the ratio 2.45 rather than 1.

  2. THE WORD IS BLACK. On the masthead and the footer, both near-black bands,
     a black word is invisible: only the red C survives, which reads as a
     rendering fault rather than a logo. So there are two colourways, and the
     ONLY difference between them is the word's fill. The red never moves.

  3. THERE IS NO TAGLINE IN IT. The plate needs one, so it is set in Montserrat,
     the label face, and it exists in the plate alone. At masthead size it would
     be four illegible pixels, and the front door already prints the course name
     in the dateline right under the mark.

── The legibility floor ────────────────────────────────────────────────────────

The lockup is 2.45:1 and the word's cap height is only about a third of the
mark's total height, because the C overhangs the line by a long way at both ends.
The practical consequence: at 21px tall, the height the first BeCurrent masthead
used, the cap height is under 7px and the word is unreadable. The masthead is
38px and the footer 30px for that reason. If the artwork is ever redrawn, measure
this again rather than assuming the heights carry over.

── Why the outputs are files and not CSS ───────────────────────────────────────

An SVG loaded through an <img> cannot reach a webfont, and a <text> element that
falls back to whatever the machine has stops being the brand mark. The source is
already outlines. The masthead, the hero and the footer all render one of these
files rather than type styled to resemble them, so the lockups cannot drift.

Deliberately off the test path: this needs three pip packages and validate.js has
to stay runnable on a bare checkout. The outputs are committed, so nothing in the
build or the gate depends on this file.
"""
import os
import re
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.transformPen import TransformPen
from fontTools.misc.transform import Transform
from svgelements import SVG, Shape

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
BRAND = os.path.join(ROOT, 'assets', 'images', 'brand')
SOURCE = os.path.join(BRAND, 'becurrent-mark-source.svg')
TAG_SRC = os.path.join(ROOT, 'assets', 'fonts', 'montserrat-latin-wght-normal.woff2')

ART_INK = '#000000'   # the word's fill in the supplied artwork
ART_RED = '#ce1400'   # the C's fill in the supplied artwork, and --signal
PAPER = '#FFFFFF'     # the word on a dark ground
PLATE = '#111111'     # --black-900
TAG_ON_PLATE = '#BDBDBD'

TAG_WGHT = 500
TAG_TRACK = 320   # the tagline is wide and light: quiet under a loud line
TAG_SIZE = 0.62   # tagline cap height, as a fraction of the WORD's cap height
TAG_GAP = 0.55    # gap under the C's descender, in the same units

PAD = 0.0         # trim exactly to the ink. The lockups control their own spacing.


# ── Reading the source ───────────────────────────────────────────────────────
src = open(SOURCE).read()
head = re.match(r'<svg\b[^>]*>', src).group(0)
defs = re.search(r'<defs>.*?</defs>', src, re.S)
defs = defs.group(0) if defs else ''
body = src[src.index('</defs>') + len('</defs>'):src.rindex('</svg>')] if defs \
    else src[len(head):src.rindex('</svg>')]

# The source is authored at width=2000 over a viewBox of 1500, so svgelements
# reports geometry in viewport units. Everything below works in viewBox units,
# which is what the emitted viewBox has to be in.
vb = [float(v) for v in re.search(r'viewBox="([^"]+)"', head).group(1).split()]
px_w = float(re.search(r'\swidth="([\d.]+)"', head).group(1))
SCALE = px_w / vb[2]


def split_top_level(markup):
    """Return the source body's top-level <g> blocks, in order. The artwork is a
    flat list of them: one per letter group, plus the clip-path chains that carve
    out the C."""
    blocks, i = [], 0
    while i < len(markup):
        m = re.compile(r'<g\b[^>]*>').search(markup, i)
        if not m:
            break
        depth, j = 1, m.end()
        while depth:
            nxt = re.compile(r'<g\b[^>]*>|</g>').search(markup, j)
            depth += 1 if nxt.group(0).startswith('<g') else -1
            j = nxt.end()
        blocks.append(markup[m.start():j])
        i = j
    return blocks


blocks = split_top_level(body)
red_only = ''.join(b for b in blocks if ART_RED in b)
assert red_only, 'no red geometry found in the source'
assert any(ART_INK in b for b in blocks), 'no ink geometry found in the source'


def bbox(markup):
    """Bounds of a fragment, in viewBox units."""
    tmp = os.path.join(BRAND, '.bbox.tmp.svg')
    with open(tmp, 'w') as fh:
        fh.write(f'{head}{defs}{markup}</svg>')
    doc = SVG.parse(tmp)
    os.remove(tmp)
    box = [1e9, 1e9, -1e9, -1e9]
    for el in doc.elements():
        if not isinstance(el, Shape):
            continue
        try:
            b = el.bbox()
        except Exception:
            b = None
        if not b:
            continue
        box = [min(box[0], b[0]), min(box[1], b[1]),
               max(box[2], b[2]), max(box[3], b[3])]
    return [v / SCALE for v in box]


MARK = bbox(body)
RED = bbox(red_only)
INK_BOX = bbox(''.join(b for b in blocks if ART_INK in b))
W, H = MARK[2] - MARK[0], MARK[3] - MARK[1]
CAP = INK_BOX[3] - INK_BOX[1]   # the word's cap height; "BeCURRENT" has no descender


def write(name, text):
    path = os.path.join(ROOT, 'assets', name) if name == 'favicon.svg' \
        else os.path.join(BRAND, name)
    with open(path, 'w') as fh:
        fh.write(text)
    print(f'  {os.path.relpath(path, ROOT)}  {len(text)} bytes')


HEAD = """<!-- Generated by scripts/brand/build-wordmark.py from
     assets/images/brand/becurrent-mark-source.svg, the supplied artwork. Trimmed
     and recoloured, never redrawn. Do not hand-edit; edit the source. Two
     colourways exist because the word is black in the artwork and disappears on
     the dark bands. Unreadable below about 38px tall: see the script header.
     Width and height are explicit, per the image contract in CLAUDE.md. -->
"""


ART_INK_FILL = f'fill="{ART_INK}"'
ART_RED_FILL = f'fill="{ART_RED}"'


def wordmark(word_fill):
    art = body.replace(ART_INK_FILL, f'fill="{word_fill}"')
    return (f'{HEAD}<svg xmlns="http://www.w3.org/2000/svg" '
            f'xmlns:xlink="http://www.w3.org/1999/xlink" '
            f'width="{W:.0f}" height="{H:.0f}" '
            f'viewBox="{MARK[0]:.2f} {MARK[1]:.2f} {W:.2f} {H:.2f}" '
            f'role="img" aria-label="BeCurrent">{defs}{art}</svg>\n')


print(f'source   {vb[2]:.0f} x {vb[3]:.0f}')
print(f'wordmark {W:.0f} x {H:.0f}, ratio {W / H:.2f}, cap height {CAP:.0f}')
write('becurrent-wordmark.svg', wordmark(PAPER))
write('becurrent-wordmark-ink.svg', wordmark(ART_INK))

# ── The plate: the shareable logo, and the only lockup carrying the tagline ───
tagfont = instancer.instantiateVariableFont(TTFont(TAG_SRC), {'wght': TAG_WGHT})


def outline(font, text, scale, track):
    glyphs, cmap = font.getGlyphSet(), font.getBestCmap()
    upem = font['head'].unitsPerEm
    parts, x, box = [], 0.0, [1e9, 1e9, -1e9, -1e9]
    for ch in text:
        if ch == ' ':
            x += upem * 0.26 * scale + track / 1000.0 * upem * scale
            continue
        name = cmap[ord(ch)]
        # Font space is y-up, SVG is y-down, so the y scale is negated.
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
    return ' '.join(parts), x, box


tag_scale = (CAP * TAG_SIZE) / (tagfont['head'].unitsPerEm * 0.72)
tag_d, tag_w, tag_box = outline(tagfont, 'CURRENT EVENTS', tag_scale, TAG_TRACK)
tag_h = tag_box[3] - tag_box[1]

# The tagline clears the C's descender, not the word's baseline. The C overhangs
# the line by more than a cap height at each end, so measuring from the baseline
# puts the tagline straight through the bottom of it.
tag_top = H + CAP * TAG_GAP
block_h = tag_top + tag_h

body_paper = body.replace(ART_INK_FILL, f'fill="{PAPER}"')
red_paper = red_only.replace(ART_RED_FILL, f'fill="{PAPER}"')

PW, PH = 2000, 600
s = (PW * 0.76) / W
if block_h * s > PH * 0.72:
    s = (PH * 0.72) / block_h
mx, my = (PW - W * s) / 2, (PH - block_h * s) / 2

plate = (f'{HEAD}<svg xmlns="http://www.w3.org/2000/svg" '
         f'xmlns:xlink="http://www.w3.org/1999/xlink" '
         f'width="{PW}" height="{PH}" viewBox="0 0 {PW} {PH}" role="img" '
         f'aria-label="BeCurrent, Current Events">{defs}'
         f'<rect width="{PW}" height="{PH}" rx="40" fill="{PLATE}"/>'
         f'<g transform="translate({mx:.1f} {my:.1f}) scale({s:.4f}) '
         f'translate({-MARK[0]:.2f} {-MARK[1]:.2f})">'
         f'{body_paper}'
         f'<g transform="translate({MARK[0] + (W - tag_w) / 2 - tag_box[0]:.1f} '
         f'{MARK[1] + tag_top - tag_box[1]:.1f})">'
         f'<path fill="{TAG_ON_PLATE}" d="{tag_d}"/></g>'
         f'</g></svg>\n')
write('becurrent-logo.svg', plate)

# ── The favicon: the mark reduced to its C ───────────────────────────────────
#
# The whole logo is already a C with a word through it, so at 16px the C alone is
# not an abbreviation of the mark, it is the mark. Paper on red, which is the
# strongest pairing in the palette and holds against light or dark browser chrome.
cw, ch = RED[2] - RED[0], RED[3] - RED[1]
box = 64.0
inner = 40.0
fs = inner / ch
icon = ('<!-- The BeCurrent mark reduced to its C, taken from the same artwork the\n'
        '     wordmark is trimmed from. Generated by scripts/brand/build-wordmark.py. -->\n'
        f'<svg xmlns="http://www.w3.org/2000/svg" '
        f'xmlns:xlink="http://www.w3.org/1999/xlink" '
        f'width="64" height="64" viewBox="0 0 64 64" role="img" '
        f'aria-label="BeCurrent">{defs}'
        f'<rect width="64" height="64" rx="13" fill="{ART_RED}"/>'
        f'<g transform="translate({box / 2 - cw * fs / 2:.2f} '
        f'{box / 2 - ch * fs / 2:.2f}) scale({fs:.4f}) '
        f'translate({-RED[0]:.2f} {-RED[1]:.2f})">'
        f'{red_paper}'
        f'</g></svg>\n')
write('favicon.svg', icon)
