import { StyleSheet } from 'react-native';

import { C } from '../../common';

const { STYLE: { FONT, MENU_ITEM, OFFSET } } = C;

export default StyleSheet.create({

  container: {
    ...MENU_ITEM,
    paddingHorizontal: OFFSET,
  },

  hover: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    cursor: 'pointer',
  },

  check: {
    width: OFFSET,
    marginLeft: -OFFSET * 0.25,
    marginRight: OFFSET,
    alignItems: 'center',
    fontSize: FONT.TINY,
  },

  disabled: {
    opacity: 0.25,
  },

  text: {
    color: 'white',
    fontFamily: FONT.FAMILY,
    fontSize: FONT.REGULAR,
    userSelect: 'none',
  },
});
