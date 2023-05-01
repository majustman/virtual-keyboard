import * as textArea from './components/text-area/text-area.js';
import * as KeyBoard from './components/keyboard/keyboard.js';

const main = document.createElement('main');
main.classList.add('main');
main.append(textArea.createComponent());
main.append(KeyBoard.createComponent());
document.body.append(main);

document.addEventListener('keydown', KeyBoard.KeyDownHandler);
document.addEventListener('keyup', KeyBoard.KeyUpHandler);
document.addEventListener('mouseup', KeyBoard.MouseUpHandler);
document.addEventListener('mousedown', () => {event.preventDefault()});
