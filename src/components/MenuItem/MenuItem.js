import { bool, func, node, string } from 'prop-types';
import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import styles from './MenuItem.style';

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
      props: {
        checked, children, onPress, title,
      },
      state: { hover },
    } = this;
    const text = StyleSheet.flatten([styles.text, hover && styles.textHover]);

    return (
      <TouchableOpacity
        onMouseEnter={_onToggleHover}
        onMouseLeave={_onToggleHover}
        onPress={onPress}
        style={[styles.row, styles.container, hover && styles.hover]}
      >
        { !children && <Text style={[styles.check, text]}>{checked ? '✔' : ''}</Text> }
        { title && <Text numberOfLines={1} style={[text, styles.title]}>{title}</Text> }
        { children }
      </TouchableOpacity>
    );
  }
}

MenuItem.propTypes = {
  checked: bool,
  children: node,
  onPress: func,
  title: string,
};

MenuItem.defaultProps = {
  checked: false,
  children: undefined,
  onPress() {},
  title: undefined,
};

export default MenuItem;
