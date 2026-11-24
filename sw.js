// Service worker de Atlas Encephali.
// La página se sirve al instante desde la caché (arranque de app, también sin conexión) y se revisa en segundo plano:
// si en el servidor hay una versión distinta, se guarda y se avisa a la página para que ofrezca actualizar.
const CACHE='encephali-v2';
const CORE=['./','endocrino/','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png','icons/maskable-512.png','icons/icon-32.png','icons/icon-180.png'];
self.addEventListener('install',e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
const ver=t=>{ const m=t.match(/const APPVER='([^']+)'/); return (m?m[1]:'')+':'+t.length; };
async function revalidate(req,key){
  try{ const res=await fetch(req,{cache:'no-cache'}); if(!res.ok) return; const c=await caches.open(CACHE); const old=await c.match(key);
    const nt=await res.clone().text(); let changed=true; if(old){ changed=ver(await old.text())!==ver(nt); }
    await c.put(key,res); if(old&&changed){ const cl=await self.clients.matchAll({type:'window'}); cl.forEach(x=>x.postMessage({type:'update'})); }
  }catch(e){}
}
self.addEventListener('fetch',e=>{ const r=e.request; if(r.method!=='GET') return; const u=new URL(r.url);
  if(u.search&&u.origin===location.origin){ return; }
  if(r.mode==='navigate'||(u.origin===location.origin&&(u.pathname.endsWith('/')||u.pathname.endsWith('/index.html')))){
    const key=new URL(u.pathname.replace(/index\.html$/,''),location.origin).href;
    e.respondWith(caches.open(CACHE).then(c=>c.match(key)).then(hit=>{ if(hit){ e.waitUntil(revalidate(r,key)); return hit; }
      return fetch(r).then(res=>{ if(res.ok){ const cp=res.clone(); caches.open(CACHE).then(c=>c.put(key,cp)); } return res; }); }));
    return; }
  e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{ if(res.ok&&(u.origin===location.origin||/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname))){ const cp=res.clone(); caches.open(CACHE).then(c=>c.put(r,cp)); } return res; })));
});
