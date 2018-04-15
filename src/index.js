import { app, BrowserWindow, Tray } from 'electron';
import reload from 'electron-reload';
import path from 'path';
import url from 'url';

import { C } from './common';

const { ENV: { DEVELOPMENT }, ICON, STYLE: { MAIN_WINDOW } } = C;
let mainWindow;
let tray;

if (DEVELOPMENT) reload(__dirname);
app.setName(C.APP_NAME);
app.dock.hide();

app.on('ready', () => {
  // Create tray
  tray = new Tray(path.resolve(process.cwd(), 'assets', 'trayTemplate.png'));
  tray.setTitle('Wait a moment...');

  // Create the browser window.
  mainWindow = new BrowserWindow({
    frame: false,
    height: MAIN_WINDOW.HEIGHT,
    width: MAIN_WINDOW.WIDTH,
    show: false,
    transparent: true,
    vibrancy: 'ultra-dark',
  });

  mainWindow.loadURL(url.format({
    pathname: path.resolve(process.cwd(), 'src', 'index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  if (DEVELOPMENT) {
    mainWindow.on('ready-to-show', () => {
      tray.destroy();
      tray = new Tray(ICON.TRAY);
      global.shared = { mainWindow, tray };
    });

    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }

  global.shared = { mainWindow, tray };
});

app.on('browser-window-blur', () => {
  tray.setHighlightMode('never');
  mainWindow.hide();
});

