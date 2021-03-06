import { remote } from 'electron';
import React from 'react';

import { C, formatTime, hideMenu, showMenu, sound } from '../../common';
import { Consumer } from '../../context';

const PERCENTS = [99, 75, 50, 25];
let bells = [false, false, false, false];
let ticks = 0;
const MAX_UNSYNCED_TICKS = 5;
const { ICON, SOUND } = C;

const setTitle = ({
  id, title = '', deadline, timelapsed,
} = {}) => {
  const { mainWindow, tray } = remote.getGlobal('shared');
  let value;

  if (id) {
    const time = timelapsed + ticks;
    const percentTime = parseInt((time * 100) / deadline, 10);
    value = `${title} ${time <= deadline ? formatTime(deadline - time) : ''}`;

    PERCENTS.some((percent, index) => {
      const condition = percentTime >= percent && !bells[index];
      if (condition) {
        sound(SOUND.TICK);
        bells[index] = true;
      }
      return condition;
    });

    if (percentTime >= 100 && !mainWindow.isVisible) showMenu();
  }

  tray.setTitle(value || '');
  if (mainWindow.isVisible()) showMenu();
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
        }
      }
    }, 1000);
  }

  _changeTitle = ({
    active, onTaskUpdate, tasks = [], streak = 0,
  }) => {
    const { state = {} } = this;
    const { tray } = remote.getGlobal('shared');
    const { task: { id: previousId } = {} } = state;
    const task = tasks.find(({ id }) => id === active);

    if (!state.onTaskUpdate) this.setState({ onTaskUpdate });
    this.setState({ task });
    if (active !== previousId) {
      ticks = 0;
      bells = [false, false, false, false];
      setTitle(task);
    }

    if (tasks.length === 0) showMenu();
    tray.setImage(ICON.TRAY[streak]);
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
