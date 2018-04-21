import { bool, func, node, string } from 'prop-types';
import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import styles from './MenuItem.style';

class MenuItem extends PureComponent {
  state = {
    hover: false,
  }

  _onHover = (hover) => {
    this.setState({ hover });
  }

  render() {
    const {
      _onHover,
      props: {
        active, checked, children, disabled, onPress, title,
      },
    } = this;
    const hover = active || this.state.hover;
    const text = StyleSheet.flatten([styles.text, hover && styles.textHover]);

    return (
      <TouchableOpacity
        onMouseEnter={() => !disabled && _onHover(true)}
        onMouseLeave={() => !disabled && _onHover(false)}
        onPress={onPress}
        style={[styles.row, styles.container, hover && styles.hover, disabled && styles.disabled]}
      >
        { !children && <Text style={[styles.check, text]}>{checked ? '✔' : ''}</Text> }
        { title && <Text numberOfLines={1} style={[text, styles.title]}>{title}</Text> }
        { children }
      </TouchableOpacity>
    );
  }
}

MenuItem.propTypes = {
  active: bool,
  checked: bool,
  children: node,
  disabled: bool,
  onPress: func,
  title: string,
};

MenuItem.defaultProps = {
  active: false,
  checked: false,
  children: undefined,
  disabled: false,
  onPress() {},
  title: undefined,
};

export default MenuItem;
