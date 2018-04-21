import { remote } from 'electron';

export default({ tray, mainWindow } = remote.getGlobal('shared')) => {
  const { x, y } = tray.getBounds();

  tray.setHighlightMode('always');
  mainWindow.setPosition(x, y, false);
  mainWindow.show();
};
