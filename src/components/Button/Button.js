import { func, string } from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styles from './Button.style';

const Button = ({
  onPress, title,
}) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
);

Button.propTypes = {
  onPress: func.isRequired,
  title: string.isRequired,
};

export default Button;
