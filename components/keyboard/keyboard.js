import createElement from '../../extensions/create-element.js';
import KeyBoardCssClasses from '../../data/keyboard-css-classes.js';
import langs from '../../data/langs.js';

const CssClasses = {
  HIDDEN: 'hidden',
}

export default function createComponent() {
  const keyBoard = createElement('div', KeyBoardCssClasses.KEY_BOARD);
  for (let i = 0; i < 5; i++) {
    const row = createRow(i);
    keyBoard.append(row);
  };
  return keyBoard;
}

function createRow(rowNum) {
  const row = createElement('div', KeyBoardCssClasses.ROW);
  langs[0].keyBoard[rowNum].forEach((el, index) => {
    const key = createKey(el.class, rowNum, index);
    row.append(key);
  });
  return row;
}

function createKey(keyClass, rowNum, index) {
  const key = createElement('div', KeyBoardCssClasses.KEY);
  key.classList.add(keyClass);
  for (let lang of langs) {
    const langContainer = createElement('div', lang.class);
    langContainer.classList.add(KeyBoardCssClasses.KEY_WRAPPER);
    if (lang.class !== KeyBoardCssClasses.EN) langContainer.classList.add(CssClasses.HIDDEN);
    const value = lang.keyBoard[rowNum][index].value;
    if (Array.isArray(value)) {
      value.forEach(el => {
        const caseCont = createElement('div', el.class);
        caseCont.textContent = el.value;
        if (el.class !== KeyBoardCssClasses.LOWER_CASE) caseCont.classList.add(CssClasses.HIDDEN);
        langContainer.append(caseCont);
      });
    } else langContainer.textContent = value;
    key.append(langContainer);
  };
  return key;
}
