import { bool } from 'prop-types';
import React, { PureComponent } from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';

import { C, extractTag, extractTime, formatTime } from '../../common';
import { Consumer } from '../../context';
import Tag from '../Tag';
import styles from './Input.style';

const { STYLE: { COLOR } } = C;
const DEFAULT_DEADLINE = 20 * 60; // 25m

class Input extends PureComponent {
  state = {
    deadline: DEFAULT_DEADLINE,
    tag: undefined,
    title: undefined,
  }

  componentWillReceiveProps({ focus = this.props.focus }) {
    if (this.el && focus) this.el.focus();
  }

  _onChange = (title) => {
    const tag = extractTag(title);
    const { match, value: deadline } = extractTime(title) || {};

    this.setState({
      deadline: deadline || this.state.deadline,
      tag: tag ? tag.trim().toLowerCase() : this.state.tag,
      title: title.replace(tag, '').replace(match, ''),
    });
  }

  _onKey = (key, onTaskAdd) => {
    if (key !== 'Enter') return;

    const { el, state: { deadline, title = '' } } = this;
    el.clear();
    if (deadline && title.trim().length > 0) {
      onTaskAdd(this.state);
      this.setState({ deadline: DEFAULT_DEADLINE, tag: undefined, title: undefined });
      el.focus();
    }
  }

  render() {
    const {
      _onChange, _onKey, state: { deadline, tag, title },
    } = this;

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
              onChangeText={_onChange}
              onKeyPress={({ nativeEvent: { key } }) => _onKey(key, onTaskAdd)}
              placeholder="Add a task..."
              placeholderTextColor={COLOR.SECONDARY}
              style={StyleSheet.flatten([styles.text, styles.input])}
              underlineColorAndroid="transparent"
              value={title}
            />
            { tag && <Tag title={tag} /> }
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
