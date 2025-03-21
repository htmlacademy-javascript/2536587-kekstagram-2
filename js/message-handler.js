import { onEscKeydown } from './utils.js';

let messageElement = null;

const showMessage = (templateId) => {
  const templateElement = document.querySelector(`#${templateId}`).content.cloneNode(true);
  messageElement = templateElement.querySelector(`.${templateId}`);
  document.body.append(messageElement);

  const onMessageRemove = () => {
    if (messageElement) {
      messageElement.remove();
      messageElement = null;
    }
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onDocumentEscKeyDown);
  };

  function onDocumentClick(evt) {
    if (!evt.target.closest(`.${templateId}__inner`)) {
      onMessageRemove ();
    }
  }

  function onDocumentEscKeyDown(evt) {
    if (messageElement) {
      evt.stopPropagation();
      onEscKeydown(evt, onMessageRemove);
    }
  }

  messageElement.querySelector(`.${templateId}__button`).addEventListener('click', onMessageRemove);
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentEscKeyDown);
};

export { showMessage };
