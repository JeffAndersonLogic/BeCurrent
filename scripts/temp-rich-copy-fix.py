from pathlib import Path


def replace_once(path, old, new):
    p = Path(path)
    text = p.read_text()
    if new in text:
        return False
    count = text.count(old)
    if count != 1:
        raise SystemExit(f'{path}: expected one old match, found {count}')
    p.write_text(text.replace(old, new, 1))
    return True


replace_once(
    'scripts/lib/iran-topic-page.js',
    """    const head='<p><strong>'+esc(dateline)+'</strong></p><h2>'+esc(meta.title)+'</h2><p><em>Student work, copied '+esc(stamp.toLocaleString())+'</em></p><hr>';
    const bodyHtml=rows.map(r=>'<h3>'+esc(r.label)+'</h3><p><strong>Question: '+esc(r.prompt)+'</strong></p><p><strong>My response:</strong></p>'+bcParagraphsHtml(r.text,'em')).join('<hr>');""",
    """    const head='<p style=\"font-size:10pt;font-weight:700;margin:0 0 4pt;\">'+esc(dateline)+'</p>'
      + '<h1 style=\"font-size:24pt;line-height:1.15;margin:0 0 8pt;\">'+esc(meta.title)+'</h1>'
      + '<p style=\"font-size:10pt;margin:0 0 12pt;\"><em>Student work, copied '+esc(stamp.toLocaleString())+'</em></p><hr>';
    const bodyHtml=rows.map(r=>'<h2 style=\"font-size:16pt;line-height:1.2;margin:16pt 0 6pt;\">'+esc(r.label)+'</h2>'
      + '<p style=\"font-size:11pt;line-height:1.4;margin:0 0 6pt;\"><strong>Question: '+esc(r.prompt)+'</strong></p>'
      + '<p style=\"font-size:10.5pt;margin:0 0 4pt;\"><strong>My response:</strong></p>'
      + '<div style=\"font-size:11pt;line-height:1.45;margin:0 0 8pt;\">'+bcParagraphsHtml(r.text,'em')+'</div>').join('<hr>');"""
)

replace_once(
    'scripts/lib/brief-capture-block.js',
    """    var head = '<p><strong>' + bcEsc(dateline) + '</strong></p>'
      + (title ? '<h2>' + bcEsc(title) + '</h2>' : '')
      + '<p><em>Student work, copied ' + bcEsc(stamp.toLocaleString()) + '</em></p>'
      + '<hr>';""",
    """    var head = '<p style=\"font-size:10pt;font-weight:700;margin:0 0 4pt;\">' + bcEsc(dateline) + '</p>'
      + (title ? '<h1 style=\"font-size:24pt;line-height:1.15;margin:0 0 8pt;\">' + bcEsc(title) + '</h1>' : '')
      + '<p style=\"font-size:10pt;margin:0 0 12pt;\"><em>Student work, copied ' + bcEsc(stamp.toLocaleString()) + '</em></p>'
      + '<hr>';"""
)

replace_once(
    'scripts/lib/brief-capture-block.js',
    """    var body = rows.map(function (r) {
      return '<h3>' + bcEsc(r.label) + '</h3>'
        + '<p>Confidence: ' + bcEsc(confidencePhrase(r.confidence)) + '</p>'
        + '<p><strong>Question: ' + bcEsc(r.prompt) + '</strong></p>'
        + '<p><strong>My response:</strong></p>'
        + bcParagraphsHtml(r.text, 'em');
    }).join('<hr>');""",
    """    var body = rows.map(function (r) {
      return '<h3 style=\"font-size:16pt;line-height:1.2;margin:16pt 0 6pt;\">' + bcEsc(r.label) + '</h3>'
        + '<p style=\"font-size:9.5pt;margin:0 0 5pt;\">Confidence: ' + bcEsc(confidencePhrase(r.confidence)) + '</p>'
        + '<p style=\"font-size:11pt;line-height:1.4;margin:0 0 6pt;\"><strong>Question: ' + bcEsc(r.prompt) + '</strong></p>'
        + '<p style=\"font-size:10.5pt;margin:0 0 4pt;\"><strong>My response:</strong></p>'
        + '<div style=\"font-size:11pt;line-height:1.45;margin:0 0 8pt;\">' + bcParagraphsHtml(r.text, 'em') + '</div>';
    }).join('<hr>');"""
)

replace_once(
    'assets/js/becurrent-week-renderer-v1.js',
    """  const head = [
    `<p><strong>CURRENT EVENTS, WEEK ${esc(String(meta.weekNumber || '').padStart(2, '0'))}</strong></p>`,
    `<p><em>Student work, copied ${stamp.toLocaleString()}</em></p>`,
    '<hr>'
  ];

  const body = work.map(w => [
    `<p><strong>${esc(w.label)}</strong></p>`,
    `<p><strong>Question:</strong> <em>${esc(w.prompt)}</em></p>`,
    '<p><strong>My response:</strong></p>',
    bcParagraphsHtml(w.text, '')
  ].join('\\n')).join('\\n<hr>\\n');""",
    """  const weekLabel = `CURRENT EVENTS, WEEK ${esc(String(meta.weekNumber || '').padStart(2, '0'))}`;
  const head = [
    `<p style=\"font-size:10pt;font-weight:700;margin:0 0 4pt;\">${weekLabel}</p>`,
    meta.title ? `<h1 style=\"font-size:24pt;line-height:1.15;margin:0 0 8pt;\">${esc(meta.title)}</h1>` : '',
    `<p style=\"font-size:10pt;margin:0 0 12pt;\"><em>Student work, copied ${stamp.toLocaleString()}</em></p>`,
    '<hr>'
  ].filter(Boolean);

  const body = work.map(w => [
    `<h2 style=\"font-size:16pt;line-height:1.2;margin:16pt 0 6pt;\">${esc(w.label)}</h2>`,
    `<p style=\"font-size:11pt;line-height:1.4;margin:0 0 6pt;\"><strong>Question:</strong> <em>${esc(w.prompt)}</em></p>`,
    '<p style=\"font-size:10.5pt;margin:0 0 4pt;\"><strong>My response:</strong></p>',
    `<div style=\"font-size:11pt;line-height:1.45;margin:0 0 8pt;\">${bcParagraphsHtml(w.text, '')}</div>`
  ].join('\\n')).join('\\n<hr>\\n');"""
)

replace_once(
    'assets/js/becurrent-week-renderer-v1.js',
    """  const filled = work.filter(w => w.text).length;
  return { html: head.join('\\n') + body + footer, count: filled, work: work };
}""",
    """  const plain = [weekLabel, meta.title || '', `Student work, copied ${stamp.toLocaleString()}`, '']
    .filter(Boolean)
    .concat(work.map(w => [
      w.label.toUpperCase(),
      'Question: ' + w.prompt,
      'My response:',
      w.text,
      ''
    ].join('\\n')))
    .concat(manifest)
    .join('\\n');

  const filled = work.filter(w => w.text).length;
  return { html: head.join('\\n') + body + footer, plain: plain, count: filled, work: work };
}"""
)

replace_once(
    'assets/js/becurrent-week-renderer-v1.js',
    """  if (out) out.value = doc.html.replace(/<\\/p>/g, '</p>\\n');""",
    """  if (out) {
    out.value = doc.plain;
    out.dataset.html = doc.html;
  }"""
)

replace_once(
    'assets/js/becurrent-week-renderer-v1.js',
    """async function copyGathered() {
  const out = byId('gather-output');
  if (!out || !out.value) gatherAllWork();
  const text = byId('gather-output').value;
  try {
    await navigator.clipboard.writeText(text);
    byId('gather-status').textContent = 'Copied. Paste it into the Canvas assignment.';
  } catch (e) {
    // Clipboard is blocked on some managed devices, so fall back to selecting
    // the text and telling the student what to press.
    byId('gather-output').select();
    byId('gather-status').textContent = 'Select-all done, now press Ctrl+C (or Cmd+C) to copy.';
  }
}""",
    """function copyGatheredRichFallback(html, plain) {
  const host = document.createElement('div');
  host.setAttribute('contenteditable', 'true');
  host.setAttribute('aria-hidden', 'true');
  host.style.position = 'fixed';
  host.style.left = '-10000px';
  host.style.top = '0';
  host.innerHTML = html;
  document.body.appendChild(host);
  const range = document.createRange();
  range.selectNodeContents(host);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
  let copied = false;
  try { copied = document.execCommand('copy'); } catch (e) { copied = false; }
  sel.removeAllRanges();
  host.remove();
  if (copied) {
    byId('gather-status').textContent = 'Copied with formatting. Paste it into the Canvas assignment.';
    return;
  }
  const out = byId('gather-output');
  if (out) out.select();
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(plain).then(() => {
      byId('gather-status').textContent = 'Copied as plain text. Paste it into the Canvas assignment.';
    }).catch(() => {
      byId('gather-status').textContent = 'Copy is blocked. Press Ctrl+C (or Cmd+C) to copy the selected plain text.';
    });
  } else {
    byId('gather-status').textContent = 'Press Ctrl+C (or Cmd+C) to copy the selected plain text.';
  }
}

async function copyGathered() {
  const out = byId('gather-output');
  if (!out || !out.value || !out.dataset.html) gatherAllWork();
  const current = byId('gather-output');
  const html = current.dataset.html || '';
  const plain = current.value || '';
  if (window.ClipboardItem && navigator.clipboard && navigator.clipboard.write) {
    try {
      await navigator.clipboard.write([new ClipboardItem({
        'text/html': new Blob([html], { type: 'text/html' }),
        'text/plain': new Blob([plain], { type: 'text/plain' })
      })]);
      byId('gather-status').textContent = 'Copied with formatting. Paste it into the Canvas assignment.';
      return;
    } catch (e) { }
  }
  copyGatheredRichFallback(html, plain);
}"""
)
