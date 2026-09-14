from pathlib import Path

html_path = Path('iran/topic-03-1979.html')
css_path = Path('assets/css/iran-topic3.css')
unit_path = Path('scripts/lib/unit-content/iran.js')

html = html_path.read_text(encoding='utf-8')
needle = "</p></div></div></div></section>\n\n<section class=\"ir-section\" id=\"1953\">"
figure = '''</p></div></div></div>
<figure class="topic3-mandate-map">
  <img src="../assets/images/iran/mandates-1920.webp" alt="League of Nations mandates in the Middle East in 1920, showing French mandates in Syria and Lebanon, British mandates in Palestine, Transjordan, and Iraq, with Iran visible to the east outside the mandate territories.">
  <figcaption><strong>What to notice:</strong> Iran is on the map, but it is not shaded or labeled as a British or French mandate. That is the key distinction students need before moving into the 1953 sovereignty crisis.</figcaption>
</figure>
</section>

<section class="ir-section" id="1953">'''
if 'topic3-mandate-map' not in html:
    if needle not in html:
        raise SystemExit('Could not find origins-section insertion point.')
    html = html.replace(needle, figure, 1)
html_path.write_text(html, encoding='utf-8')

css = css_path.read_text(encoding='utf-8')
css_block = '''\n\n/* Mandate-system visual: keep the historical distinction obvious at a glance. */
body[data-topic="topic-03"] .topic3-mandate-map{
  margin:18px 0 0;
  padding:0;
  overflow:hidden;
  background:#111416;
  border:1px solid rgba(237,232,220,.18);
  box-shadow:0 16px 38px rgba(0,0,0,.22);
}
body[data-topic="topic-03"] .topic3-mandate-map img{
  display:block;
  width:100%;
  max-height:680px;
  object-fit:contain;
  background:#111416;
}
body[data-topic="topic-03"] .topic3-mandate-map figcaption{
  margin:0;
  padding:16px 20px 18px;
  background:var(--clean-paper);
  color:#3f484c;
  border-top:4px solid var(--signal);
  font:500 14px/1.55 var(--body);
}
body[data-topic="topic-03"] .topic3-mandate-map figcaption strong{
  color:var(--signal);
  font-weight:800;
}
'''
if '.topic3-mandate-map{' not in css:
    css += css_block
css_path.write_text(css, encoding='utf-8')

unit = unit_path.read_text(encoding='utf-8')
old = "inClass:'Open with a brief contrast between the mandate states and Iran’s separate path into the Pahlavi monarchy. Then move to oil nationalization, Mosaddegh, Operation TPAJAX, and the strengthened Shah before covering the Shah’s U.S. alliance, the 1978–1979 revolution, Khomeini, and the hostage crisis.'"
new = "inClass:'Open with the mandate-system map and a brief contrast between the mandate states and Iran’s separate path into the Pahlavi monarchy. Then move to oil nationalization, Mosaddegh, Operation TPAJAX, and the strengthened Shah before covering the Shah’s U.S. alliance, the 1978–1979 revolution, Khomeini, and the hostage crisis.'"
if old in unit:
    unit = unit.replace(old, new, 1)
unit_path.write_text(unit, encoding='utf-8')
