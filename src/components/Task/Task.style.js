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

  bullet: {
    width: UNIT * 0.6,
    height: UNIT * 0.6,
    borderRadius: '50%',
    marginRight: UNIT * 0.8,
  },

  bulletActive: {
    backgroundColor: 'red',
  },

  bulletWorking: {
    backgroundColor: 'white',
    opacity: 0.25,
  },

  right: {
    ...DEADLINE,
  },

  text: {
    color: 'white',
    fontFamily: FONT.FAMILY,
    fontSize: FONT.SMALL,
    userSelect: 'none',
  },

  title: {
    flex: 1,
  },
});
