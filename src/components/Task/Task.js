import { shape } from 'prop-types';
import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { C, formatTime, hideMenu, SHAPE } from '../../common';
import { Consumer } from '../../context';
import Button from '../Button';
import styles from './Task.style';

const { ICON } = C;

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
    const alive = deadline > timelapsed;

    return (
      <Consumer>
        { ({
          active, onTaskActive, onTaskRemove,
          isActive = active === id,
        }) => (
          <View onMouseEnter={_onToggleHover} onMouseLeave={_onToggleHover} style={styles.container}>
            { hover && isActive
              ?
                <Button
                  icon={ICON.PAUSE}
                  style={styles.buttonPause}
                  onPress={() => {
                    _onToggleHover();
                    hideMenu();
                    onTaskActive();
                  }}
                />
              :
                <View
                  style={StyleSheet.flatten([
                    styles.bullet,
                    !isActive && timelapsed && styles.bulletGrey,
                    isActive && alive && styles.bulletGreen,
                    isActive && !alive && styles.bulletRed,
                  ])}
                />
            }

            <Text numberOfLines={1} style={[styles.text, styles.title]}>{title} </Text>
            {
              !hover
              ?
                <Text
                  style={StyleSheet.flatten([
                    styles.text,
                    styles.deadline,
                    isActive && styles.textGreen,
                    !alive && styles.textRed,
                  ])}
                >
                  {formatTime(deadline)}
                </Text>
              :
                <Button
                  icon={ICON.CANCEL}
                  onPress={() => {
                    _onToggleHover();
                    onTaskRemove(id);
                  }}
                />
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
