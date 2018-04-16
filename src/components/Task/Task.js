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

  _onHover = (hover) => {
    this.setState({ hover });
  }

  render() {
    const { _onHover, props: { dataSource }, state: { hover } } = this;
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
          <View
            onMouseEnter={() => _onHover(true)}
            onMouseLeave={() => _onHover(false)}
            style={styles.container}
          >
            { hover && isActive
              ?
                <Button
                  icon={ICON.PAUSE}
                  style={styles.buttonPause}
                  onPress={() => {
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

            <Text numberOfLines={1} style={[styles.text, styles.title, isActive && styles.titleActive]}>{title} </Text>
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
                  onPress={() => onTaskRemove(id)}
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
