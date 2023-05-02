import createElement from '../../extensions/create-element.js';
import KeyBoardCssClasses from '../../data/keyboard-css-classes.js';
import langs from '../../data/langs.js';

const CssClasses = {
  HIDDEN: 'hidden',
  ROTATE_90: 'rotate-90',
  ROTATE_180: 'rotate-180',
  ROTATE_270: 'rotate-270',
  KEY_LIGHTENED: 'key_lightened',
  TEXT_AREA: 'text-area',
};

let crntLang = localStorage.getItem('lang') || KeyBoardCssClasses.EN;
let nextLang = crntLang === KeyBoardCssClasses.EN ? KeyBoardCssClasses.RU : KeyBoardCssClasses.EN;
let crntCase = KeyBoardCssClasses.LOWER_CASE;
let capsLockActive = false;

function setLocalStorage() {
  localStorage.setItem('lang', crntLang);
}

window.addEventListener('beforeunload', setLocalStorage);

function capitalize() {
  document.querySelectorAll(`.${crntCase}`).forEach((item) => item.classList.add(CssClasses.HIDDEN));
  document.querySelectorAll(`.${KeyBoardCssClasses.CAPS_LOCK_ACTIVE}`).forEach((item) => item.classList.remove(CssClasses.HIDDEN));
  crntCase = KeyBoardCssClasses.CAPS_LOCK_ACTIVE;
}

function decapitilize() {
  document.querySelectorAll(`.${crntCase}`).forEach((item) => item.classList.add(CssClasses.HIDDEN));
  document.querySelectorAll(`.${KeyBoardCssClasses.LOWER_CASE}`).forEach((item) => item.classList.remove(CssClasses.HIDDEN));
  crntCase = KeyBoardCssClasses.LOWER_CASE;
}

function changeCase() {
  const capsLock = document.querySelector(`.${KeyBoardCssClasses.CAPS_LOCK}`);
  if (!capsLock.classList.contains(CssClasses.KEY_LIGHTENED)) capitalize();
  else decapitilize();
}

function showAltCase() {
  const capsLock = document.querySelector(`.${KeyBoardCssClasses.CAPS_LOCK}`);
  document.querySelectorAll(`.${crntCase}`).forEach((item) => item.classList.add(CssClasses.HIDDEN));
  if (!capsLock.classList.contains(CssClasses.KEY_LIGHTENED)) {
    crntCase = KeyBoardCssClasses.UPPER_CASE;
  } else crntCase = KeyBoardCssClasses.CAPS_SHIFT;
  document.querySelectorAll(`.${crntCase}`).forEach((item) => item.classList.remove(CssClasses.HIDDEN));
}

function printOnTextArea(keyCode) {
  const textArea = document.querySelector(`.${CssClasses.TEXT_AREA}`);
  const keyText = Array.from(Array.from(document.querySelector(`.${keyCode}`).children)
    .filter((item) => !item.classList.contains(CssClasses.HIDDEN))[0].children)
    .filter((item) => !item.classList.contains(CssClasses.HIDDEN))[0].textContent;
  textArea.textContent += keyText;
}

function processToTextArea(keyCode) {
  switch (keyCode) {
    case KeyBoardCssClasses.BACKSPACE:
      break;
    case KeyBoardCssClasses.TAB:
      break;
    case KeyBoardCssClasses.DEL:
      break;
    case KeyBoardCssClasses.CAPS_LOCK:
      break;
    case KeyBoardCssClasses.ENTER:
      break;
    case KeyBoardCssClasses.SHIFT_LEFT:
      break;
    case KeyBoardCssClasses.SHIFT_RIGHT:
      break;
    case KeyBoardCssClasses.CONTROL_LEFT:
      break;
    case KeyBoardCssClasses.WIN:
      break;
    case KeyBoardCssClasses.ALT_LEFT:
      break;
    case KeyBoardCssClasses.SPACE:
      break;
    case KeyBoardCssClasses.ALT_RIGHT:
      break;
    case KeyBoardCssClasses.CONTROL_RIGHT:
      break;
    case KeyBoardCssClasses.ARROW_UP:
      break;
    case KeyBoardCssClasses.ARROW_LEFT:
      break;
    case KeyBoardCssClasses.ARROW_RIGHT:
      break;
    case KeyBoardCssClasses.ARROW_DOWN:
      break;
    default:
      printOnTextArea(keyCode);
      break;
  }
}

function mouseDownAction(event) {
  if (event.currentTarget.classList.contains(KeyBoardCssClasses.SHIFT_LEFT)
    || event.currentTarget.classList.contains(KeyBoardCssClasses.SHIFT_RIGHT)) showAltCase();
  else if (event.currentTarget.classList.contains(KeyBoardCssClasses.CAPS_LOCK)) changeCase();
  else processToTextArea(Array.from(event.currentTarget.classList).pop());
}

function lightKey(key) {
  if (key) key.classList.add(CssClasses.KEY_LIGHTENED);
}

function mouseDownHandler(event) {
  event.preventDefault();
  mouseDownAction(event);
  lightKey(event.currentTarget);
}

function changeCapsLockState() {
  if (capsLockActive) {
    capsLockActive = false;
  } else {
    capsLockActive = true;
  }
}

function unlightKey(key) {
  if (key) key.classList.remove(CssClasses.KEY_LIGHTENED);
}

function mouseUpCapsLockHandler(event) {
  if (capsLockActive) {
    unlightKey(event.currentTarget);
  }
  changeCapsLockState();
}

function hideAltCase() {
  const capsLock = document.querySelector(`.${KeyBoardCssClasses.CAPS_LOCK}`);
  document.querySelectorAll(`.${crntCase}`).forEach((item) => item.classList.add(CssClasses.HIDDEN));
  if (!capsLock.classList.contains(CssClasses.KEY_LIGHTENED)) {
    crntCase = KeyBoardCssClasses.LOWER_CASE;
  } else crntCase = KeyBoardCssClasses.CAPS_LOCK_ACTIVE;
  document.querySelectorAll(`.${crntCase}`).forEach((item) => item.classList.remove(CssClasses.HIDDEN));
}

function mouseUpShiftHandler() {
  hideAltCase();
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
    default:
      break;
  }
  key.querySelectorAll(`.${KeyBoardCssClasses.ANY_CASE}`).forEach((wrapper) => wrapper.append(img.cloneNode()));
}

function addWinKey(key) {
  const img = createElement('img', KeyBoardCssClasses.KEY_IMG);
  img.setAttribute('src', 'assets/svg/win.svg');
  img.setAttribute('alt', 'win');
  key.querySelectorAll(`.${KeyBoardCssClasses.ANY_CASE}`).forEach((wrapper) => wrapper.append(img.cloneNode()));
}

function createKey(keyClass, rowNum, index) {
  const key = createElement('div', KeyBoardCssClasses.KEY);
  key.classList.add(keyClass);

  key.addEventListener('mousedown', (event) => { mouseDownHandler(event); });
  if (keyClass === KeyBoardCssClasses.CAPS_LOCK) key.addEventListener('mouseup', (event) => { mouseUpCapsLockHandler(event); });
  if (keyClass === KeyBoardCssClasses.SHIFT_LEFT
    || keyClass === KeyBoardCssClasses.SHIFT_RIGHT) {
    key.addEventListener('mouseup', mouseUpShiftHandler);
  }

  langs.forEach((lang) => {
    const langContainer = createElement('div', lang.class);
    langContainer.classList.add(KeyBoardCssClasses.KEY_WRAPPER);
    if (lang.class !== crntLang) langContainer.classList.add(CssClasses.HIDDEN);
    const { value } = lang.keyBoard[rowNum][index];
    if (Array.isArray(value)) {
      value.forEach((el) => {
        const caseCont = createElement('div', el.class);
        caseCont.textContent = el.value;
        if (el.class !== KeyBoardCssClasses.LOWER_CASE) caseCont.classList.add(CssClasses.HIDDEN);
        langContainer.append(caseCont);
      });
    } else {
      const div = createElement('div', KeyBoardCssClasses.ANY_CASE);
      div.textContent = value;
      langContainer.append(div);
    }
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

function createRow(rowNum) {
  const row = createElement('div', KeyBoardCssClasses.ROW);
  langs[0].keyBoard[rowNum].forEach((el, index) => {
    const key = createKey(el.class, rowNum, index);
    row.append(key);
  });
  return row;
}

function createComponent() {
  const keyBoard = createElement('div', KeyBoardCssClasses.KEY_BOARD);
  for (let i = 0; i < 5; i += 1) {
    const row = createRow(i);
    keyBoard.append(row);
  }
  keyBoard.addEventListener('mousedown', (event) => { event.preventDefault(); });
  return keyBoard;
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

function swapLangs() {
  const tmp = crntLang;
  crntLang = nextLang;
  nextLang = tmp;
}

function changeLang() {
  const keyBoard = document.querySelector(`.${KeyBoardCssClasses.KEY_BOARD}`);
  keyBoard.querySelectorAll(`.${crntLang}`).forEach((el) => el.classList.add(CssClasses.HIDDEN));
  keyBoard.querySelectorAll(`.${nextLang}`).forEach((el) => el.classList.remove(CssClasses.HIDDEN));
  swapLangs();
}

function keyDownAction(event) {
  if (event.altKey && event.shiftKey) changeLang();
  else if (event.code === KeyBoardCssClasses.CAPS_LOCK) changeCase();
  else if (event.code === KeyBoardCssClasses.SHIFT_LEFT
    || event.code === KeyBoardCssClasses.SHIFT_RIGHT) showAltCase();
  else if (Object.values(KeyBoardCssClasses).includes(event.code)) processToTextArea(event.code);
}

function KeyDownHandler(event) {
  event.preventDefault();
  keyDownAction(event);
  if (event.code === KeyBoardCssClasses.CAPS_LOCK) changeCapsLockState();
  highlight(event);
}

function KeyUpHandler(event) {
  const keyBoard = document.querySelector(`.${KeyBoardCssClasses.KEY_BOARD}`);
  if (event.code !== KeyBoardCssClasses.CAPS_LOCK) unlightKey(keyBoard.querySelector(`.${event.code}`));
  if (event.code === KeyBoardCssClasses.SHIFT_LEFT
    || event.code === KeyBoardCssClasses.SHIFT_RIGHT) hideAltCase();
}

function MouseUpHandler() {
  const highlightedKeys = Array.from(document.querySelectorAll(`.${CssClasses.KEY_LIGHTENED}`)).filter((item) => !item.classList.contains(KeyBoardCssClasses.CAPS_LOCK));
  highlightedKeys.forEach((item) => item.classList.remove(CssClasses.KEY_LIGHTENED));
}

export {
  createComponent, KeyDownHandler, KeyUpHandler, MouseUpHandler,
};
