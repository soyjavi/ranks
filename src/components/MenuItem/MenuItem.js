import { bool, shape, string } from 'prop-types';
import React, { PureComponent } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { C, formatTime, SHAPE } from '../../common';
import { Consumer } from '../../context';
import styles from './MenuItem.style';

const { ICON } = C;

class MenuItem extends PureComponent {
  state = {
    hover: false,
  }

  _onToggleHover = () => {
    this.setState({ hover: !this.state.hover });
  }

  render() {
    const {
      _onToggleHover,
      props: { checked, title, dataSource = {} },
      state: { hover },
    } = this;

    const text = StyleSheet.flatten([styles.text, hover && styles.textHover]);

    return (
      <Consumer>
        { ({ active, onTaskActive }) => (
          <TouchableOpacity
            onMouseEnter={_onToggleHover}
            onMouseLeave={_onToggleHover}
            onPress={() => onTaskActive(dataSource.id)}
            style={[styles.row, styles.container, hover && styles.hover]}
          >
            <View style={styles.left}>
              { dataSource.id && active === dataSource.id &&
                <Image source={{ uri: ICON.WATCH }} style={styles.icon} /> }
              { checked && <Text style={text}>✔</Text> }
            </View>

            { (title || dataSource.title) &&
              <Text numberOfLines={1} style={[text, styles.title, dataSource.title && styles.task]}>
                {title || dataSource.title}
              </Text> }

            { dataSource.deadline &&
              <Text style={[text, styles.right]}>
                {formatTime(dataSource.deadline)}
              </Text> }
          </TouchableOpacity>
          )}
      </Consumer>
    );
  }
}

MenuItem.propTypes = {
  checked: bool,
  dataSource: shape(SHAPE.TASK),
  title: string,
};

MenuItem.defaultProps = {
  checked: false,
  dataSource: undefined,
  title: undefined,
};

export default MenuItem;
