import { Platform, StyleSheet } from 'react-native';

import { C } from '../../common';

const { STYLE: { DEADLINE, FONT, MENU_ITEM } } = C;

export default StyleSheet.create({
  container: {
    ...MENU_ITEM,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },

  text: {
    color: 'white',
    fontFamily: FONT.FAMILY,
  },

  input: {
    flex: 1,
    fontSize: FONT.SMALL,
    height: MENU_ITEM.height,
    margin: 0,
    padding: 0,
    ...Platform.select({
      web: {
        outline: 'none',
      },
    }),
  },

  deadline: {
    ...DEADLINE,
  },
});
