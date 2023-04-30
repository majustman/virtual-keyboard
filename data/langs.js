import KeyBoardCssClasses from './keyboard-css-classes.js';
import enKeyBoard from '../../data/en-keyboard/en-keyboard.js';
import ruKeyBoard from '../../data/ru-keyboard/ru-keyboard.js';

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
