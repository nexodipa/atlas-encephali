"""Versión autónoma (sin conexión) de index.html para la app de escritorio y la app instalable (PWA).

- three.js r128 y las fuentes (Spectral, IBM Plex Sans y Mono, subconjuntos latinos) van dentro del HTML.
- Añade manifiesto, iconos y un service worker que guarda la página para usarla sin conexión.
- Salida: app/www/  (se publica en GitHub Pages y la empaqueta la app de escritorio en app/electron/).

Uso: python pipeline/build_app.py  (después de build_page.py; necesita node_modules con three@0.128.0 y @fontsource/*;
     NODE_MODULES=/ruta/a/node_modules si no están en app/electron/node_modules)
"""
import base64, hashlib, json, os, re, shutil

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NM = os.environ.get('NODE_MODULES', os.path.join(ROOT, 'app', 'electron', 'node_modules'))
WWW = os.path.join(ROOT, 'app', 'www')

html = open(os.path.join(ROOT, 'index.html'), encoding='utf-8').read()

# three.js dentro de la página
three = open(os.path.join(NM, 'three', 'build', 'three.min.js'), encoding='utf-8').read()
assert 'REVISION="128"' in three or "REVISION = '128'" in three or '"128"' in three
tag = '<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>'
assert html.count(tag) == 1
html = html.replace(tag, '<script>' + three.replace('</script', '<\\/script') + '</script>')

# fuentes dentro de la página
FONTS = [('Spectral', 'spectral', 'spectral', [(500, 'normal'), (600, 'normal'), (400, 'italic')]),
         ('IBM Plex Sans', 'ibm-plex-sans', 'ibm-plex-sans', [(400, 'normal'), (500, 'normal'), (600, 'normal')]),
         ('IBM Plex Mono', 'ibm-plex-mono', 'ibm-plex-mono', [(400, 'normal'), (500, 'normal')])]
RANGES = {'latin': 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD',
          'latin-ext': 'U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF'}
css = []
for fam, pkg, pre, variants in FONTS:
    for w, st in variants:
        for sub in ('latin', 'latin-ext'):
            f = os.path.join(NM, '@fontsource', pkg, 'files', f'{pre}-{sub}-{w}-{st}.woff2')
            b64 = base64.b64encode(open(f, 'rb').read()).decode()
            css.append(f"@font-face{{font-family:'{fam}';font-style:{st};font-weight:{w};font-display:swap;src:url(data:font/woff2;base64,{b64}) format('woff2');unicode-range:{RANGES[sub]}}}")
gf = re.compile(r'<link rel="preconnect" href="https://fonts.googleapis.com">\s*<link rel="stylesheet" href="https://fonts.googleapis.com/css2\?[^"]*">')
assert len(gf.findall(html)) == 1
html = gf.sub('<style>' + ''.join(css) + '</style>', html)

# manifiesto, iconos y service worker (solo se registra en http/https; en la app de escritorio no hace falta)
head = ('<link rel="manifest" href="manifest.webmanifest">\n<meta name="theme-color" content="#0a0f12">\n'
        '<link rel="icon" type="image/png" sizes="32x32" href="icons/icon-32.png">\n<link rel="apple-touch-icon" href="icons/icon-180.png">\n'
        '<meta name="mobile-web-app-capable" content="yes">\n')
html = html.replace('<title>Atlas Encephali</title>', '<title>Atlas Encephali</title>\n' + head, 1)
reg = ("<script>if('serviceWorker' in navigator&&/^https?:$/.test(location.protocol))"
       "addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));</script>")
html = html.replace('</body>', reg + '\n</body>', 1) if '</body>' in html else html + reg

if os.path.exists(WWW): shutil.rmtree(WWW)
os.makedirs(os.path.join(WWW, 'icons'))
open(os.path.join(WWW, 'index.html'), 'w', encoding='utf-8').write(html)
for f in os.listdir(os.path.join(ROOT, 'app', 'icons')):
    if f.endswith('.png'): shutil.copy(os.path.join(ROOT, 'app', 'icons', f), os.path.join(WWW, 'icons', f))

manifest = {
    "name": "Atlas Encephali", "short_name": "Encephali", "lang": "es", "dir": "ltr",
    "description": "Atlas 3D interactivo del encéfalo para estudiantes de medicina y salud mental.",
    "start_url": "./", "scope": "./", "display": "standalone", "orientation": "any",
    "id": "./", "display_override": ["standalone", "minimal-ui"],
    "background_color": "#0a0f12", "theme_color": "#0a0f12", "categories": ["education", "medical"],
    "shortcuts": [{"name": "Aprender", "short_name": "Aprender", "url": "./#m=learn", "icons": [{"src": "icons/icon-192.png", "sizes": "192x192"}]},
                  {"name": "Simulación clínica", "short_name": "Simulación", "url": "./#m=sim", "icons": [{"src": "icons/icon-192.png", "sizes": "192x192"}]},
                  {"name": "Índice del atlas", "short_name": "Índice", "url": "./#go=index", "icons": [{"src": "icons/icon-192.png", "sizes": "192x192"}]}],
    "screenshots": [{"src": "icons/shot-wide.png", "sizes": "1600x1000", "type": "image/png", "form_factor": "wide", "label": "Atlas Encephali en escritorio"},
                    {"src": "icons/shot-narrow.png", "sizes": "800x1280", "type": "image/png", "form_factor": "narrow", "label": "Atlas Encephali en tableta"}],
    "icons": [{"src": "icons/icon-192.png", "sizes": "192x192", "type": "image/png"},
              {"src": "icons/icon-512.png", "sizes": "512x512", "type": "image/png"},
              {"src": "icons/maskable-192.png", "sizes": "192x192", "type": "image/png", "purpose": "maskable"},
              {"src": "icons/maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable"}]}
json.dump(manifest, open(os.path.join(WWW, 'manifest.webmanifest'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

ver = hashlib.sha1(html.encode()).hexdigest()[:10]
sw = f"""// Service worker de Atlas Encephali.
// La página se sirve al instante desde la caché (arranque de app, también sin conexión) y se revisa en segundo plano:
// si en el servidor hay una versión distinta, se guarda y se avisa a la página para que ofrezca actualizar.
const CACHE='encephali-v1';
const CORE=['./','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png','icons/maskable-512.png','icons/icon-32.png','icons/icon-180.png'];
self.addEventListener('install',e=>{{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())); }});
self.addEventListener('activate',e=>{{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); }});
const ver=t=>{{ const m=t.match(/const APPVER='([^']+)'/); return (m?m[1]:'')+':'+t.length; }};
async function revalidate(req,key){{
  try{{ const res=await fetch(req,{{cache:'no-cache'}}); if(!res.ok) return; const c=await caches.open(CACHE); const old=await c.match(key);
    const nt=await res.clone().text(); let changed=true; if(old){{ changed=ver(await old.text())!==ver(nt); }}
    await c.put(key,res); if(old&&changed){{ const cl=await self.clients.matchAll({{type:'window'}}); cl.forEach(x=>x.postMessage({{type:'update'}})); }}
  }}catch(e){{}}
}}
self.addEventListener('fetch',e=>{{ const r=e.request; if(r.method!=='GET') return; const u=new URL(r.url);
  if(u.search&&u.origin===location.origin){{ return; }}
  if(r.mode==='navigate'||(u.origin===location.origin&&(u.pathname.endsWith('/')||u.pathname.endsWith('/index.html')))){{
    const key=new URL('./',location).href;
    e.respondWith(caches.open(CACHE).then(c=>c.match(key)).then(hit=>{{ if(hit){{ e.waitUntil(revalidate(r,key)); return hit; }}
      return fetch(r).then(res=>{{ if(res.ok){{ const cp=res.clone(); caches.open(CACHE).then(c=>c.put(key,cp)); }} return res; }}); }}));
    return; }}
  e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{{ if(res.ok&&(u.origin===location.origin||/fonts\\.(googleapis|gstatic)\\.com$/.test(u.hostname))){{ const cp=res.clone(); caches.open(CACHE).then(c=>c.put(r,cp)); }} return res; }})));
}});
"""
open(os.path.join(WWW, 'sw.js'), 'w', encoding='utf-8').write(sw)
open(os.path.join(WWW, '.nojekyll'), 'w').write('')
print('app/www/index.html', os.path.getsize(os.path.join(WWW, 'index.html')), 'bytes; cache', ver)
