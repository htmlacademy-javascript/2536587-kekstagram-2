import { onEscKeydown } from './utils.js';

let message = null;

const showMessage = (templateId) => {
  const templateElement = document.querySelector(`#${templateId}`).content.cloneNode(true);
  message = templateElement.querySelector(`.${templateId}`);
  document.body.append(message);

  const removeMessage = () => {
    if (message) {
      message.remove();
      message = null;
    }
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onDocumentEscKeyDown);
  };

  function onDocumentClick(evt) {
    if (!evt.target.closest(`.${templateId}__inner`)) {
      removeMessage();
    }
  }

  function onDocumentEscKeyDown(evt) {
    if (message) {
      evt.stopPropagation();
      onEscKeydown(evt, removeMessage);
    }
  }

  message.querySelector(`.${templateId}__button`).addEventListener('click', removeMessage);
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentEscKeyDown);
};

export { showMessage };
