import * as textArea from './components/text-area/text-area.js';

const main = document.createElement('main');
main.classList.add('main');
main.append(textArea.createComponent());
document.body.append(main);
