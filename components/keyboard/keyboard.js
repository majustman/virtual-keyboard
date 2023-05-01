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
let crntCase = KeyBoardCssClasses.LOWER_CASE;

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
  highlight(event);
  if (event.altKey && event.shiftKey) changeLang();
  if (event.code === KeyBoardCssClasses.CAPS_LOCK) changeCase();
  if (event.code === KeyBoardCssClasses.SHIFT_LEFT || event.code === KeyBoardCssClasses.SHIFT_RIGHT) showAltCase();
}

export function KeyUpHandler() {
  const keyBoard = document.querySelector(`.${KeyBoardCssClasses.KEY_BOARD}`);
  if (event.code !== KeyBoardCssClasses.CAPS_LOCK) unlightKey(keyBoard.querySelector(`.${event.code}`));
  if (event.code === KeyBoardCssClasses.SHIFT_LEFT || event.code === KeyBoardCssClasses.SHIFT_RIGHT) hideAltCase();
}

function showAltCase() {
  const capsLock = document.querySelector(`.${KeyBoardCssClasses.CAPS_LOCK}`);
  document.querySelectorAll(`.${crntCase}`).forEach(item => item.classList.add(CssClasses.HIDDEN));
  if (!capsLock.classList.contains(CssClasses.KEY_LIGHTENED)) crntCase = KeyBoardCssClasses.UPPER_CASE
  else crntCase = KeyBoardCssClasses.CAPS_SHIFT;
  document.querySelectorAll(`.${crntCase}`).forEach(item => item.classList.remove(CssClasses.HIDDEN));
}

function hideAltCase() {
  const capsLock = document.querySelector(`.${KeyBoardCssClasses.CAPS_LOCK}`);
  document.querySelectorAll(`.${crntCase}`).forEach(item => item.classList.add(CssClasses.HIDDEN));
  if (!capsLock.classList.contains(CssClasses.KEY_LIGHTENED)) crntCase = KeyBoardCssClasses.LOWER_CASE
  else crntCase = KeyBoardCssClasses.CAPS_LOCK_ACTIVE;
  document.querySelectorAll(`.${crntCase}`).forEach(item => item.classList.remove(CssClasses.HIDDEN));
}

function highlight(event) {
  const keyBoard = document.querySelector(`.${KeyBoardCssClasses.KEY_BOARD}`);
  const capsLock = keyBoard.querySelector(`.${KeyBoardCssClasses.CAPS_LOCK}`);
  const key = keyBoard.querySelector(`.${event.code}`);
  if (event.code === KeyBoardCssClasses.CAPS_LOCK
    && capsLock.classList.contains(CssClasses.KEY_LIGHTENED)) {
      unlightKey(key);
  } else lightKey(key);
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

function changeCase() {
  const capsLock = document.querySelector(`.${KeyBoardCssClasses.CAPS_LOCK}`);
  if (capsLock.classList.contains(CssClasses.KEY_LIGHTENED)) capitalize()
  else decapitilize();
}

function capitalize() {
  document.querySelectorAll(`.${crntCase}`).forEach(item => item.classList.add(CssClasses.HIDDEN));
  document.querySelectorAll(`.${KeyBoardCssClasses.CAPS_LOCK_ACTIVE}`).forEach(item => item.classList.remove(CssClasses.HIDDEN));
  crntCase = KeyBoardCssClasses.CAPS_LOCK_ACTIVE;
}

function decapitilize() {
  document.querySelectorAll(`.${crntCase}`).forEach(item => item.classList.add(CssClasses.HIDDEN));
  document.querySelectorAll(`.${KeyBoardCssClasses.LOWER_CASE}`).forEach(item => item.classList.remove(CssClasses.HIDDEN));
  crntCase = KeyBoardCssClasses.LOWER_CASE;
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
