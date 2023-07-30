import { isEscapeKey } from './utils.js';

const popupContainer = document.querySelector('main');

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup(evt);
  }
}

function closePopup (evt, cls) {
  const { classList } = evt.target;

  if (classList.contains(`${cls}__inner`) || classList.contains(`${cls}__title`)) {
    return;
  }

  popupContainer.querySelector(`.${cls}`).remove();

  document.removeEventListener('keydown', onDocumentKeydown);
}

function showMessage(cls) {
  const message = document.querySelector(`#${cls}`).cloneNode(true).content.querySelector(`.${cls}`);
  popupContainer.insertAdjacentElement('afterbegin', message);
  message.classList.remove('hidden');

  message.addEventListener('click', (evt) => closePopup(evt, cls));
  document.addEventListener('keydown', onDocumentKeydown);
}

export { showMessage };
