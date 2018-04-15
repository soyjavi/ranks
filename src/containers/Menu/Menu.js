import React from 'react';
import { ScrollView, View } from 'react-native';

import { toggleMenu } from '../../common';
import { Consumer } from '../../context';
import { Input, MenuItem, Task } from '../../components';
import styles from './Menu.style';

const Menu = () => (
  <Consumer>
    { ({ tasks = [], onTaskActive, onQuit }) => (
      <View style={styles.container}>
        <Input focus />

        <ScrollView style={styles.tasks}>
          { tasks.map(task => (
            <MenuItem
              key={task.id}
              onPress={() => {
                toggleMenu();
                onTaskActive(task.id);
              }}
            >
              <Task dataSource={task} />
            </MenuItem>))}
        </ScrollView>

        <View style={styles.menuOptions}>
          <MenuItem title="Launch at login" checked onPress={onQuit} />
          <MenuItem title="Quit" onPress={onQuit} />
        </View>
      </View>
    )}
  </Consumer>
);


export default Menu;
