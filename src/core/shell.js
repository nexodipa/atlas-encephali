/* ===== Base común de los módulos: almacenamiento, avisos, instalación, actualizaciones y selector de módulos ===== */
const $=s=>document.querySelector(s);
const store={get(k,d){ try{ const v=localStorage.getItem('ae_'+k); return v==null?d:JSON.parse(v); }catch(e){ return d; } },set(k,v){ try{ localStorage.setItem('ae_'+k,JSON.stringify(v)); }catch(e){} }};
const APPURL='https://nexodipa.github.io/atlas-encephali/', APKURL=APPURL+'AtlasEncephali.apk';
const IS_STANDALONE=matchMedia('(display-mode: standalone)').matches||navigator.standalone===true||/Electron|AtlasEncephaliAndroid/.test(navigator.userAgent);
const IS_ANDROID_WEB=/Android/.test(navigator.userAgent)&&!/AtlasEncephaliAndroid/.test(navigator.userAgent)&&!IS_STANDALONE;
/* dentro de claude.ai la página es un archivo suelto: los otros módulos se abren en la web publicada */
const OFFSITE=!/^(https?:|file:)$/.test(location.protocol)||/claude/.test(location.hostname);
const MODULES=[{k:'enc',es:'Encéfalo',href:'../'},{k:'endo',es:'Endocrino',href:'endocrino/'}];
function modHref(m,base){ const f=location.protocol==='file:'?'index.html':''; return OFFSITE?APPURL+(m.k==='enc'?'':'endocrino/'):(base==='root'?(m.k==='enc'?'./'+f:'endocrino/'+f):(m.k==='enc'?'../'+f:'./'+f)); }
function mountModSwitch(cur,base){ const el=$('#modsw'); if(!el) return;
  el.innerHTML=MODULES.map(m=>`<a href="${modHref(m,base)}" class="${m.k===cur?'on':''}" ${m.k===cur?'aria-current="page"':''}>${m.es}</a>`).join(''); }
function toast(msg,act,fn){ let t=document.getElementById('toast'); if(!t){ t=document.createElement('div'); t.id='toast'; t.setAttribute('role','status'); document.body.appendChild(t); }
  t.innerHTML=`<span>${msg}</span>${act?`<button class="lnk">${act}</button>`:''}`; t.hidden=false; if(act) t.querySelector('button').onclick=()=>{ t.hidden=true; fn&&fn(); }; else setTimeout(()=>t.hidden=true,4000); }
let deferredInstall=null;
function bindInstall(){ const b=$('#installBtn'); if(!b) return;
  if(IS_ANDROID_WEB){ b.hidden=false; b.textContent='Descargar app (APK)'; }
  addEventListener('beforeinstallprompt',e=>{ e.preventDefault(); deferredInstall=e; if(!IS_ANDROID_WEB) b.hidden=false; });
  addEventListener('appinstalled',()=>{ deferredInstall=null; b.hidden=true; toast('El atlas quedó instalado como app.'); });
  b.onclick=async()=>{ if(IS_ANDROID_WEB){ location.href=APKURL; return; } if(!deferredInstall) return; deferredInstall.prompt(); try{ await deferredInstall.userChoice; }catch(e){} deferredInstall=null; b.hidden=true; }; }
async function latestVersion(){ const res=await fetch('./?v='+Date.now(),{cache:'no-store'}); const m=(await res.text()).match(/const APPVER='([^']+)'/); return m?m[1]:null; }
function bindUpdates(){
  if('serviceWorker' in navigator&&/^https?:$/.test(location.protocol)) navigator.serviceWorker.addEventListener('message',e=>{ if(e.data&&e.data.type==='update') toast('Hay una versión nueva del atlas.','Actualizar',()=>location.reload()); });
  if(/^https?:$/.test(location.protocol)&&navigator.onLine&&!OFFSITE) setTimeout(async()=>{ try{ const v=await latestVersion(); if(v&&v!==APPVER) toast('Hay una versión nueva del atlas ('+v+').','Actualizar',()=>location.reload()); }catch(e){} },4000); }
async function loadBlob(id){ const bin=atob(document.getElementById(id).textContent.trim()); let u8=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u8[i]=bin.charCodeAt(i);
  const s=new Blob([u8]).stream().pipeThrough(new DecompressionStream('gzip')); return await new Response(s).arrayBuffer(); }
const PERF=(()=>{ const p=store.get('perf','auto'); if(p!=='auto') return p; const m=navigator.deviceMemory||4, c=navigator.hardwareConcurrency||4; return (m<=3||c<=4)&&/Android|Mobile/.test(navigator.userAgent)?'ahorro':'alto'; })();
