import { func, string } from 'prop-types';
import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';

import styles from './Button.style';

const Button = ({
  icon, onPress, title, ...inherit
}) => (
  <TouchableOpacity onPress={onPress} style={[styles.container, inherit.style]}>
    { title && <Text style={styles.title}>{title}</Text> }
    { icon && <Image source={{ uri: icon }} style={styles.icon} /> }
  </TouchableOpacity>
);

Button.propTypes = {
  icon: string,
  onPress: func.isRequired,
  title: string,
};

Button.defaultProps = {
  icon: undefined,
  title: undefined,
};

export default Button;
