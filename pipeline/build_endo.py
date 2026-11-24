"""Ensambla endocrino/index.html (módulo 02) a partir de endo/ y de la base común (CSS del módulo 01 y src/core/shell.js)."""
import base64, pathlib, re
root = pathlib.Path(__file__).resolve().parents[1]
t = (root / 'endo/template.html').read_text(encoding='utf-8')
m01 = (root / 'src/template.html').read_text(encoding='utf-8')
css = re.search(r'<style>\n(.*?)</style>', m01, re.S).group(1)
appver = re.search(r"const APPVER='([^']+)'", m01).group(1)
out = (t.replace('/*CSS*/', css)
        .replace('/*SHELL*/', (root / 'src/core/shell.js').read_text(encoding='utf-8'))
        .replace('/*CONTENT*/', (root / 'endo/content.js').read_text(encoding='utf-8'))
        .replace('/*EMETA*/null', (root / 'endo/build/endo.json').read_text(encoding='utf-8'))
        .replace('/*APPVER*/', appver)
        .replace('/*DATA*/', base64.b64encode((root / 'endo/build/endo.bin.gz').read_bytes()).decode()))
assert '/*' + 'CSS*/' not in out
(root / 'endocrino').mkdir(exist_ok=True)
(root / 'endocrino/index.html').write_text(out, encoding='utf-8')
print('endocrino/index.html', len(out), 'bytes, versión', appver)
