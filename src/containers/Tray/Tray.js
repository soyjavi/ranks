import { remote } from 'electron';
import React from 'react';

import { formatTime, hideMenu, showMenu } from '../../common';
import { Consumer } from '../../context';

class Tray extends React.PureComponent {
  constructor(props) {
    super(props);

    const { mainWindow, tray } = remote.getGlobal('shared');
    tray.on('click', () => {
      if (mainWindow.isVisible()) hideMenu();
      else showMenu();
    });

    remote.app.on('browser-window-blur', hideMenu);
  }

  _changeTitle = ({ active, tasks }) => {
    const { tray, mainWindow } = remote.getGlobal('shared');

    let trayTitle = '';
    const task = tasks.find(({ id }) => id === active);
    if (task) {
      const { title, deadline, timelapsed } = task;
      const countdown = timelapsed <= deadline;
      if (!countdown) mainWindow.show();
      trayTitle = ` ${title} ${countdown ? formatTime(deadline - timelapsed) : ''}`;
    }
    tray.setTitle(trayTitle);
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
