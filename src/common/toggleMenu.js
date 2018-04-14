import { remote } from 'electron';
import C from './constants';

const { STYLE: { MAIN_WINDOW, MENU_ITEM } } = C;

export default(tasks) => {
  const { tray, mainWindow } = remote.getGlobal('shared');

  if (mainWindow.isVisible()) {
    tray.setHighlightMode('never');
    mainWindow.hide();
  } else {
    const { x, y } = tray.getBounds();

    tray.setHighlightMode('always');
    if (tasks) mainWindow.setSize(MAIN_WINDOW.WIDTH, (tasks.length + 3) * MENU_ITEM.height);
    mainWindow.setPosition(x, y);
    mainWindow.show();
  }
};
