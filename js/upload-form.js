import { onEscKeydown } from './utils.js';
import { sendData } from './fetch-api.js';
import { resetEffects } from './photo-filter.js';
import { resetScale } from './image-scale-editor.js';
import { initValidation } from './validation-form.js';

const form = document.querySelector('.img-upload__form');
const body = document.querySelector('body');
const uploadFileControl = document.querySelector('#upload-file');
const photoEditorForm = document.querySelector('.img-upload__overlay');
const photoEditorResetButton = document.querySelector('#upload-cancel');
const submitButton = form.querySelector('#upload-submit');

const pristine = initValidation();
let message = null;

const toggleFormState = () => {
  photoEditorForm.classList.toggle('hidden');
  body.classList.toggle('modal-open');
};

const closePhotoEditor = () => {
  resetScale();
  resetEffects();
  uploadFileControl.value = '';
  form.reset();
  pristine.reset();
  photoEditorForm.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  photoEditorResetButton.removeEventListener('click', closePhotoEditor);
};

const removeMessage = () => {
  if (message) {
    message.remove();
    message = null;
  }
  document.removeEventListener('click', onDocumentClick);
  document.removeEventListener('keydown', onDocumentEscKeyDown);
};

function onDocumentClick (evt) {
  if (!evt.target.closest(`.${message.classList[0]}__inner`)) {
    removeMessage();
    closePhotoEditor();
  }
}

function onDocumentEscKeyDown (evt) {
  onEscKeydown(evt, () => {
    removeMessage();
    closePhotoEditor();
  });
}

const createMessageHandler = (templateId) => {
  const template = document.querySelector(`#${templateId}`).content.cloneNode(true);
  message = template.querySelector(`.${templateId}`);
  document.body.append(message);

  closePhotoEditor();

  message.querySelector(`.${templateId}__button`).addEventListener('click', () => {
    removeMessage();
    closePhotoEditor();
  });

  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentEscKeyDown);
};

const onPhotoEditorResetClick = () => closePhotoEditor();

function onDocumentKeydown (evt) {
  onEscKeydown(evt, closePhotoEditor);
}

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    submitButton.disabled = true;
    submitButton.textContent = 'Публикую...';

    sendData(new FormData(form))
      .then(() => createMessageHandler('success'))
      .catch(() => createMessageHandler('error'))
      .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = 'Опубликовать';
      });
  }
});

uploadFileControl.addEventListener('change', () => {
  toggleFormState();
  photoEditorResetButton.addEventListener('click', onPhotoEditorResetClick);
  document.addEventListener('keydown', onDocumentKeydown);
});
