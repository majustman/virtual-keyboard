import createElement from '../../extensions/create-element.js';

export function createComponent() {
  const textArea = createElement('textarea', 'text-area');
  textArea.addEventListener('click', clickHandler);
  return textArea;
};

function clickHandler() {
  event.currentTarget.setAttribute('autofocus', 'autofocus');
}
