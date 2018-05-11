import { node, shape } from 'prop-types';
import React, { PureComponent, createContext } from 'react';
import uuid from 'uuid';

const Context = createContext('data');
const { Provider, Consumer: ConsumerData } = Context;

const sortByTag = (a, b) => {
  if (a.tag > b.tag || b.tag === undefined) {
    return 1;
  } else if (a.tag < b.tag || a.tag === undefined) {
    return -1;
  }
  return 0;
};

class ProviderData extends PureComponent {
  constructor(props) {
    super(props);
    const { persist: { active, tasks = [], streak = 0 } } = props;

    this.state = {
      active,
      tasks,
      streak,
    };
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

  _taskAdd = ({ deadline, tag, title }) => {
    const { _state, state: { tasks } } = this;

    tasks.push({
      id: uuid(),
      deadline,
      tag: tag ? tag.trim().toLowerCase() : undefined,
      timelapsed: 0,
      title: title.trim(),
      createdAt: new Date().getTime(),
    });

    _state({ tasks: tasks.sort(sortByTag) });
  }

  _taskRemove = (taskId) => {
    const { _state, state: { active, tasks } } = this;
    let { state: { streak } } = this;

    tasks.forEach(({ id, timelapsed, deadline }) => {
      if (id === taskId && timelapsed > 0) {
        const percent = (timelapsed / deadline);
        if (streak > 0 && (percent >= 1 || percent < 0.75)) streak -= 1;
        else if (streak < 3 && percent >= 0.75 && percent < 1) streak += 1;
      }
    });

    _state({
      active: taskId === active ? undefined : active,
      tasks: tasks.filter(({ id }) => id !== taskId).sort(sortByTag),
      streak,
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
