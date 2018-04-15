import { shape } from 'prop-types';
import React, { Fragment } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { formatTime, SHAPE } from '../../common';
import { Consumer } from '../../context';
import styles from './Task.style';


const Task = ({
  dataSource: {
    id, title, deadline, timelapsed,
  },
}) => (
  <Consumer>
    { ({ active }) => (
      <Fragment>
        <View
          style={StyleSheet.flatten([
            styles.bullet,
            timelapsed && active !== id && styles.bulletWorking,
            active === id && styles.bulletActive,
          ])}
        />

        { title &&
          <Text numberOfLines={1} style={[styles.text, styles.title]}>{title}</Text> }

        { deadline &&
          <Text style={[styles.text, styles.right]}>{formatTime(deadline)}</Text> }
      </Fragment>
    )}
  </Consumer>
);

Task.propTypes = {
  dataSource: shape(SHAPE.TASK),
};

Task.defaultProps = {
  dataSource: undefined,
};

export default Task;
