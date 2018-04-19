import { remote } from 'electron';
import React from 'react';

import { formatTime, hideMenu, showMenu } from '../../common';
import { Consumer } from '../../context';

let ticks = 0;
const MAX_UNSYNCED_TICKS = 10;

const setTitle = ({ title = '', deadline, timelapsed } = {}) => {
  const { tray } = remote.getGlobal('shared');
  let value = '';
  let time;

  if (deadline && timelapsed) {
    time = timelapsed + ticks;
    value = ` ${title} ${time <= deadline ? formatTime(deadline - time) : ''}`;
  }

  tray.setTitle(value);
};

class Tray extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      onTaskUpdate: undefined,
      task: undefined,
    };

    // -- Events
    const { mainWindow, tray } = remote.getGlobal('shared');

    tray.on('click', () => {
      if (mainWindow.isVisible()) hideMenu();
      else showMenu();
    });

    remote.app.on('browser-window-blur', () => {
      if (mainWindow.isVisible()) hideMenu();
    });

    setInterval(() => {
      const { state: { onTaskUpdate, task } } = this;

      if (task) {
        ticks += 1;
        setTitle(task);
        if (ticks >= MAX_UNSYNCED_TICKS) {
          const timelapsed = task.timelapsed + ticks;
          const updatedTask = { ...task, timelapsed };
          ticks = 0;
          this.setState({ task: updatedTask });
          onTaskUpdate(updatedTask);

          if (timelapsed > task.deadline && !mainWindow.isVisible()) mainWindow.show();
        }
      }
    }, 1000);
  }

  _changeTitle = ({ active, onTaskUpdate, tasks }) => {
    const { state = {} } = this;
    const { task: { id: taskId } = {} } = state;
    const task = tasks.find(({ id }) => id === active);

    if (!state.onTaskUpdate) this.setState({ onTaskUpdate });
    if (!task || task.id !== taskId) {
      ticks = 0;
      setTitle(task);
      this.setState({ task });
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
