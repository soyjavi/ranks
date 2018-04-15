import { StyleSheet } from 'react-native';

import { C } from '../../common';

const { STYLE: { FONT } } = C;
const BUTTON_SIZE = FONT.REGULAR;

export default StyleSheet.create({
  container: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
  },

  title: {
    fontFamily: FONT.FAMILY,
    fontSize: FONT.SMALL,
    height: BUTTON_SIZE,
    lineHeight: BUTTON_SIZE,
    color: 'rgba(255,255,255,0.5)',
  },

  icon: {
    height: BUTTON_SIZE,
    width: BUTTON_SIZE,
  },
});
