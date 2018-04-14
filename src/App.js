import React from 'react';
import { render } from 'react-dom';

import { Menu, Tray } from './containers';
import { Provider } from './context';

const App = () => (
  <Provider>
    <Tray />
    <Menu />
  </Provider>
);

window.onload = () => render(<App />, document.getElementById('app'));
