import { onEscKeydown } from './utils.js';

let messageElement = null;

const showMessage = (templateId) => {
  const templateElement = document.querySelector(`#${templateId}`).content.cloneNode(true);
  messageElement = templateElement.querySelector(`.${templateId}`);
  document.body.append(messageElement);

  const removeMessage = () => {
    if (messageElement) {
      messageElement.remove();
      messageElement = null;
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
    if (messageElement) {
      evt.stopPropagation();
      onEscKeydown(evt, removeMessage);
    }
  }

  messageElement.querySelector(`.${templateId}__button`).addEventListener('click', removeMessage);
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentEscKeyDown);
};

export { showMessage };
