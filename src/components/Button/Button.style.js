import { StyleSheet } from 'react-native';

import { C } from '../../common';

const { STYLE: { FONT, UNIT } } = C;
const BUTTON_SIZE = UNIT * 1.8;

export default StyleSheet.create({
  container: {
    marginHorizontal: UNIT / 4,
    backgroundColor: 'white',
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: UNIT * 0.2,
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },

  title: {
    fontFamily: FONT.FAMILY,
    fontSize: FONT.SMALL,
    height: BUTTON_SIZE,
    lineHeight: BUTTON_SIZE,
    color: 'black',
  },
});
