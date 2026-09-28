#!/usr/bin/env python3
"""Build the Iran at War one-page test reference guide, a limited fillable PDF.

    python3 scripts/build-iran-reference-sheet.py

Writes docs/assessments/iran-reference-sheet.pdf. Students fill it in, submit it
to the Canvas assignment in docs/canvas/iran-reference-guide.md, and use the
submitted version on the unit test.

Modelled on the BeHistorical Unit 1 Reference Guide (Limited Fillable v2), and
limited on purpose, so the page rewards choosing over pasting:

  - every box has a fixed font size, never auto, so text cannot shrink to fit,
    and plain text only (no rich text), so a student cannot change the font
  - every box is "do not scroll", so typing stops at the edge of the box
  - every box has a character limit sized to what the box can show, because a
    paste is NOT stopped by "do not scroll" in Chrome's PDF engine: without a
    limit, a pasted study guide goes in whole and hides below the edge
  - the file is permission-locked: it opens with no password and its boxes can
    be filled, but the form itself, its fields and its fonts cannot be edited

The limits are measured, not guessed. The build types dense student-style notes
into every box in PDFium, the engine inside Chrome and so inside every
Chromebook, records where each box fills, and sets the limit there. Then it
pastes notes it did not measure with and fails if any box hides text. Change the
layout and the limits follow on the next build.

The boxes stay blank. The prompts are organizing cues and the timeline is
reference, never answers. Every term and date is taken from
scripts/lib/unit-content/iran.js and the eight topic pages under iran/.

Needs `pip install reportlab svglib pypdf pypdfium2 fonttools brotli`, and is off the test path
on purpose, like scripts/brand/build-wordmark.py: validate.js has to stay
runnable on a bare checkout. The output is committed.
"""
import ctypes
import os
import secrets
import tempfile

from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from reportlab.graphics import renderPDF
from reportlab.lib.colors import HexColor, white
from reportlab.lib.fonts import addMapping
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont as RLFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph
import pypdfium2 as pdfium
import pypdfium2.raw as pdfium_raw
from pypdf import PdfReader, PdfWriter
from pypdf.constants import UserAccessPermissions as Perm
from pypdf.generic import NameObject, NumberObject, TextStringObject
from svglib.svglib import svg2rlg

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONTS = os.path.join(ROOT, 'assets', 'fonts')
OUT = os.path.join(ROOT, 'docs', 'assessments', 'iran-reference-sheet.pdf')
WORDMARK = os.path.join(ROOT, 'assets', 'images', 'brand', 'becurrent-wordmark-ink.svg')

# Tokens from assets/css/becurrent-brand.css
INK = HexColor('#141414')
INK_SOFT = HexColor('#454545')
NEWSPRINT = HexColor('#F4F2ED')
PAPER = HexColor('#FFFEFB')
SIGNAL = HexColor('#CE1400')
SIGNAL_DEEP = HexColor('#A31000')
SIGNAL_PALE = HexColor('#E9958C')
LINE = HexColor('#D2CFC8')

# Locked font sizes. Character limits are measured at build time; see calibrate().
TOPIC_SIZE = 8
BIG_SIZE = 8
SMALL_SIZE = 6.5

# Student-style notes the limits are measured with: abbreviations, some capitals,
# numbers and arrows. A box's limit is the least any of these fits, so a box fills
# with ordinary notes and a paste of notes like these always stays visible.
CALIBRATION = [
    ('1953 coup: CIA + Britain remove Mosaddegh after oil nationalized -> Shah stronger -> '
     'Iranians distrust U.S. 1979: revolution, Khomeini, hostage crisis 444 days -> Americans '
     'distrust Iran. Both sides remember a grievance. '),
    ('Iraq invaded in 1980 and the war lasted eight years. Iran learned it could not count on '
     'help from others, so it built missiles and a stronger Revolutionary Guard. The Quds Force '
     'works with partners like Hezbollah and the Houthis. '),
    ('JCPOA 2015 = limits + inspections for sanctions relief. Left out missiles and partners. '
     '2018 U.S. leaves, sanctions back, Iran passes limits, fear grows, diplomacy weakens, '
     'strikes in 2025. Hormuz 21.6M to 4.9M barrels a day. '),
]
# Not in the list on purpose: notes typed entirely in CAPITALS set about a fifth
# wider, and measuring with them left a fifth of every box empty for ordinary
# notes. Typing in capitals still stops at the edge; only a paste of all-capital
# text could run past it.
# Held out: never used to set a limit, only to test that a paste cannot hide text.
HELD_OUT = ('Shadow war = covert attacks, cyber, partners. 2024 threshold crossed when Iran hit '
            'Israel from its own land. 2025 bigger war, U.S. strikes nuclear sites. Precedent '
            'matters more than size? Path dependence: each round makes the next one easier. ')


def register_fonts():
    """The course faces ship as woff2, some variable; reportlab needs static TTF."""
    tmp = tempfile.mkdtemp(prefix='bc-fonts-')
    specs = [
        ('Mont', 'montserrat-latin-wght-normal.woff2', 500),
        ('Mont-Bold', 'montserrat-latin-wght-normal.woff2', 700),
        ('Mont-XBold', 'montserrat-latin-wght-normal.woff2', 800),
        ('Cinzel', 'cinzel-latin-wght-normal.woff2', 700),
        ('LB', 'libre-baskerville-latin-400-normal.woff2', None),
        ('LB-Bold', 'libre-baskerville-latin-700-normal.woff2', None),
        ('LB-Ital', 'libre-baskerville-latin-400-italic.woff2', None),
    ]
    for name, src, wght in specs:
        f = TTFont(os.path.join(FONTS, src))
        f.flavor = None
        if wght and 'fvar' in f:
            f = instancer.instantiateVariableFont(f, {'wght': wght})
        path = os.path.join(tmp, name + '.ttf')
        f.save(path)
        pdfmetrics.registerFont(RLFont(name, path))
    for bold, italic, face in ((0, 0, 'LB'), (1, 0, 'LB-Bold'), (0, 1, 'LB-Ital'),
                               (1, 1, 'LB-Bold')):
        addMapping('LB', bold, italic, face)
    # None of the three course faces carries an arrow.
    for path in ('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
                 '/usr/share/fonts/dejavu/DejaVuSans-Bold.ttf'):
        if os.path.exists(path):
            pdfmetrics.registerFont(RLFont('Sym', path))
            return True
    return False


HAS_SYM = False


def sym(text):
    arrow = '<font name="Sym">→</font>' if HAS_SYM else '-&gt;'
    return text.replace('→', arrow)


def para(c, text, x, y_top, width, style):
    """Draw a paragraph with its top at y_top; return the height used."""
    p = Paragraph(sym(text), style)
    _, h = p.wrap(width, 1000)
    p.drawOn(c, x, y_top - h)
    return h


def label(c, text, x, y, color=SIGNAL_DEEP, font='Mont-XBold', size=6.2, spacing=0.5):
    t = c.beginText(x, y)
    t.setFont(font, size)
    t.setFillColor(color)
    t.setCharSpace(spacing)
    t.textOut(text)
    t.setCharSpace(0)  # Tc persists in the PDF text state; never let it leak
    c.drawText(t)


def field(form, name, tip, x, y, w, h, size):
    # No limit here: calibrate() measures one and finalize() writes it.
    form.textfield(name=name, tooltip=tip, x=x, y=y, width=w, height=h,
                   fontName='Helvetica', fontSize=size, borderWidth=0,
                   fillColor=NEWSPRINT, textColor=INK, maxlen=None,
                   fieldFlags='multiline doNotScroll doNotSpellCheck')


CUE = ParagraphStyle('cue', fontName='Mont', fontSize=6.6, leading=8.2, textColor=INK_SOFT)
NOTE = ParagraphStyle('note', fontName='LB', fontSize=7.4, leading=9.6, textColor=white)
QUESTION = ParagraphStyle('q', fontName='LB-Bold', fontSize=8.6, leading=10.6, textColor=white)
STOP = ParagraphStyle('stop', fontName='Mont', fontSize=5.9, leading=7, textColor=INK,
                      alignment=1)

# A printed timeline, the one the study guide already publishes. Reference, not notes.
TIMELINE = [
    ('1953', 'Mosaddegh coup'),
    ('1979', 'Revolution and hostage crisis'),
    ('1980-88', 'Iran-Iraq War and Tanker War'),
    ('2015', 'JCPOA nuclear deal'),
    ('2018', 'U.S. leaves the JCPOA'),
    ('2024', 'First direct Iran-Israel attacks'),
    ('2025', 'Major direct war'),
    ('FEB 2026', 'Current war begins'),
]

# Six topic boxes, as Unit 1 has six. Topics 1 and 2 are the two FRONTLINE days
# and share one box.
BOXES = [
    ('topics_1_2', 'Topics 1-2', 'The War Now + The Road to War',
     'Key leaders | Hezbollah / Houthis | proxy vs. armed partner | Strait of Hormuz | '
     'trigger vs. deeper cause'),
    ('topic_3', 'Topic 3', 'Why the U.S. and Iran Became Enemies',
     'Mosaddegh / oil | Operation TPAJAX | the Shah / SAVAK | Khomeini | hostage crisis | '
     'what each year added to each side’s memory'),
    ('topic_4', 'Topic 4', 'Why Fight Far From Home?',
     'Iran-Iraq War | IRGC / Quds Force | deterrence vs. power projection | '
     'asymmetric strategy | where “proxy” misleads'),
    ('topic_5', 'Topic 5', 'The Nuclear Bargain',
     '1957 origins | enrichment / IAEA | the JCPOA trade | what the deal left out | '
     'the chain after 2018'),
    ('topic_6', 'Topic 6', 'From Shadow War to Open War',
     'Shadow war | the 2024 threshold | 2025 war | Feb. 2026 | size vs. precedent | '
     'path dependence'),
    ('topic_7', 'Topic 7', 'The Hormuz Lever',
     'Chokepoint | Tanker War / Earnest Will | EIA 21.6M → 4.9M barrels a day | '
     'what the data cannot prove | military / economic / diplomatic'),
]

SMALL = [
    ('causal_chains', '3 CAUSAL CHAINS'),
    ('terms_confuse', '3 TERMS I CONFUSE'),
    ('top_three', 'MY TOP 3 TURNING POINTS'),
]


def panel(c, x, y, w, h, hint=None):
    """The tan writing panel a field sits in, with its printed hint."""
    c.setFillColor(NEWSPRINT)
    c.setStrokeColor(LINE)
    c.roundRect(x, y, w, h, 3, stroke=1, fill=1)
    if hint:
        c.setFillColor(INK_SOFT)
        c.setFont('Mont', 5.8)
        c.drawString(x + 5, y + h - 8, hint)


def card(c, x, y, w, h):
    c.setFillColor(PAPER)
    c.setStrokeColor(INK_SOFT)
    c.setLineWidth(1.1)
    c.roundRect(x, y, w, h, 4, stroke=1, fill=1)
    c.setLineWidth(1)


def heading(c, x, y, tag, title, size=9, width=None):
    c.setFillColor(SIGNAL)
    c.setFont('Mont-XBold', 8.4)
    c.drawString(x, y, tag.upper())
    c.setFillColor(INK)
    while width and size > 6.5 and c.stringWidth(title, 'LB-Bold', size) > width:
        size -= 0.2  # shrink a long title to its card rather than past the border
    c.setFont('LB-Bold', size)
    c.drawString(x, y - 12, title)


def draw(path):
    """Draw the page with unlimited fields to `path`."""

    W, H = letter
    M = 34
    IW = W - 2 * M
    gap = 8
    c = canvas.Canvas(path, pagesize=letter)
    c.setTitle('BeCurrent Iran at War - Student-Created Test Reference Guide')
    c.setAuthor('BeCurrent')
    c.setSubject('One-page limited fillable reference guide for the Iran at War unit test')
    form = c.acroForm

    c.setFillColor(PAPER)
    c.rect(0, 0, W, H, stroke=0, fill=1)

    # Top rule, as Unit 1's, in this course's colours
    for x0, x1, col in ((0, .68, INK), (.68, .84, SIGNAL), (.84, 1, SIGNAL_PALE)):
        c.setFillColor(col)
        c.rect(W * x0, H - 9, W * (x1 - x0), 9, stroke=0, fill=1)

    # Header
    label(c, 'STUDENT-CREATED TEST REFERENCE GUIDE', M, H - 28, size=6.8)
    mark = svg2rlg(WORDMARK)
    scale = 24 / mark.height
    mark.scale(scale, scale)
    renderPDF.draw(mark, c, M - 2, H - 60)
    c.setFillColor(INK)
    c.setFont('Cinzel', 15)
    c.drawRightString(W - M, H - 52, 'Iran at War · One Page Reference')

    # Instruction band
    top = H - 68
    band_h = 40
    c.setFillColor(INK)
    c.roundRect(M, top - band_h, IW, band_h, 4, stroke=0, fill=1)
    label(c, 'BUILD THIS PAGE FOR REASONING, NOT COPYING.', M + 9, top - 12, SIGNAL_PALE,
          size=6.6)
    para(c, 'Keywords, arrows, abbreviations, cause-and-effect chains. Every box has a '
            'character limit, so choose what earns the space.', M + 9, top - 16, 262, NOTE)
    c.setStrokeColor(HexColor('#3A3A3A'))
    c.line(M + 282, top - 7, M + 282, top - band_h + 7)
    label(c, 'UNIT QUESTION', M + 291, top - 12, SIGNAL_PALE, size=6.6)
    para(c, 'Was the 2026 Iran War mainly the result of recent decisions, or decades of '
            'unresolved conflict?', M + 291, top - 16, IW - 300, QUESTION)

    # Timeline
    top -= band_h + 6
    tl_h = 48
    c.setFillColor(NEWSPRINT)
    c.setStrokeColor(LINE)
    c.roundRect(M, top - tl_h, IW, tl_h, 4, stroke=1, fill=1)
    label(c, 'TIMELINE FOR REFERENCE', M + 9, top - 10)
    axis_y = top - 28
    x0, x1 = M + 34, W - M - 34
    c.setStrokeColor(SIGNAL)
    c.setLineWidth(1.2)
    c.line(x0, axis_y, x1, axis_y)
    c.setLineWidth(1)
    step = (x1 - x0) / (len(TIMELINE) - 1)
    for i, (year, what) in enumerate(TIMELINE):
        x = x0 + i * step
        c.setFillColor(SIGNAL)
        c.circle(x, axis_y, 2.4, stroke=0, fill=1)
        c.setFillColor(INK)
        c.setFont('Mont-XBold', 6.6)
        c.drawCentredString(x, axis_y + 5, year)
        p = Paragraph(what, STOP)
        _, ph = p.wrap(step - 6, 30)
        p.drawOn(c, x - (step - 6) / 2, axis_y - 4 - ph)

    # Six topic cards, three by two
    top -= tl_h + 7
    cw = (IW - 2 * gap) / 3
    ch = 176
    for i, (name, tag, title, cue) in enumerate(BOXES):
        col, row = i % 3, i // 3
        x = M + col * (cw + gap)
        ct = top - row * (ch + gap)
        cb = ct - ch
        card(c, x, cb, cw, ch)
        heading(c, x + 8, ct - 13, tag, title, width=cw - 16)
        para(c, cue, x + 8, ct - 31, cw - 16, CUE)
        px, pw, ptop, pbot = x + 7, cw - 14, ct - 62, cb + 7
        panel(c, px, pbot, pw, ptop - pbot)
        field(form, name, f'{tag} {title} notes', px + 3, pbot + 3, pw - 6,
              ptop - 3 - (pbot + 3), TOPIC_SIZE)

    # Topic 8 synthesis, as Unit 1's 1.7 comparison block
    top -= 2 * (ch + gap)
    bottom = M + 14
    card(c, M, bottom, IW, top - bottom)
    heading(c, M + 9, top - 13, 'Topic 8', 'Back to the Headline: Build Your Argument', 9.4)
    para(c, 'Recent decisions vs. decades of conflict | your top three turning points and the '
            'mechanism that links them | the turning point someone else might rank first | '
            'one detail from this week’s news', M + 9, top - 31, IW - 18, CUE)
    small_h = 58
    ptop = top - 50
    pbot = bottom + 8 + small_h + 6
    panel(c, M + 8, pbot, IW - 16, ptop - pbot, 'Argument notes, ranking, or causal chain')
    field(form, 'topic_8_argument', 'Topic 8 argument notes', M + 11, pbot + 3, IW - 22,
          ptop - 12 - (pbot + 3), BIG_SIZE)
    sw = (IW - 16 - 2 * gap) / 3
    for i, (name, text) in enumerate(SMALL):
        sx = M + 8 + i * (sw + gap)
        sb = bottom + 8
        panel(c, sx, sb, sw, small_h)
        label(c, text, sx + 5, sb + small_h - 10, size=6)
        field(form, name, text.capitalize(), sx + 3, sb + 3, sw - 6, small_h - 17,
              SMALL_SIZE)

    # Footer
    c.setStrokeColor(LINE)
    c.line(M, M + 6, W - M, M + 6)
    c.setFillColor(INK_SOFT)
    c.setFont('Mont', 6)
    c.drawString(M, M - 3, 'BeCurrent · Iran at War · Student-Created Reference Guide')
    c.drawRightString(W - M, M - 3, 'One page only | Fillable PDF | '
                                    'Submitted version = test version')

    c.showPage()
    c.save()


def fields(pdf_path):
    return [a.get_object() for a in PdfReader(pdf_path).pages[0]['/Annots']]


def fix_font_sizes(src, dst):
    """reportlab writes a field's DA font size with %d, so 6.5pt becomes 6pt.
    Put the real size back before anything is measured."""
    wanted = {name: SMALL_SIZE for name, _ in SMALL}
    writer = PdfWriter()
    writer.append(PdfReader(src))
    for annot in writer.pages[0]['/Annots']:
        o = annot.get_object()
        size = wanted.get(o.get('/T'))
        if size is not None:
            rest = str(o['/DA']).split(' Tf', 1)[1]
            o[NameObject('/DA')] = TextStringObject(f'/Helv {size:g} Tf{rest}')
    with open(dst, 'wb') as fh:
        writer.write(fh)


def _enter(doc, page, obj, text, paste=False):
    """Click into a field and type (key by key) or paste `text`, as a student would."""
    h = doc.formenv.raw
    r = [float(v) for v in obj['/Rect']]
    x, y = (r[0] + r[2]) / 2, (r[1] + r[3]) / 2
    pdfium_raw.FORM_OnLButtonDown(h, page.raw, 0, x, y)
    pdfium_raw.FORM_OnLButtonUp(h, page.raw, 0, x, y)
    if paste:
        buf = ctypes.create_string_buffer((text + '\0').encode('utf-16-le'))
        pdfium_raw.FORM_ReplaceSelection(h, page.raw, ctypes.cast(buf, ctypes.POINTER(pdfium_raw.FPDF_WCHAR)))
    else:
        for ch in text:
            pdfium_raw.FORM_OnChar(h, page.raw, ord(ch), 0)
    pdfium_raw.FORM_ForceToKillFocus(h)


def _values(doc, tmpdir, tag):
    out = os.path.join(tmpdir, f'{tag}.pdf')
    doc.save(out)
    reader = PdfReader(out)
    if reader.is_encrypted:
        reader.decrypt('')
    return {str(a.get_object()['/T']): len(str(a.get_object().get('/V') or ''))
            for a in reader.pages[0]['/Annots']}


def typed_capacity(pdf_path, text, tmpdir, tag):
    """How many characters of `text` each box accepts when typed, with no limit set.
    "Do not scroll" stops typing at the edge, so this is what the box can show."""
    doc = pdfium.PdfDocument(pdf_path)
    doc.init_forms()
    page = doc[0]
    for obj in fields(pdf_path):
        _enter(doc, page, obj, (text * 40)[:3000])
    return _values(doc, tmpdir, tag)


def calibrate(pdf_path, tmpdir):
    caps = [typed_capacity(pdf_path, t, tmpdir, f'cal{i}') for i, t in enumerate(CALIBRATION)]
    for name, n in caps[0].items():
        if n >= 3000:
            raise SystemExit(f'{name}: typing never filled the box, so it cannot be measured')
    return {name: min(c[name] for c in caps) for name in caps[0]}


def finalize(src, dst, limits):
    """Write the measured limits, then permission-lock the file: it opens with no
    password and its fields can be filled and printed, but the form cannot be
    edited, so no field, font or size can be changed."""
    writer = PdfWriter()
    writer.append(PdfReader(src))
    for annot in writer.pages[0]['/Annots']:
        o = annot.get_object()
        o[NameObject('/MaxLen')] = NumberObject(limits[str(o['/T'])])
    writer.encrypt(user_password='', owner_password=secrets.token_hex(16), algorithm='AES-128',
                   permissions_flag=(Perm.PRINT | Perm.FILL_FORM_FIELDS
                                     | Perm.EXTRACT_TEXT_AND_GRAPHICS | Perm.PRINT_TO_REPRESENTATION))
    with open(dst, 'wb') as fh:
        writer.write(fh)


def verify(pdf_path, limits, capacity_held_out, tmpdir):
    """Paste text the limits were not measured with into every box, and fail if any
    box keeps more than it can show. Also check the locks are really in the file."""
    doc = pdfium.PdfDocument(pdf_path)
    doc.init_forms()
    page = doc[0]
    for obj in fields(pdf_path):
        _enter(doc, page, obj, (HELD_OUT * 40)[:3000], paste=True)
    kept = _values(doc, tmpdir, 'verify')
    problems = []
    for name, n in kept.items():
        if n != limits[name]:
            problems.append(f'{name}: paste kept {n}, limit is {limits[name]}')
        if n > capacity_held_out[name]:
            problems.append(f'{name}: paste kept {n} but the box shows {capacity_held_out[name]}')
    reader = PdfReader(pdf_path)
    if not reader.is_encrypted or not reader.decrypt(''):
        problems.append('file is not locked, or needs a password to open')
    for a in reader.pages[0]['/Annots']:
        o = a.get_object()
        ff, da = int(o['/Ff']), str(o['/DA'])
        if ff & (1 << 25):
            problems.append(f"{o['/T']}: rich text is on, so the font could be changed")
        if not ff & (1 << 23):
            problems.append(f"{o['/T']}: do not scroll is off")
        if da.split(' Tf')[0].endswith(' 0'):
            problems.append(f"{o['/T']}: auto font size")
    if problems:
        raise SystemExit('Reference sheet failed verification:\n  ' + '\n  '.join(problems))


def build():
    global HAS_SYM
    HAS_SYM = register_fonts()
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    tmp = tempfile.mkdtemp(prefix='bc-sheet-')
    raw_pdf, draft = os.path.join(tmp, 'raw.pdf'), os.path.join(tmp, 'draft.pdf')
    draw(raw_pdf)
    fix_font_sizes(raw_pdf, draft)
    limits = calibrate(draft, tmp)
    held_out = typed_capacity(draft, HELD_OUT, tmp, 'held-out')
    finalize(draft, OUT, limits)
    verify(OUT, limits, held_out, tmp)
    print('wrote', os.path.relpath(OUT, ROOT))
    for name in limits:
        print(f'  {name:17} limit {limits[name]:4}  (box shows {held_out[name]} of the held-out notes)')


if __name__ == '__main__':
    build()
