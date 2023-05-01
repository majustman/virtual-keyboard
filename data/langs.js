import KeyBoardCssClasses from './keyboard-css-classes.js';
import enKeyBoard from './en-keyboard/en-keyboard.js';
import ruKeyBoard from './ru-keyboard/ru-keyboard.js';

export default [
  {
    class: KeyBoardCssClasses.EN,
    keyBoard: enKeyBoard,
  },
  {
    class: KeyBoardCssClasses.RU,
    keyBoard: ruKeyBoard,
  },
];
