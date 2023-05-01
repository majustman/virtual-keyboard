import * as textArea from './components/text-area/text-area.js';
import * as KeyBoard from './components/keyboard/keyboard.js';
import createElement from './extensions/create-element.js';

const header = createElement('header', 'header');
const heading = createElement('h1', 'heading');
heading.textContent = 'RSS Virtual Keyboard';
header.append(heading);
document.body.append(header);

const main = createElement('main', 'main');
main.append(textArea.createComponent());
main.append(KeyBoard.createComponent());
const info = createElement('div', 'info');
const os = createElement('p', 'os');
os.textContent = 'Keyboard has been made in Ubuntu';
info.append(os);
const lang = createElement('p', 'lang');
lang.textContent = 'Use left Alt + left Shift for language shift';
info.append(lang);
main.append(info);
document.body.append(main);

document.addEventListener('keydown', KeyBoard.KeyDownHandler);
document.addEventListener('keyup', KeyBoard.KeyUpHandler);
document.addEventListener('mouseup', KeyBoard.MouseUpHandler);
