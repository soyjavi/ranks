import { func, string } from 'prop-types';
import React from 'react';
import seedColor from 'seed-color'; // eslint-disable-line
import { Text, TouchableOpacity } from 'react-native';

import styles from './Tag.style';

const Tag = ({ onPress, title }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.container, { backgroundColor: seedColor(title).toHex() }]}
  >
    <Text style={styles.tag}>{title.replace('#', '').toUpperCase()}</Text>
  </TouchableOpacity>
);

Tag.propTypes = {
  onPress: func,
  title: string.isRequired,
};

Tag.defaultProps = {
  onPress: undefined,
};

export default Tag;
