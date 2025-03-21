import { onEscKeydown, numDecline } from './utils.js';
import { sendData } from './fetch-api.js';
import { resetEffects } from './photo-filter.js';
import { resetScale } from './image-scale-editor.js';
import { showMessage } from './message-handler.js';

const MAX_SYMBOLS = 20;
const MAX_HASHTAGS = 5;
const COMMENT_MAX_LENGTH = 140;

let errorMessage = '';
let pristine;

const formElement = document.querySelector('.img-upload__form');
const bodyElement = document.querySelector('body');
const uploadFileControlElement = document.querySelector('#upload-file');
const photoEditorFormElement = document.querySelector('.img-upload__overlay');
const photoEditorResetButtonElement = document.querySelector('#upload-cancel');
const hashtagInputElement = formElement.querySelector('.text__hashtags');
const commentInputElement = formElement.querySelector('.text__description');
const submitButtonElement = formElement.querySelector('#upload-submit');

const toggleFormState = () => {
  photoEditorFormElement.classList.toggle('hidden');
  bodyElement.classList.toggle('modal-open');
};

const closePhotoEditor = () => {
  resetScale();
  resetEffects();
  uploadFileControlElement.value = '';
  formElement.reset();
  pristine.reset();
  toggleFormState();
  document.removeEventListener('keydown', onDocumentKeydown);
  photoEditorResetButtonElement.removeEventListener('click', onPhotoEditorResetClick);
};

function onPhotoEditorResetClick() {
  closePhotoEditor();
}

function onDocumentKeydown(evt) {
  const error = document.querySelector('.error');
  if (error) {
    onEscKeydown(evt, () => error.remove());
    return;
  }

  onEscKeydown(evt, () => {
    if (![hashtagInputElement, commentInputElement].includes(document.activeElement)) {
      closePhotoEditor();
    }
  });
}

const validateHashtags = (value) => {
  errorMessage = '';
  const inputText = value.toLowerCase().trim();
  if (!inputText) {
    return true;
  }
  const hastags = inputText.split(/\s+/);
  const uniqueHashtags = new Set(hastags.map((item) => item.toLowerCase()));

  const validationRules = [
    { check: hastags.some((item) => item === '#'), error: 'Хештег не может состоять только из решетки' },
    { check: hastags.some((item) => item.slice(1).includes('#')), error: 'Хештеги разделяются пробелами' },
    { check: hastags.some((item) => !item.startsWith('#')), error: 'Хештег должен начинаться с символа #' },
    { check: uniqueHashtags.size !== hastags.length, error: 'Хештеги не должны повторяться' },
    { check: hastags.some((item) => item.length > MAX_SYMBOLS), error: 'Хештег не может быть больше 20 символов' },
    { check: hastags.length > MAX_HASHTAGS, error: `Нельзя указать больше ${MAX_HASHTAGS} ${numDecline(MAX_HASHTAGS, 'хештега', 'хештегов', 'хештегов')}` },
    { check: hastags.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)), error: 'Хэштег содержит недопустимые символы' },
  ];

  return validationRules.every((rule) => {
    if (rule.check) {
      errorMessage = rule.error;
    }
    return !rule.check;
  });
};

const initFormValidation = () => {
  pristine = new Pristine(formElement, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--error',
  });

  pristine.addValidator(
    commentInputElement,
    (value) => value.length <= COMMENT_MAX_LENGTH,
    `Длина комментария не должна превышать ${COMMENT_MAX_LENGTH} символов`
  );

  pristine.addValidator(
    hashtagInputElement,
    validateHashtags,
    () => errorMessage,
    false
  );

  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      submitButtonElement.disabled = true;
      submitButtonElement.textContent = 'Публикую...';

      sendData(new FormData(formElement))
        .then(() => {
          showMessage('success');
          closePhotoEditor();
        })
        .catch(() => {
          showMessage('error');
        })
        .finally(() => {
          submitButtonElement.disabled = false;
          submitButtonElement.textContent = 'Опубликовать';
        });
    }
  });

  uploadFileControlElement.addEventListener('change', () => {
    toggleFormState();
    photoEditorResetButtonElement.addEventListener('click', onPhotoEditorResetClick);
    document.addEventListener('keydown', onDocumentKeydown);
  });
};

initFormValidation();
