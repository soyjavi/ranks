import { remote } from 'electron';

export default() => {
  const { tray, mainWindow } = remote.getGlobal('shared');
  const { x, y } = tray.getBounds();

  tray.setHighlightMode('always');
  mainWindow.setPosition(x, y, true);
  mainWindow.show();
};
