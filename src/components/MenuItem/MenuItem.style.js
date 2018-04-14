import { StyleSheet } from 'react-native';

import { C } from '../../common';

const {
  STYLE: {
    DEADLINE, FONT, MENU_ITEM, UNIT,
  },
} = C;

export default StyleSheet.create({

  container: {
    ...MENU_ITEM,
  },

  hover: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    cursor: 'pointer',
  },

  icon: {
    width: UNIT * 1.6,
    height: UNIT * 1.6,
  },

  left: {
    width: UNIT,
    marginRight: UNIT * 0.8,
    alignItems: 'center',
  },

  right: {
    ...DEADLINE,
  },

  task: {
    fontSize: FONT.SMALL,
  },

  text: {
    color: 'white',
    fontFamily: FONT.FAMILY,
    fontSize: FONT.REGULAR,
    userSelect: 'none',
  },

  textHover: {
    // color: 'black',
  },

  title: {
    flex: 1,
  },
});
