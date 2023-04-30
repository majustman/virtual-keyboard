import * as textArea from './components/text-area/text-area.js';
import createKeyBoard from './components/keyboard/keyboard.js';

const main = document.createElement('main');
main.classList.add('main');
main.append(textArea.createComponent());
main.append(createKeyBoard());
document.body.append(main);
