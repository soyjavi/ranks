import { StyleSheet } from 'react-native';

import { C } from '../../common';

const { STYLE: { MAIN_WINDOW, UNIT } } = C;

export default StyleSheet.create({

  container: {
    // paddingVertical: UNIT / 4,
  },

  tasks: {
    maxHeight: MAIN_WINDOW.HEIGHT,
  },

  menuOptions: {
    borderTopColor: 'rgba(255,255,255,0.1)',
    borderTopWidth: 1,
    alignSelf: 'flex-end',
    width: '100%',
    overflow: 'hidden',
  },
});
