from pathlib import Path

html_path = Path('iran/topic-03-1979.html')
html = html_path.read_text(encoding='utf-8')

# Add a quick, historically accurate pre-1953 setup.
nav_old = '<a href="../index.html">Home</a><a href="index.html">Iran</a><a href="#1953">1953</a>'
nav_new = '<a href="../index.html">Home</a><a href="index.html">Iran</a><a href="#origins">Origins</a><a href="#1953">1953</a>'
if nav_old in html:
    html = html.replace(nav_old, nav_new, 1)

marker = '<section class="ir-section" id="1953">'
origins = '''<section class="ir-section" id="origins"><div class="ir-head"><div class="ir-kicker">Quick setup · Before 1953</div><div><h2>Iran was not created by the Mandate System.</h2><p>After World War I, Britain and France governed several former Ottoman territories through League of Nations mandates. Iran followed a different path. Persia was already an independent state with a long political history, although Britain and Russia repeatedly competed for influence there. That difference matters because the 1953 crisis grew out of arguments over sovereignty and foreign interference, not out of a newly created mandate state.</p></div></div>
<div class="ir-paper"><h3>Three things to know before the oil crisis.</h3><div class="ir-grid-3"><div><div class="ir-kicker red">1 · The mandate system</div><h4>It reshaped much of the Arab Middle East after World War I.</h4><p>Britain received mandates over places including Iraq and Palestine, while France received Syria and Lebanon. Those arrangements placed former Ottoman territories under European administration.</p></div><div><div class="ir-kicker red">2 · Iran was different</div><h4>Persia was not a League of Nations mandate.</h4><p>It remained formally independent, but British and Russian power still mattered enormously. Foreign pressure, oil concessions, and repeated intervention made sovereignty a major political issue.</p></div><div><div class="ir-kicker red">3 · The Pahlavi monarchy</div><h4>Reza Shah built a stronger centralized state.</h4><p>Reza Khan took power in the 1920s and became Reza Shah Pahlavi. In 1935, the government asked foreign countries to use the name Iran. In 1941, Britain and the Soviet Union forced him to abdicate, and his son Mohammad Reza Shah became monarch — the Shah students will encounter in 1953 and 1979.</p></div></div></div></section>

'''
if 'id="origins"' not in html:
    if marker not in html:
        raise SystemExit('Could not find the 1953 section insertion point.')
    html = html.replace(marker, origins + marker, 1)

# Filing 1 must be answerable before students learn the 1979 Revolution.
old_q = 'Why did 1953 become politically powerful during and after the 1979 revolution?'
new_q = 'Why could the 1953 coup become a lasting reason for Iranians to distrust the United States?'
html = html.replace(old_q, new_q)
html = html.replace('Do not stop at “Iran remembered it.” Explain what the event allowed later Iranians to believe or argue about the United States.',
                    'Use what you know from the oil crisis, Operation Ajax, and the strengthened Shah. Explain what 1953 could lead Iranians to believe about U.S. power and Iranian sovereignty.', 1)

# Clarify that the Shah was already out of power by the hostage crisis.
old_hostage = 'In October 1979, President Jimmy Carter allowed the seriously ill Shah to enter the United States for medical treatment. For many Iranians who remembered 1953, the decision raised fears that Washington might again help return the Shah to power. On November 4, student militants seized the U.S. Embassy in Tehran.'
new_hostage = 'The Shah had already lost power and left Iran in January 1979. After months in exile, President Jimmy Carter allowed him to enter the United States in October for cancer treatment. For many Iranians shaped by the memory of the 1953 coup, his arrival revived fears that Washington might again intervene to restore him or otherwise shape Iran’s politics. On November 4, student militants seized the U.S. Embassy in Tehran.'
if old_hostage not in html:
    raise SystemExit('Could not find the hostage-crisis paragraph to clarify.')
html = html.replace(old_hostage, new_hostage, 1)

html_path.write_text(html, encoding='utf-8')

# Keep the canonical topic question aligned with what students see and what Canvas gathers.
content_path = Path('scripts/lib/unit-content/iran.js')
content = content_path.read_text(encoding='utf-8')
old_canonical = "question('Perspective and Interpretation','memory','Why did 1953 become politically powerful during and after the 1979 revolution?')"
new_canonical = "question('Perspective and Interpretation','memory','Why could the 1953 coup become a lasting reason for Iranians to distrust the United States?')"
if old_canonical not in content:
    raise SystemExit('Could not find the canonical Filing 1 question.')
content = content.replace(old_canonical, new_canonical, 1)
content_path.write_text(content, encoding='utf-8')
