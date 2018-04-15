import { remote } from 'electron';

export default() => {
  const { tray, mainWindow } = remote.getGlobal('shared');

  tray.setHighlightMode('never');
  mainWindow.hide();
};
