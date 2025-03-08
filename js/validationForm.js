import {onEscKeydown, numDecline} from './utils.js';

const MAX_SYMBOLS = 20;
const MAX_HASHTAGS = 5;
const COMMENT_MAX_LENGTH = 140;
let errorMessage = '';

const form = document.querySelector('.img-upload__form');
const page = document.querySelector('body');
const uploadFileControl = document.querySelector('#upload-file');
const photoEditorForm = document.querySelector('.img-upload__overlay');
const photoEditorResetButton = document.querySelector('#upload-cancel');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');

const onPhotoEditorResetButtonClick = () =>{
  closePhotoEditor();
};

const onDocumentKeydown = (evt) =>{
  if (onEscKeydown(evt)){
    evt.preventDefault();
    if(document.activeElement === hashtagInput || document.activeElement === commentInput){
      evt.stopPropagation();
    } else{
      form.reset();
      closePhotoEditor();
    }
  }
};

function closePhotoEditor () {
  photoEditorForm.classList.add('hidden');
  page.classList.remove('modal-open');
  document.removeEventListener('keydown',onDocumentKeydown);
  photoEditorResetButton.removeEventListener('click',onPhotoEditorResetButtonClick);
  uploadFileControl.value = '';
}

const initUploadModal = () => {
  uploadFileControl.addEventListener('change', () => {
    photoEditorForm.classList.remove('hidden');
    page.classList.add('modal-open');
    photoEditorResetButton.addEventListener('click', onPhotoEditorResetButtonClick);
    document.addEventListener('keydown', onDocumentKeydown);
  });
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const error = () => errorMessage;

const isHashtagsValid = (value) => {
  errorMessage = '';
  const inputText = value.toLowerCase().trim();
  if (inputText.length === 0) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);

  const rules = [
    {
      check: inputArray.some((item) => item === '#'),
      error:'Хештег не может состоять только из одной решетки'
    },
    {
      check: inputArray.some((item) => item.slice(1).includes('#')),
      error: 'Хештеги разделяются пробелами'
    },
    {
      check:inputArray.some((item) => item[0] !== '#'),
      error:'Хештег должен начинаться со знака #'
    },
    {
      check: inputArray.some((item, num, array) => array.includes(item, num + 1)),
      error: 'Хештеги не должны повторяться',
    },
    {
      check: inputArray.some((item) => item.length > MAX_SYMBOLS),
      error: 'Хештег не может быть больше 20 символов',
    },
    {
      check: inputArray.length > MAX_HASHTAGS,
      error: `Нельзя указать больше ${MAX_HASHTAGS} ${numDecline(
        MAX_HASHTAGS, 'хештега', 'хештегов', 'хештегов'
      )}, `
    },
    {
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хэштег содержит недопустимые символы',
    }
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

pristine.addValidator(commentInput, (value) => value.length <= COMMENT_MAX_LENGTH, `Длина комментария не должна превышать ${COMMENT_MAX_LENGTH} символов`);
pristine.addValidator(hashtagInput, isHashtagsValid, error, false);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

initUploadModal();
