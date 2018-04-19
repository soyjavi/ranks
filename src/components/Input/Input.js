import { bool } from 'prop-types';
import React, { PureComponent } from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';

import { C, extractTag, formatTime } from '../../common';
import { Consumer } from '../../context';
import Tag from '../Tag';
import styles from './Input.style';

const { STYLE: { COLOR } } = C;
const REGEXP = /(\d+)(m|h)/;
const DEFAULT_DEADLINE = 25 * 60; // 25m

class Input extends PureComponent {
  state = {
    deadline: DEFAULT_DEADLINE,
    title: undefined,
  }

  componentWillReceiveProps({ focus = this.props.focus }) {
    if (this.el && focus) this.el.focus();
  }

  _onChange = (input) => {
    let title = input;
    let deadline = (REGEXP.exec(title) || [])[0];

    if (deadline) {
      title = title.replace(deadline, '');
      const inHours = deadline.includes('h');
      deadline = parseInt(deadline.split(inHours ? 'h' : 'm')[0], 10) * (inHours ? 3600 : 60);
    }

    this.setState({
      deadline: deadline || this.state.deadline,
      title,
    });
  }

  _onBlur = (onTaskAdd) => {
    const { el, state: { deadline, title = '' } } = this;

    el.clear();
    if (deadline && title.trim().length > 0) {
      onTaskAdd({ deadline, title });
      this.setState({ deadline: DEFAULT_DEADLINE, title: undefined });
      el.focus();
    }
  }

  render() {
    const {
      _onBlur, _onChange, state: { deadline, title },
    } = this;
    const hashtag = extractTag(title);

    return (
      <Consumer>
        { ({ onTaskAdd }) => (
          <View style={styles.container}>
            <TextInput
              ref={(el) => {
                this.el = el;
              }}
              autoCorrect={false}
              autoCapitalize="none"
              blurOnSubmit
              onBlur={() => _onBlur(onTaskAdd)}
              onChangeText={_onChange}
              placeholder="Add a task..."
              placeholderTextColor={COLOR.SECONDARY}
              style={StyleSheet.flatten([styles.text, styles.input])}
              underlineColorAndroid="transparent"
              value={title}
            />
            { hashtag && <Tag title={hashtag} /> }
            <Text style={StyleSheet.flatten([styles.text, styles.deadline])}>
              {deadline ? formatTime(deadline) : 'n[m|d]'}
            </Text>
          </View>
          )}
      </Consumer>

    );
  }
}

Input.propTypes = {
  focus: bool,
};

Input.defaultProps = {
  focus: false,
};

export default Input;
