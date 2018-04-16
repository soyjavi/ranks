import { StyleSheet } from 'react-native';

import { C } from '../../common';

const {
  STYLE: {
    COLOR, DEADLINE, FONT, MENU_ITEM, UNIT, OFFSET,
  },
} = C;

export default StyleSheet.create({
  container: MENU_ITEM,

  bullet: {
    borderRadius: '50%',
    height: UNIT * 0.6,
    width: UNIT * 0.6,
  },

  bulletGreen: {
    backgroundColor: COLOR.GREEN,
  },

  bulletRed: {
    backgroundColor: COLOR.RED,
  },

  bulletGrey: {
    backgroundColor: COLOR.SECONDARY,
    opacity: 0.5,
  },

  deadline: DEADLINE,

  buttonPause: {
    marginLeft: -OFFSET / 2,
    marginRight: -OFFSET / 1.75,
  },

  text: {
    color: 'white',
    fontFamily: FONT.FAMILY,
    fontSize: FONT.SMALL,
    userSelect: 'none',
  },

  textGreen: {
    color: COLOR.GREEN,
    fontWeight: FONT.BOLD,
  },

  textRed: {
    color: COLOR.RED,
    fontWeight: FONT.BOLD,
  },

  title: {
    flex: 1,
    marginLeft: OFFSET,
    marginRight: OFFSET / 2,
  },
});
