import createElement from '../../extensions/create-element.js';

function clickHandler(event) {
  event.currentTarget.setAttribute('autofocus', 'autofocus');
}

export default function createComponent() {
  const textArea = createElement('textarea', 'text-area');
  textArea.addEventListener('click', (event) => { clickHandler(event); });
  return textArea;
}
