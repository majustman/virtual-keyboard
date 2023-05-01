import createElement from '../../extensions/create-element.js';
import KeyBoardCssClasses from '../../data/keyboard-css-classes.js';
import langs from '../../data/langs.js';

const CssClasses = {
  HIDDEN: 'hidden',
  ROTATE_90: 'rotate-90',
  ROTATE_180: 'rotate-180',
  ROTATE_270: 'rotate-270',
  KEY_LIGHTENED: 'key_lightened',
};

let crntLang = KeyBoardCssClasses.EN;
let nextLang = KeyBoardCssClasses.RU;

export function createComponent() {
  const keyBoard = createElement('div', KeyBoardCssClasses.KEY_BOARD);
  for (let i = 0; i < 5; i++) {
    const row = createRow(i);
    keyBoard.append(row);
  };
  return keyBoard;
}

export function KeyDownHandler() {
  event.preventDefault();
  const keyBoard = document.querySelector(`.${KeyBoardCssClasses.KEY_BOARD}`);
  lightKey(keyBoard.querySelector(`.${event.code}`));
  if (event.altKey && event.shiftKey) changeLang();
}

export function KeyUpHandler() {
  const keyBoard = document.querySelector(`.${KeyBoardCssClasses.KEY_BOARD}`);
  unlightKey(keyBoard.querySelector(`.${event.code}`));
}

function lightKey(key) {
  if (key) key.classList.add(CssClasses.KEY_LIGHTENED);
}

function unlightKey(key) {
  if (key) key.classList.remove(CssClasses.KEY_LIGHTENED);
}

function changeLang() {
  const keyBoard = document.querySelector(`.${KeyBoardCssClasses.KEY_BOARD}`);
  keyBoard.querySelectorAll(`.${crntLang}`).forEach(el => el.classList.add(CssClasses.HIDDEN));
  keyBoard.querySelectorAll(`.${nextLang}`).forEach(el => el.classList.remove(CssClasses.HIDDEN));
  swapLangs();
}

function swapLangs() {
  const tmp = crntLang;
  crntLang = nextLang;
  nextLang = tmp;
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
  langs.forEach(lang => {
    const langContainer = createElement('div', lang.class);
    langContainer.classList.add(KeyBoardCssClasses.KEY_WRAPPER);
    if (lang.class !== KeyBoardCssClasses.EN) langContainer.classList.add(CssClasses.HIDDEN);
    const {value} = lang.keyBoard[rowNum][index];
    if (Array.isArray(value)) {
      value.forEach(el => {
        const caseCont = createElement('div', el.class);
        caseCont.textContent = el.value;
        if (el.class !== KeyBoardCssClasses.LOWER_CASE) caseCont.classList.add(CssClasses.HIDDEN);
        langContainer.append(caseCont);
      });
    } else {
      const div = createElement('div', KeyBoardCssClasses.ANY_CASE);
      div.textContent = value;
      langContainer.append(div);
    };
    key.append(langContainer);
  });
  if ([KeyBoardCssClasses.ARROW_LEFT,
    KeyBoardCssClasses.ARROW_UP,
    KeyBoardCssClasses.ARROW_DOWN,
    KeyBoardCssClasses.ARROW_RIGHT]
    .includes(keyClass)) addArrow(key, keyClass);
  if (keyClass === KeyBoardCssClasses.WIN) addWinKey(key);
  return key;
}

function addArrow(key, keyClass) {
  const img = createElement('img', KeyBoardCssClasses.KEY_IMG);
  img.setAttribute('src', 'assets/svg/arrow.svg');
  img.setAttribute('alt', 'arrow');
  switch (keyClass) {
    case KeyBoardCssClasses.ARROW_LEFT:
      img.classList.add(CssClasses.ROTATE_270);
      break;
    case KeyBoardCssClasses.ARROW_DOWN:
      img.classList.add(CssClasses.ROTATE_180);
      break;
    case KeyBoardCssClasses.ARROW_RIGHT:
      img.classList.add(CssClasses.ROTATE_90);
      break;
  };
  key.querySelectorAll(`.${KeyBoardCssClasses.ANY_CASE}`).forEach(wrapper => wrapper.append(img.cloneNode()));
}

function addWinKey(key) {
  const img = createElement('img', KeyBoardCssClasses.KEY_IMG);
  img.setAttribute('src', 'assets/svg/win.svg');
  img.setAttribute('alt', 'win');
  key.querySelectorAll(`.${KeyBoardCssClasses.ANY_CASE}`).forEach(wrapper => wrapper.append(img.cloneNode()));
}
