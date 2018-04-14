import { remote } from 'electron';
import React from 'react';

import { C, formatTime } from '../../common';
import { Consumer } from '../../context';

const { STYLE: { MAIN_WINDOW, MENU_ITEM } } = C;

class Tray extends React.PureComponent {
  constructor(props) {
    super(props);

    const { tray, mainWindow } = remote.getGlobal('shared');
    tray.on('click', () => {
      if (mainWindow.isVisible()) {
        tray.setHighlightMode('never');
        mainWindow.hide();
      } else {
        const { x, y } = tray.getBounds();
        tray.setHighlightMode('always');
        mainWindow.setPosition(x, y);
        mainWindow.show();
      }
    });

    remote.app.on('browser-window-blur', () => {
      tray.setHighlightMode('never');
      mainWindow.hide();
    });
  }

  _changeTitle = ({ active, tasks = [] }) => {
    const { tray, mainWindow } = remote.getGlobal('shared');

    mainWindow.setSize(MAIN_WINDOW.WIDTH, (tasks.length + 3) * MENU_ITEM.height);
    const task = tasks.find(({ id }) => id === active);
    if (task) {
      const { title, deadline, timelapsed } = task;
      // const hours = deadline.includes('h');
      // const available = parseInt(deadline.split(hours ? 'h' : 'm')[0], 10) * (hours ? 3600 : 60);
      // console.log('>', available - timelapsed);

      tray.setTitle(`${title} ${formatTime(deadline - timelapsed)}`);
    }
  }

  render() {
    return (
      <Consumer>
        { this._changeTitle }
      </Consumer>
    );
  }
}

export default Tray;
