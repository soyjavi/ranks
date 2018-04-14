import React, { Fragment } from 'react';
import { render } from 'react-dom';

import { Menu, Tray } from './containers';
import { Consumer, Provider } from './context';

const App = () => (
  <Provider>
    <Consumer>
      { ({ active, tasks }) => (
        <Fragment>
          <Tray active={active} tasks={tasks} />
          <Menu />
        </Fragment> )}
    </Consumer>
  </Provider>
);

window.onload = () => render(<App />, document.getElementById('app'));
