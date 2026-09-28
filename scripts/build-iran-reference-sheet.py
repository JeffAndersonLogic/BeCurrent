#!/usr/bin/env python3
"""Build the Iran at War one-page test reference sheet, a fillable PDF.

    python3 scripts/build-iran-reference-sheet.py

Writes docs/assessments/iran-reference-sheet.pdf. Students type into the boxes,
save, and submit the saved PDF in Canvas; the submitted version is the one they
may use on the unit test.

The prompts are organizing cues, not answers, the same rule the Social Media
assessment resource follows. Every term on it comes from
scripts/lib/unit-content/iran.js or the eight topic pages under iran/.

Needs `pip install reportlab svglib fonttools brotli`, and is off the test path
on purpose, like scripts/brand/build-wordmark.py: validate.js has to stay
runnable on a bare checkout. The output is committed.
"""
import os
import tempfile

from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.lib.fonts import addMapping
from reportlab.pdfbase.ttfonts import TTFont as RLFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph
from reportlab.graphics import renderPDF
from svglib.svglib import svg2rlg

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONTS = os.path.join(ROOT, 'assets', 'fonts')
OUT = os.path.join(ROOT, 'docs', 'assessments', 'iran-reference-sheet.pdf')
WORDMARK = os.path.join(ROOT, 'assets', 'images', 'brand', 'becurrent-wordmark.svg')

# Tokens from assets/css/becurrent-brand.css
INK = HexColor('#141414')
INK_SOFT = HexColor('#454545')
NEWSPRINT = HexColor('#F4F2ED')
PAPER = HexColor('#FFFEFB')
SIGNAL = HexColor('#CE1400')
SIGNAL_DEEP = HexColor('#A31000')
SIGNAL_PALE = HexColor('#E9958C')
LINE = HexColor('#D2CFC8')


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
    for bold, italic, face in ((0, 0, 'LB'), (1, 0, 'LB-Bold'), (0, 1, 'LB-Ital'), (1, 1, 'LB-Bold')):
        addMapping('LB', bold, italic, face)
    # None of the three course faces carries an arrow or not-equal sign.
    for path in ('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
                 '/usr/share/fonts/dejavu/DejaVuSans-Bold.ttf'):
        if os.path.exists(path):
            pdfmetrics.registerFont(RLFont('Sym', path))
            return True
    return False


HAS_SYM = False
SYMBOLS = {'→': '->', '←': '<-', '↔': '<->', '≠': '=/='}


def sym(text):
    for ch, ascii_ in SYMBOLS.items():
        text = text.replace(ch, f'<font name="Sym">{ch}</font>' if HAS_SYM else ascii_)
    return text


def para(c, text, x, y_top, width, style):
    """Draw a paragraph with its top at y_top; return the height used."""
    p = Paragraph(sym(text), style)
    _, h = p.wrap(width, 1000)
    p.drawOn(c, x, y_top - h)
    return h


ST = {}


def styles():
    ST['term'] = ParagraphStyle('term', fontName='Mont', fontSize=6.7, leading=8.1,
                                textColor=INK, leftIndent=6, bulletIndent=0,
                                bulletFontName='Mont-Bold', bulletColor=SIGNAL)
    ST['link'] = ParagraphStyle('link', fontName='Mont-Bold', fontSize=6.5, leading=7.9,
                                textColor=SIGNAL_DEEP)
    ST['hint'] = ParagraphStyle('hint', fontName='LB-Ital', fontSize=6.2, leading=7.4,
                                textColor=INK_SOFT)
    ST['q'] = ParagraphStyle('q', fontName='LB-Bold', fontSize=9.6, leading=12, textColor=INK)
    ST['note'] = ParagraphStyle('note', fontName='LB', fontSize=6.6, leading=8.2,
                                textColor=INK_SOFT)
    ST['label'] = ParagraphStyle('label', fontName='Mont-XBold', fontSize=5.8, leading=7,
                                 textColor=SIGNAL_DEEP)


# One card per topic. Terms are cues to organize, never answers.
CARDS = [
    ('01', 'The War Now', '2026',
     ['Strait of Hormuz', 'Proxy vs. armed partner', 'Hezbollah · Houthis', 'IRGC',
      'Deterrence'],
     'Today’s war → a relationship that needs a history',
     'Who and where matter most in the current war?'),
    ('02', 'The Road to War', 'FRONTLINE',
     ['A documentary is a sourced interpretation', 'Immediate trigger vs. historical cause',
      'Security dilemma', 'Nuclear program'],
     'The day fighting began ≠ the day the conflict began',
     'What did the film document, and what did it argue?'),
    ('03', 'Why the U.S. and Iran Became Enemies', '1953 → 1979',
     ['Iran was not a mandate', 'Mosaddegh · oil nationalization',
      'Operation TPAJAX (Ajax)', 'The Shah · SAVAK', 'Khomeini · Islamic Revolution',
      'Hostage crisis · historical memory'],
     'Intervention → alliance → revolution → reaction',
     'What grievance did each year create, and for whom?'),
    ('04', 'Why Fight Far From Home?', '1980-1988',
     ['Iran-Iraq War: invasion, isolation', 'IRGC · Quds Force',
      'Deterrence vs. power projection', 'Asymmetric strategy', 'Where “proxy” misleads'],
     'Vulnerability → security lesson → missiles and partners',
     'Can one strategy look defensive and threatening at once?'),
    ('05', 'The Nuclear Bargain', '1957-2018',
     ['1957: the U.S. helps start it', 'Enrichment · IAEA · verification',
      'JCPOA (2015): limits and monitoring for sanctions relief', '2018 U.S. withdrawal'],
     'Withdrawal → sanctions → less compliance → more pressure',
     'What did the deal solve, and what did it leave out?'),
    ('06', 'From Shadow War to Open War', '2023-2026',
     ['Shadow war', '2024: first direct Iran-Israel attacks', '2025 war · U.S. strikes',
      'Feb. 28, 2026 offensive', 'Threshold · precedent · path dependence'],
     'Size of an attack vs. the precedent it sets',
     'When did full-scale war become most likely?'),
    ('07', 'The Hormuz Lever', '1980s + 2026',
     ['Chokepoint', 'Tanker War · Operation Earnest Will (1987)',
      'EIA: 21.6M → 4.9M barrels per day', 'Military, economic, or diplomatic leverage'],
     'Narrow route → disrupted shipping → global consequences',
     'What do the numbers prove, and what do they not?'),
    ('08', 'Back to the Headline', 'This week',
     ['Turning point', 'Causal mechanism', 'Explanatory beginning vs. immediate trigger',
      'Counterargument'],
     'This week’s news detail → the turning point behind it',
     'One detail from this week’s news, and the turning point that explains it.'),
]

UNIT_QUESTION = ('Was the 2026 Iran War mainly the result of recent decisions, '
                 'or decades of unresolved conflict?')


def field(form, name, tip, x, y, w, h, multiline=True, size=0):
    """size=0 is auto: text shrinks to fit, so nothing a student types is hidden."""
    form.textfield(name=name, tooltip=tip, x=x, y=y, width=w, height=h,
                   fontName='Helvetica', fontSize=size, borderWidth=0.6,
                   borderColor=LINE, fillColor=PAPER, textColor=INK,
                   fieldFlags='multiline' if multiline else '', forceBorder=True,
                   maxlen=None)  # reportlab defaults to 100 characters, which cuts notes off


def label(c, text, x, y, color=SIGNAL_DEEP, font='Mont-XBold', size=5.8, spacing=0.6):
    t = c.beginText(x, y)
    t.setFont(font, size)
    t.setFillColor(color)
    t.setCharSpace(spacing)
    t.textOut(text)
    t.setCharSpace(0)  # Tc persists in the PDF text state; never let it leak
    c.drawText(t)


def build():
    global HAS_SYM
    HAS_SYM = register_fonts()
    styles()
    os.makedirs(os.path.dirname(OUT), exist_ok=True)

    W, H = letter
    M = 26
    c = canvas.Canvas(OUT, pagesize=letter)
    c.setTitle('Iran at War Test Reference Sheet')
    c.setAuthor('BeCurrent')
    c.setSubject('One-page fillable reference sheet for the Iran at War unit test')
    form = c.acroForm

    c.setFillColor(NEWSPRINT)
    c.rect(0, 0, W, H, stroke=0, fill=1)

    # Masthead
    top = H - M
    mast_h = 50
    c.setFillColor(INK)
    c.roundRect(M, top - mast_h, W - 2 * M, mast_h, 6, stroke=0, fill=1)
    c.setFillColor(SIGNAL)
    c.rect(M, top - mast_h, W - 2 * M, 3, stroke=0, fill=1)
    mark = svg2rlg(WORDMARK)
    scale = 26 / mark.height
    mark.scale(scale, scale)
    renderPDF.draw(mark, c, M + 12, top - mast_h + 14)
    tx = M + 12 + mark.width * scale + 14
    c.setStrokeColor(HexColor('#3A3A3A'))
    c.line(tx - 7, top - 12, tx - 7, top - mast_h + 10)
    label(c, 'CURRENT EVENTS · IRAN AT WAR · UNIT TEST', tx, top - 18, SIGNAL_PALE, size=6)
    c.setFillColor(white)
    c.setFont('Cinzel', 14)
    c.drawString(tx, top - 36, 'Test Reference Sheet')
    # Name field
    fx, fw = W - M - 176, 164
    label(c, 'STUDENT', fx, top - 17, SIGNAL_PALE, size=6)
    field(form, 'student_name', 'Student name', fx, top - 39, fw, 16, multiline=False, size=9)

    # Unit question band
    y = top - mast_h - 6
    band_h = 44
    c.setFillColor(PAPER)
    c.setStrokeColor(LINE)
    c.rect(M, y - band_h, W - 2 * M, band_h, stroke=1, fill=1)
    c.setFillColor(SIGNAL)
    c.rect(M, y - band_h, 4, band_h, stroke=0, fill=1)
    label(c, 'UNIT QUESTION', M + 12, y - 11)
    para(c, UNIT_QUESTION, M + 12, y - 14, 330, ST['q'])
    para(c, 'Type your notes in the boxes, in your own words. Save, then submit the saved '
            'PDF in Canvas. <b>The version you submit is the version you may use on the '
            'test.</b> One page only.',
         M + 356, y - 8, W - 2 * M - 366, ST['note'])
    y -= band_h + 6

    # Topic cards, two columns by four rows
    synth_h = 150
    footer_h = 12
    gap = 5
    rows = 4
    card_h = (y - M - footer_h - synth_h - gap * rows) / rows
    col_w = (W - 2 * M - gap) / 2
    left_w = 124
    for i, (num, title, when, terms, link, hint) in enumerate(CARDS):
        col, row = i % 2, i // 2
        x = M + col * (col_w + gap)
        ct = y - row * (card_h + gap)
        cb = ct - card_h
        c.setFillColor(PAPER)
        c.setStrokeColor(LINE)
        c.rect(x, cb, col_w, card_h, stroke=1, fill=1)
        c.setFillColor(SIGNAL)
        c.rect(x, cb, 3, card_h, stroke=0, fill=1)
        # Title row
        c.setFillColor(SIGNAL)
        c.roundRect(x + 8, ct - 15, 17, 11, 2, stroke=0, fill=1)
        c.setFillColor(white)
        c.setFont('Mont-XBold', 6.8)
        c.drawCentredString(x + 16.5, ct - 12.2, num)
        c.setFillColor(INK)
        c.setFont('Mont-XBold', 7.8)
        c.drawString(x + 30, ct - 12.5, title)
        c.setFont('Mont-Bold', 6)
        c.setFillColor(SIGNAL_DEEP)
        when_txt = when.replace('→', 'to')
        c.drawRightString(x + col_w - 7, ct - 12.3, when_txt.upper())
        # Left: what to know
        lx = x + 9
        ly = ct - 21
        label(c, 'KNOW', lx, ly - 4)
        ly -= 8
        for t in terms:
            ly -= para(c, t, lx, ly, left_w - 4, ParagraphStyle('b', parent=ST['term'],
                                                                bulletText='•'))
        ly -= 3
        label(c, 'CONNECTION', lx, ly - 4)
        ly -= 7
        para(c, link, lx, ly, left_w - 4, ST['link'])
        # Right: notes
        rx = x + left_w + 10
        rw = col_w - left_w - 17
        label(c, 'MY NOTES', rx, ct - 25)
        hh = para(c, hint, rx, ct - 28, rw, ST['hint'])
        fh = (ct - 31 - hh) - (cb + 6)
        field(form, f'topic{num}_notes', f'Topic {num} {title} notes', rx, cb + 6, rw, fh)

    # Final argument block
    sy = y - rows * (card_h + gap)
    sb = sy - synth_h
    c.setFillColor(PAPER)
    c.setStrokeColor(LINE)
    c.rect(M, sb, W - 2 * M, synth_h, stroke=1, fill=1)
    c.setFillColor(INK)
    c.rect(M, sy - 17, W - 2 * M, 17, stroke=0, fill=1)
    label(c, 'THE FINAL ARGUMENT', M + 10, sy - 11, SIGNAL_PALE, size=6.4)
    c.setFillColor(white)
    c.setFont('Mont-Bold', 7)
    c.drawString(M + 104, sy - 11.3, 'Sort the turning points, rank your top three, and '
                                     'answer the other side.')

    inner_t = sy - 25
    inner_b = sb + 7
    cw = (W - 2 * M - 30) / 3
    # Column 1: sort
    x1 = M + 10
    label(c, 'SORT · DECADES OF UNRESOLVED CONFLICT', x1, inner_t)
    half = (inner_t - inner_b - 22) / 2
    field(form, 'sort_decades', 'Turning points that belong to decades of unresolved conflict',
          x1, inner_t - 5 - half, cw, half)
    label(c, 'SORT · RECENT DECISIONS', x1, inner_t - half - 14)
    field(form, 'sort_recent', 'Turning points that belong to recent decisions',
          x1, inner_b, cw, half)
    # Column 2: rank
    x2 = x1 + cw + 5
    label(c, 'MY TOP THREE TURNING POINTS', x2, inner_t)
    ry = inner_t - 5
    for n in (1, 2, 3):
        c.setFillColor(SIGNAL)
        c.setFont('Mont-XBold', 8)
        c.drawString(x2, ry - 12, f'#{n}')
        field(form, f'rank_{n}', f'Turning point ranked number {n}', x2 + 15, ry - 15, cw - 15,
              14, multiline=False, size=8)
        ry -= 19
    label(c, 'WHY MY #1 EXPLAINS THE MOST', x2, ry - 5)
    field(form, 'rank_why', 'Why my number one turning point explains the most',
          x2, inner_b, cw, ry - 9 - inner_b)
    # Column 3: counterargument
    x3 = x2 + cw + 5
    label(c, 'SOMEONE ELSE MIGHT RANK FIRST...', x3, inner_t)
    field(form, 'counter_point', 'A turning point someone else might rank first, and why',
          x3, inner_t - 5 - half, cw, half)
    label(c, 'CONNECTIONS I DO NOT WANT TO FORGET', x3, inner_t - half - 14)
    field(form, 'connections', 'Connections I do not want to forget', x3, inner_b, cw, half)

    # Footer
    label(c, 'SUBMITTED VERSION = TEST VERSION', M, M + 2, SIGNAL_DEEP, size=6)
    c.setFillColor(INK_SOFT)
    c.setFont('Mont', 6)
    c.drawRightString(W - M, M + 2, 'BeCurrent · Iran at War · Test Reference Sheet')

    c.showPage()
    c.save()
    print('wrote', os.path.relpath(OUT, ROOT))


if __name__ == '__main__':
    build()
