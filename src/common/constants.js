import path from 'path';

const UNIT = 10;
const DEVELOPMENT = process.env.NODE_ENV === 'development';
const SECONDARY = 'rgba(255,255,255,0.5)';

export default {
  APP_NAME: 'Watchman',

  ENV: {
    DEVELOPMENT,
    PRODUCTION: !DEVELOPMENT,
  },

  SOUND: {
    HERO: path.resolve(__dirname, '../assets', 'hero.mp3'),
    TINK: path.resolve(__dirname, '../assets', 'tink.mp3'),
  },

  ICON: {
    CANCEL: path.resolve(__dirname, '../assets', 'cancel.png'),
    PAUSE: path.resolve(__dirname, '../assets', 'pause.png'),
    TRAY: [
      path.resolve(__dirname, '../assets', '0Template.png'),
      path.resolve(__dirname, '../assets', '1Template.png'),
      path.resolve(__dirname, '../assets', '2Template.png'),
      path.resolve(__dirname, '../assets', '3Template.png'),
      path.resolve(__dirname, '../assets', '4Template.png'),
    ],
  },

  STYLE: {
    COLOR: {
      SECONDARY,
      GREEN: '#AED581',
      RED: '#E57373',
    },
    DEADLINE: {
      color: SECONDARY,
      fontSize: UNIT * 1.1,
      minWidth: UNIT * 1.4,
      textAlign: 'right',
    },
    FONT: {
      BOLD: 'bold',
      FAMILY: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu, Helvetica Neue, sans-serif',
      REGULAR: UNIT * 1.5,
      SMALL: UNIT * 1.3,
      TINY: UNIT * 1.1,
    },
    MAIN_WINDOW: {
      HEIGHT: 486,
      WIDTH: 288,
    },
    MENU_ITEM: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      height: UNIT * 2.6,
      flex: 1,
    },
    OFFSET: UNIT * 0.8,
    UNIT,
  },
};
