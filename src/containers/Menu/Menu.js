import React, { Fragment } from 'react';
import { ScrollView, View } from 'react-native';

import { hideMenu, sizeMenu } from '../../common';
import { Consumer } from '../../context';
import { Input, MenuItem, Task } from '../../components';
import styles from './Menu.style';

const Menu = () => (
  <Consumer>
    { ({ active, tasks = [], onTaskActive, onQuit }) => (
      <Fragment>
        { sizeMenu(tasks) }
        <Input focus />

        <ScrollView>
          { tasks.map(task => (
            <MenuItem
              active={active === task.id}
              key={task.id}
              onPress={() => {
                hideMenu();
                onTaskActive(task.id);
              }}
            >
              <Task dataSource={task} />
            </MenuItem>))}
        </ScrollView>

        <View style={styles.options}>
          <MenuItem disabled title="Settings..." />
          <MenuItem title="Quit" onPress={onQuit} />
        </View>
      </Fragment>
    )}
  </Consumer>
);

export default Menu;
