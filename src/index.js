import AutoLaunch from 'auto-launch';
import { app, powerSaveBlocker, BrowserWindow, globalShortcut, Tray } from 'electron';
import path from 'path';
import url from 'url';

import { C, hideMenu, showMenu } from './common';

const autolaunch = new AutoLaunch({ name: C.APP_NAME, isHidden: true });
const { ENV: { DEVELOPMENT }, ICON, STYLE: { MAIN_WINDOW } } = C;
let mainWindow;
let tray;

if (DEVELOPMENT) {
  const reload = require('electron-reload'); // eslint-disable-line
  reload(__dirname);
} else {
  autolaunch.isEnabled().then((isEnabled) => {
    if (!isEnabled) autolaunch.enable();
  });
}

app.setName(C.APP_NAME);
app.dock.hide();

app.on('ready', () => {
  // Keeps system active but allows screen to be turned off
  powerSaveBlocker.start('prevent-app-suspension');

  // Create tray
  tray = new Tray(ICON.TRAY);

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
    pathname: path.resolve(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  globalShortcut.register('Command+Control+W', () => {
    if (mainWindow.isVisible()) hideMenu({ mainWindow, tray });
    else showMenu({ mainWindow, tray });
  });

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
