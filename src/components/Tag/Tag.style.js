import { StyleSheet } from 'react-native';

import { C } from '../../common';

const { STYLE: { FONT, OFFSET } } = C;

const TAG_HEIGHT = FONT.SMALL;

export default StyleSheet.create({
  container: {
    flex: 0,
    paddingHorizontal: TAG_HEIGHT / 3,
    borderRadius: TAG_HEIGHT / 2,
    height: TAG_HEIGHT,
    marginHorizontal: OFFSET / 2,
  },

  tag: {
    fontFamily: FONT.FAMILY,
    fontSize: 9,
    color: 'white',
    height: TAG_HEIGHT,
    lineHeight: TAG_HEIGHT,
  },
});
