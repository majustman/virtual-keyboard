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

let crntLang = localStorage.getItem('lang') || KeyBoardCssClasses.EN;
let nextLang = crntLang === KeyBoardCssClasses.EN ? KeyBoardCssClasses.RU : KeyBoardCssClasses.EN;
let crntCase = KeyBoardCssClasses.LOWER_CASE;
let capsLockActive = false;

window.addEventListener('beforeunload', setLocalStorage);

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
  keyDownAction(event);
  if (event.code === KeyBoardCssClasses.CAPS_LOCK) changeCapsLockState();
  highlight(event);
}

export function KeyUpHandler() {
  const keyBoard = document.querySelector(`.${KeyBoardCssClasses.KEY_BOARD}`);
  if (event.code !== KeyBoardCssClasses.CAPS_LOCK) unlightKey(keyBoard.querySelector(`.${event.code}`));
  if (event.code === KeyBoardCssClasses.SHIFT_LEFT || event.code === KeyBoardCssClasses.SHIFT_RIGHT) hideAltCase();
}

export function MouseUpHandler() {
  const highlightedKeys = Array.from(document.querySelectorAll(`.${CssClasses.KEY_LIGHTENED}`)).filter(item => !item.classList.contains(KeyBoardCssClasses.CAPS_LOCK));
  highlightedKeys.forEach(item => item.classList.remove(CssClasses.KEY_LIGHTENED));
}

function setLocalStorage() {
  localStorage.setItem('lang', crntLang);
}

function changeCapsLockState() {
  const capsLock = document.querySelector(`.${KeyBoardCssClasses.CAPS_LOCK}`);
  if (capsLockActive) {
    capsLockActive = false;
  } else {
    capsLockActive = true;
  };
}

function keyDownAction(event) {
  if (event.altKey && event.shiftKey) changeLang();
  if (event.code === KeyBoardCssClasses.CAPS_LOCK) changeCase();
  if (event.code === KeyBoardCssClasses.SHIFT_LEFT || event.code === KeyBoardCssClasses.SHIFT_RIGHT) showAltCase();
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
  if (!capsLock.classList.contains(CssClasses.KEY_LIGHTENED)) capitalize()
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

  key.addEventListener('mousedown', mouseDownHandler);
  if (keyClass === KeyBoardCssClasses.CAPS_LOCK) key.addEventListener('mouseup', mouseUpCapsLockHandler);
  if (keyClass === KeyBoardCssClasses.SHIFT_LEFT
    || keyClass === KeyBoardCssClasses.SHIFT_RIGHT) {
      key.addEventListener('mouseup', mouseUpShiftHandler);
    }

  langs.forEach(lang => {
    const langContainer = createElement('div', lang.class);
    langContainer.classList.add(KeyBoardCssClasses.KEY_WRAPPER);
    if (lang.class !== crntLang) langContainer.classList.add(CssClasses.HIDDEN);
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

function mouseDownHandler() {
  event.preventDefault();
  mouseDownAction(event);
  lightKey(event.currentTarget);
}

function mouseUpCapsLockHandler() {
  if (capsLockActive) {
    unlightKey(event.currentTarget);
  };
  changeCapsLockState();
}

function mouseUpShiftHandler() {
  hideAltCase();
}

function mouseDownAction(event) {
  if (event.currentTarget.classList.contains(KeyBoardCssClasses.SHIFT_LEFT)
    || event.currentTarget.classList.contains(KeyBoardCssClasses.SHIFT_RIGHT)) showAltCase();
  if (event.currentTarget.classList.contains(KeyBoardCssClasses.CAPS_LOCK)) changeCase();
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
