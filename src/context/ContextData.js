import { node, shape } from 'prop-types';
import React, { PureComponent, createContext } from 'react';
import uuid from 'uuid';

const Context = createContext('data');
const { Provider, Consumer: ConsumerData } = Context;

class ProviderData extends PureComponent {
  constructor(props) {
    super(props);
    const { persist: { active, tasks = [] } } = props;

    this.state = { active, tasks };
  }

  _state = (state) => {
    const { props: { persist: { hydrate } } } = this;

    // @TODO: Call service
    hydrate(state);
    this.setState(state);
  }

  _taskActive = (taskId) => {
    const { _state, state: { active } } = this;
    if (taskId === active) return;

    _state({ active: taskId });
  }

  _taskAdd = ({ deadline, title }) => {
    const { _state, state: { tasks } } = this;

    tasks.push({
      id: uuid(),
      title: title.trim(),
      deadline,
      timelapsed: 0,
      createdAt: new Date().getTime(),
    });

    _state({ tasks });
  }

  _taskRemove = (taskId) => {
    const { _state, state: { active } } = this;
    const tasks = this.state.tasks.filter(task => task.id !== taskId);

    _state({
      active: taskId === active ? undefined : active,
      tasks,
    });
  }

  _taskUpdate = (props = {}) => {
    const { _state, state: { tasks } } = this;

    _state({
      tasks: tasks.map(task => (
        task.id !== props.id ? task : { ...task, ...props }
      )),
    });
  }

  render() {
    const events = {
      onTaskActive: this._taskActive,
      onTaskAdd: this._taskAdd,
      onTaskRemove: this._taskRemove,
      onTaskUpdate: this._taskUpdate,
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
