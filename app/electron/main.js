// Atlas Encephali, app de escritorio.
// Abre la versión publicada (https://nexodipa.github.io/atlas-encephali/) para que la app se actualice sola;
// su service worker la guarda y la sirve sin conexión. Si nunca se abrió con conexión, usa la copia incluida (www/).
const { app, BrowserWindow, shell, Menu, dialog, session } = require('electron');
const path = require('path');
const fs = require('fs');

const REMOTE = 'https://nexodipa.github.io/atlas-encephali/';
const LOCAL = path.join(__dirname, 'www', 'index.html');
const STATE = () => path.join(app.getPath('userData'), 'ventana.json');

if (!app.requestSingleInstanceLock()) { app.quit(); }

function readState() { try { return JSON.parse(fs.readFileSync(STATE(), 'utf8')); } catch (e) { return { width: 1440, height: 900 }; } }
function saveState(win) {
  try { const b = win.getNormalBounds(); fs.writeFileSync(STATE(), JSON.stringify({ ...b, maximized: win.isMaximized(), fullscreen: win.isFullScreen() })); } catch (e) {}
}

let win, usingLocal = false;
function createWindow() {
  const st = readState();
  win = new BrowserWindow({
    x: st.x, y: st.y, width: st.width || 1440, height: st.height || 900, minWidth: 900, minHeight: 600,
    title: 'Atlas Encephali', backgroundColor: '#0a0f12', autoHideMenuBar: true, show: false,
    icon: path.join(__dirname, 'www', 'icons', 'icon-512.png'),
    webPreferences: { contextIsolation: true, sandbox: true, nodeIntegration: false, spellcheck: false }
  });
  if (st.maximized) win.maximize();
  if (st.fullscreen) win.setFullScreen(true);
  win.once('ready-to-show', () => win.show());
  ['resize', 'move', 'close'].forEach(ev => win.on(ev, () => saveState(win)));

  // enlaces externos (PubMed, DOI, guías) en el navegador del sistema
  win.webContents.setWindowOpenHandler(({ url }) => { if (/^https?:/.test(url)) shell.openExternal(url); return { action: 'deny' }; });
  win.webContents.on('will-navigate', (e, url) => {
    if (url.startsWith(REMOTE) || url.startsWith('file:')) return;
    e.preventDefault(); if (/^https?:/.test(url)) shell.openExternal(url);
  });
  // sin conexión y sin copia guardada: abrir la copia incluida
  win.webContents.on('did-fail-load', (e, code, desc, url, isMain) => {
    if (isMain && !usingLocal && code !== -3) { usingLocal = true; win.loadFile(LOCAL); }
  });
  win.loadURL(REMOTE);
}

app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });
app.whenReady().then(() => {
  session.defaultSession.setPermissionRequestHandler((wc, perm, cb) => cb(perm === 'fullscreen' || perm === 'clipboard-sanitized-write'));
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    { label: 'Atlas', submenu: [
      { label: 'Ajustes', accelerator: 'CmdOrCtrl+,', click: () => win && win.webContents.executeJavaScript("location.hash='go=settings'") },
      { label: 'Buscar actualizaciones', click: () => { if (win) { usingLocal = false; win.webContents.reloadIgnoringCache(); } } },
      { type: 'separator' },
      { role: 'reload', label: 'Recargar' }, { role: 'togglefullscreen', label: 'Pantalla completa' },
      { type: 'separator' },
      { role: 'zoomIn', label: 'Ampliar' }, { role: 'zoomOut', label: 'Reducir' }, { role: 'resetZoom', label: 'Tamaño original' },
      { type: 'separator' },
      { label: 'Acerca de Atlas Encephali', click: () => dialog.showMessageBox(win, { type: 'info', title: 'Atlas Encephali', message: 'Atlas Encephali', detail: `App de escritorio ${app.getVersion()}\nContenido: se actualiza solo al abrir con conexión y funciona sin ella.\nhttps://github.com/nexodipa/atlas-encephali` }) },
      { role: 'quit', label: 'Salir' }
    ] }
  ]));
  createWindow();
});
app.on('window-all-closed', () => app.quit());
