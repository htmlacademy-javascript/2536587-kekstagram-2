import { onEscKeydown, numDecline } from './utils.js';
import { setData } from './fetch-api.js';
import { resetEffects } from './photo-filter.js';
import { resetScale } from './image-scale-editor.js';

const MAX_SYMBOLS = 20;
const MAX_HASHTAGS = 5;
const COMMENT_MAX_LENGTH = 140;

let errorMessage = '';
let message = null;

const form = document.querySelector('.img-upload__form');
const page = document.querySelector('body');
const uploadFileControl = document.querySelector('#upload-file');
const photoEditorForm = document.querySelector('.img-upload__overlay');
const photoEditorResetButton = document.querySelector('#upload-cancel');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
const submitButton = form.querySelector('#upload-submit');

const toggleFormState = () => {
  photoEditorForm.classList.toggle('hidden');
  page.classList.toggle('modal-open');
};

const closePhotoEditor = () => {
  resetScale();
  resetEffects();
  toggleFormState();
  document.removeEventListener('keydown', onDocumentKeydown);
  photoEditorResetButton.removeEventListener('click', onPhotoEditorResetClick);
  uploadFileControl.value = '';
  form.reset();
};

const createMessageHandler = (templateId) => {
  const template = document.querySelector(`#${templateId}`).content.cloneNode(true);
  message = template.querySelector(`.${templateId}`);
  document.body.append(message);

  const removeMessage = () => {
    message.remove();
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onDocumentKeyDown);
  };

  function onDocumentClick(evt) {
    if (!evt.target.closest(`.${templateId}__inner`)) {
      removeMessage();
    }
  }

  function onDocumentKeyDown(evt){
    onEscKeydown(evt, removeMessage);
  }

  message.querySelector(`.${templateId}__button`).addEventListener('click', removeMessage);
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeyDown);
};

function onPhotoEditorResetClick () {
  closePhotoEditor();
}

function onDocumentKeydown(evt) {
  onEscKeydown(evt, () => {
    if (![hashtagInput, commentInput].includes(document.activeElement)) {
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

  const inputArray = inputText.split(/\s+/);
  const uniqueHashtags = new Set(inputArray.map((item) => item.toLowerCase()));

  const validationRules = [
    { check: inputArray.some((item) => item === '#'), error: 'Хештег не может состоять только из решетки' },
    { check: inputArray.some((item) => item.slice(1).includes('#')), error: 'Хештеги разделяются пробелами' },
    { check: inputArray.some((item) => !item.startsWith('#')), error: 'Хештег должен начинаться с символа #' },
    { check: uniqueHashtags.size !== inputArray.length, error: 'Хештеги не должны повторяться' },
    { check: inputArray.some((item) => item.length > MAX_SYMBOLS), error: 'Хештег не может быть больше 20 символов' },
    { check: inputArray.length > MAX_HASHTAGS, error: `Нельзя указать больше ${MAX_HASHTAGS} ${numDecline(MAX_HASHTAGS, 'хештега', 'хештегов', 'хештегов')}` },
    { check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)), error: 'Хэштег содержит недопустимые символы' },
  ];

  return validationRules.every((rule) => {
    if (rule.check) {
      errorMessage = rule.error;
    }
    return !rule.check;
  });
};

const initFormValidation = () => {
  const pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--error',
  });

  pristine.addValidator(commentInput,
    (value) => value.length <= COMMENT_MAX_LENGTH,
    `Длина комментария не должна превышать ${COMMENT_MAX_LENGTH} символов`
  );

  pristine.addValidator(hashtagInput,
    validateHashtags,
    () => errorMessage,
    false
  );

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      submitButton.disabled = true;
      submitButton.textContent = 'Публикую...';

      setData(new FormData(form))
        .then(() => {
          closePhotoEditor();
          createMessageHandler('success');
        })
        .catch(() => {
          createMessageHandler('error');
        })
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
};

initFormValidation();
