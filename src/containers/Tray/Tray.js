import { remote } from 'electron';
import { shape, string, arrayOf } from 'prop-types';
import React from 'react';

import { formatTime, SHAPE, toggleMenu } from '../../common';
import { Consumer } from '../../context';

class Tray extends React.PureComponent {
  constructor(props) {
    super(props);

    const { tray, mainWindow } = remote.getGlobal('shared');
    tray.on('click', () => {
      const { props: { tasks } } = this;
      toggleMenu(tasks);
    });

    remote.app.on('browser-window-blur', () => {
      tray.setHighlightMode('never');
      mainWindow.hide();
    });
  }

  _changeTitle = () => {
    const { props: { active, tasks = [] } } = this;
    const { tray, mainWindow } = remote.getGlobal('shared');

    const task = tasks.find(({ id }) => id === active);
    if (task) {
      const { title, deadline, timelapsed } = task;
      const countdown = timelapsed <= deadline;
      if (!countdown) mainWindow.show();

      tray.setTitle(` ${title} ${countdown ? formatTime(deadline - timelapsed) : ''}`);
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

Tray.propTypes = {
  active: string,
  tasks: arrayOf(shape(SHAPE.TASK)),
};

Tray.defaultProps = {
  active: '',
  tasks: [],
};

export default Tray;
