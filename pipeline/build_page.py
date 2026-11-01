"""Ensambla index.html a partir de src/ y build/ (datos generados por process.py)."""
import base64, pathlib
root = pathlib.Path(__file__).resolve().parents[1]
s = (root / 'src/template.html').read_text(encoding='utf-8')
meta = (root / 'build/meta.json').read_text(encoding='utf-8')
content = (root / 'src/content.js').read_text(encoding='utf-8')
b64 = base64.b64encode((root / 'build/atlas.bin.gz').read_bytes()).decode()
out = s.replace('/*META*/null', meta).replace('/*CONTENT*/', content)
out = out.replace('<script src="https://cdnjs', '<script type="text/plain" id="atlasdata">' + b64 + '</script>\n<script src="https://cdnjs', 1)
(root / 'index.html').write_text(out, encoding='utf-8')
print('index.html', len(out), 'bytes')
