import { shape } from 'prop-types';
import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { formatTime, hideMenu, SHAPE } from '../../common';
import { Consumer } from '../../context';
import Button from '../Button';
import styles from './Task.style';

class Task extends PureComponent {
  state = {
    hover: false,
  }

  _onToggleHover = () => {
    this.setState({ hover: !this.state.hover });
  }

  render() {
    const { _onToggleHover, props: { dataSource }, state: { hover } } = this;
    const {
      id, title, deadline, timelapsed,
    } = dataSource;

    return (
      <Consumer>
        { ({ active, onTaskActive, onTaskRemove }) => (
          <View onMouseEnter={_onToggleHover} onMouseLeave={_onToggleHover} style={styles.container}>
            <View
              style={StyleSheet.flatten([
                styles.bullet,
                timelapsed && active !== id && styles.bulletWorking,
                active === id && styles.bulletActive,
              ])}
            />

            <Text numberOfLines={1} style={[styles.text, styles.title]}>{title} </Text>
            {
              !hover
              ? <Text style={[styles.text, styles.deadline]}>{formatTime(deadline)}</Text>
              :
              <View style={styles.options}>
                { active === id &&
                  <Button
                    title="❙❙"
                    onPress={() => {
                      hideMenu();
                      onTaskActive();
                    }}
                  /> }
                <Button title="⌫" onPress={() => onTaskRemove(id)} />
              </View>
            }
          </View>
        )}
      </Consumer>
    );
  }
}

Task.propTypes = {
  dataSource: shape(SHAPE.TASK),
};

Task.defaultProps = {
  dataSource: undefined,
};

export default Task;
