"""Ensambla index.html a partir de src/ y build/ (datos generados por process.py)."""
import base64, pathlib
root = pathlib.Path(__file__).resolve().parents[1]
s = (root / 'src/template.html').read_text(encoding='utf-8')
meta = (root / 'build/meta.json').read_text(encoding='utf-8')
content = (root / 'src/content.js').read_text(encoding='utf-8') + '\n' + (root / 'src/content2.js').read_text(encoding='utf-8') + '\n' + (root / 'src/content3.js').read_text(encoding='utf-8') + '\n' + (root / 'src/content4.js').read_text(encoding='utf-8') + '\n' + (root / 'src/content5.js').read_text(encoding='utf-8') + '\n' + (root / 'src/content6.js').read_text(encoding='utf-8')
b64 = base64.b64encode((root / 'build/atlas.bin.gz').read_bytes()).decode()
import json
i18n = (root / 'src/i18n.js').read_text(encoding='utf-8')
packs = {f.stem: json.loads(f.read_text(encoding='utf-8')) for f in sorted((root / 'lang').glob('*.json'))} if (root / 'lang').is_dir() else {}
i18n = i18n.replace('/*LANGPACKS*/{}', json.dumps(packs, ensure_ascii=False))
out = s.replace('/*META*/null', meta).replace('/*CONTENT*/', content).replace('/*I18N*/', i18n)
out = out.replace('<script src="https://cdnjs', '<script type="text/plain" id="atlasdata">' + b64 + '</script>\n<script src="https://cdnjs', 1)
(root / 'index.html').write_text(out, encoding='utf-8')
print('index.html', len(out), 'bytes')
