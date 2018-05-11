import { shape } from 'prop-types';
import React, { PureComponent } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { C, formatTime, SHAPE, showMenu, sound } from '../../common';
import { Consumer } from '../../context';
import Button from '../Button';
import Tag from '../Tag';
import styles from './Task.style';

const { ICON, SOUND } = C;

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
      id, deadline, tag, title, timelapsed,
    } = dataSource;
    const alive = deadline > timelapsed;

    return (
      <Consumer>
        { ({
          active, onTaskRemove, isActive = active === id,
        }) => (
          <View
            onMouseEnter={() => _onHover(true)}
            onMouseLeave={() => _onHover(false)}
            style={styles.container}
          >
            { hover && isActive
              ?
                <Image source={{ uri: ICON.PAUSE }} style={styles.iconPause} />
              :
                <View
                  style={StyleSheet.flatten([
                    styles.bullet,
                    !isActive && timelapsed > 0 && styles.bulletGrey,
                    isActive && (alive ? styles.bulletGreen : styles.bulletRed),
                  ])}
                />
            }
            <Text numberOfLines={1} style={[styles.text, styles.title]}>{title}</Text>
            { !hover && tag && <Tag title={tag} /> }
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
                    if (timelapsed > 0) sound(SOUND.HERO);
                    onTaskRemove(id);
                    setTimeout(showMenu, 40); // @TODO: It's tray responsibility
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
