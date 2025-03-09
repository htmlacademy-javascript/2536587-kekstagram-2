const uploadFileInput = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancelButton = document.querySelector('#upload-cancel');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectValueField = document.querySelector('.effect-level__value');
const effectRadioButtons = document.querySelectorAll('.effects__radio');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectPreviews = document.querySelectorAll('.effects__preview');

noUiSlider.create(effectLevelSlider, {
  start: 100,
  range: {
    min: 0,
    max: 100,
  },
  step: 1,
  connect: [true, false],
});

let currentEffect = 'none';
let currentIntensity = 100;

document.addEventListener('DOMContentLoaded', () => {
  if (currentEffect === 'none') {
    effectLevelContainer.classList.add('hidden');
  }
});


const applyEffect = (effect, intensity) => {
  switch (effect) {
    case 'chrome':
      imagePreview.style.filter = `grayscale(${(intensity / 100).toFixed(1)})`;
      break;
    case 'sepia':
      imagePreview.style.filter = `sepia(${(intensity / 100).toFixed(1)})`;
      break;
    case 'marvin':
      imagePreview.style.filter = `invert(${intensity}%)`;
      break;
    case 'phobos':
      imagePreview.style.filter = `blur(${(intensity / 100) * 3}px)`;
      break;
    case 'heat':
      imagePreview.style.filter = `brightness(${1 + (intensity / 100) * 2})`;
      break;
    case 'none':
      imagePreview.style.filter = '';
      break;
  }
};

uploadFileInput.addEventListener('change', () => {
  const file = uploadFileInput.files[0];

  if (file) {
    const fileUrl = URL.createObjectURL(file);

    imagePreview.src = fileUrl;

    effectPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url(${fileUrl})`;
    });
    uploadOverlay.classList.remove('hidden');
  }
});

uploadCancelButton.addEventListener('click', () => {
  uploadOverlay.classList.add('hidden');
});

effectRadioButtons.forEach((radio) => {
  radio.addEventListener('change', (event) => {
    currentEffect = event.target.value;
    currentIntensity = 100;
    effectValueField.value = currentIntensity;
    effectLevelSlider.noUiSlider.set(currentIntensity);

    if (currentEffect === 'none') {
      effectLevelContainer.classList.add('hidden');
    } else {
      effectLevelContainer.classList.remove('hidden');
    }
    applyEffect(currentEffect, currentIntensity);
  });
});

effectLevelSlider.noUiSlider.on('update', (values) => {
  currentIntensity = Math.round(values[0]);
  effectValueField.value = currentIntensity;
  applyEffect(currentEffect, currentIntensity);
});
