import { bool, func, node, string } from 'prop-types';
import React, { PureComponent } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styles from './MenuItem.style';

class MenuItem extends PureComponent {
  state = {
    hover: false,
  }

  componentWillReceiveProps() {
    this.setState({ hover: false });
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
      state: { hover },
    } = this;

    return (
      <TouchableOpacity
        onMouseEnter={() => !disabled && _onHover(true)}
        onMouseLeave={() => !disabled && _onHover(false)}
        onPress={onPress}
        style={[
          styles.row,
          styles.container,
          (active || hover) && styles.hover,
          disabled && styles.disabled,
        ]}
      >
        { !children && <Text style={[styles.check, styles.text]}>{checked ? '✔' : ''}</Text> }
        { title && <Text numberOfLines={1} style={[styles.text, styles.title]}>{title}</Text> }
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
