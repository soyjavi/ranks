import { node, shape } from 'prop-types';
import React, { PureComponent, createContext } from 'react';
import uuid from 'uuid';

import { fetch, sizeMenu } from '../common';

const Context = createContext('data');
const { Provider, Consumer: ConsumerData } = Context;
let countdown;

class ProviderData extends PureComponent {
  constructor(props) {
    super(props);
    const { persist: { active, tasks = [] } } = props;

    sizeMenu(tasks);
    this.state = { active, tasks };
    this._countdown(active);
  }

  // async componentWillMount() {
  //   // @TODO: Call service
  //   const { _state } = this;
  //   const tasks = await fetch('http://') || [];

  //   _state(tasks);
  // }

  _state = (state) => {
    const { props: { persist: { hydrate } } } = this;

    hydrate(state);
    this.setState(state);
  }

  _taskActive = (taskId) => {
    const { _countdown, _state, state: { active } } = this;
    if (taskId === active) return;

    _countdown(taskId);
    _state({ active: taskId });
  }

  _taskAdd = ({ deadline, title }) => {
    const { _state, state: { tasks } } = this;

    // @TODO: Call service
    tasks.push({
      id: uuid(),
      title: title.trim(),
      deadline,
      timelapsed: 0,
      createdAt: new Date().getTime(),
    });
    sizeMenu(tasks);

    _state({ tasks });
  }

  _taskRemove = (taskId) => {
    const { _countdown, _state } = this;
    const tasks = this.state.tasks.filter(task => task.id !== taskId);

    // @TODO: Call service
    sizeMenu(tasks);
    _countdown(taskId);
    _state({ tasks });
  }

  _countdown = (id) => {
    clearInterval(countdown);

    if (!id) return;
    countdown = setInterval(() => {
      const { _state, state: { tasks } } = this;
      _state({
        tasks: tasks.map((task) => {
          return task.id !== id ? task : { ...task, timelapsed: task.timelapsed + 1 };
        }),
      });
    }, 1000);
  }

  render() {
    const events = {
      onTaskActive: this._taskActive,
      onTaskAdd: this._taskAdd,
      onTaskRemove: this._taskRemove,
    };

    return (
      <Provider value={{ ...this.state, ...events }}>
        { this.props.children }
      </Provider>
    );
  }
}

ProviderData.propTypes = {
  children: node,
  persist: shape({}),
};

ProviderData.defaultProps = {
  children: undefined,
  persist: {},
};

export { ConsumerData, ProviderData };
