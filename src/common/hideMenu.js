import { remote } from 'electron';

export default({ tray, mainWindow } = remote.getGlobal('shared')) => {
  tray.setHighlightMode('never');
  mainWindow.hide();
};
