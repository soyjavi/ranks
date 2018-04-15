import { remote } from 'electron';
import C from './constants';

const { STYLE: { MAIN_WINDOW, MENU_ITEM, UNIT } } = C;

export default(tasks = []) => {
  const { mainWindow } = remote.getGlobal('shared');
  const height = ((tasks.length + 3) * MENU_ITEM.height) + (UNIT / 2);

  mainWindow.setSize(MAIN_WINDOW.WIDTH, height);
};
