from pathlib import Path

html_path = Path('iran/topic-03-1979.html')
html = html_path.read_text(encoding='utf-8')
html = html.replace('<strong>1953 first. Then 1979.</strong>', '<strong>Quick origins. Then 1953. Then 1979.</strong>', 1)
html_path.write_text(html, encoding='utf-8')

path = Path('scripts/lib/unit-content/iran.js')
text = path.read_text(encoding='utf-8')
old_overview = "overview:'Answer the first major question created by FRONTLINE by establishing the 1953 overthrow of Mohammad Mosaddegh first, then moving forward to the 1979 Islamic Revolution and hostage crisis. Students compare two powerful historical memories without treating either event as destiny.',"
new_overview = "overview:'Answer the first major question created by FRONTLINE by briefly clarifying that Iran was not created by the post-World War I Mandate System, then establishing the 1953 overthrow of Mohammad Mosaddegh before moving forward to the 1979 Islamic Revolution and hostage crisis. Students compare two powerful historical memories without treating either event as destiny.',"
old_inclass = "inClass:'Begin with oil nationalization, Mosaddegh, Operation TPAJAX, and the strengthened Shah. Then move to the Shah’s U.S. alliance, the 1978–1979 revolution, Khomeini, and the hostage crisis before deciding which turning point transformed the relationship more.',"
new_inclass = "inClass:'Open with a brief contrast between the mandate states and Iran’s separate path into the Pahlavi monarchy. Then move to oil nationalization, Mosaddegh, Operation TPAJAX, and the strengthened Shah before covering the Shah’s U.S. alliance, the 1978–1979 revolution, Khomeini, and the hostage crisis.',"
if old_overview not in text or old_inclass not in text:
    raise SystemExit('Could not find Topic 3 canonical overview/inClass text.')
text = text.replace(old_overview, new_overview, 1)
text = text.replace(old_inclass, new_inclass, 1)
path.write_text(text, encoding='utf-8')
