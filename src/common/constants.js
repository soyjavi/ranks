import path from 'path';

const UNIT = 10;
const DEVELOPMENT = process.env.NODE_ENV === 'development';

export default {
  APP_NAME: 'Watchman',

  ENV: {
    DEVELOPMENT,
    PRODUCTION: !DEVELOPMENT,
  },

  ICON: {
    TRAY: path.resolve(process.cwd(), 'public', 'assets', 'trayTemplate.png'),
    WATCH: path.resolve(process.cwd(), 'public', 'assets', 'iconWatch.png'),
  },

  STYLE: {
    DEADLINE: {
      fontSize: UNIT * 1.1,
      marginLeft: UNIT / 2,
      opacity: 0.5,
    },
    FONT: {
      BOLD: 'bold',
      // FAMILY: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif',
      FAMILY: 'sans-serif',
      REGULAR: UNIT * 1.6,
      SMALL: UNIT * 1.35,
      TINY: UNIT * 1.1,
    },
    INPUT: {
      // height: 2.8,
    },
    MAIN_WINDOW: {
      HEIGHT: 486,
      WIDTH: 266,
    },
    MENU_ITEM: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      height: UNIT * 2.8,
      paddingHorizontal: UNIT * 0.8,
      width: '100%',
    },
    OFFSET: UNIT * 1.6,
    UNIT,
  },
};
