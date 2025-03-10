const uploadFileInput = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancelButton = document.querySelector('.img-upload__cancel');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectValueField = document.querySelector('.effect-level__value');
const effectRadioButtons = document.querySelectorAll('.effects__radio');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectPreviews = document.querySelectorAll('.effects__preview');

const effects = {
  chrome: { filter: (intensity) => `grayscale(${intensity.toFixed(1)})`, min: 0, max: 1, step: 0.1 },
  sepia: { filter: (intensity) => `sepia(${intensity.toFixed(1)})`, min: 0, max: 1, step: 0.1 },
  marvin: { filter: (intensity) => `invert(${intensity}%)`, min: 0, max: 100, step: 1 },
  phobos: { filter: (intensity) => `blur(${intensity}px)`, min: 0, max: 3, step: 0.1 },
  heat: { filter: (intensity) => `brightness(${intensity})`, min: 1, max: 3, step: 0.1 },
  none: { filter: () => '', min: 0, max: 100, step: 1 },
};

let currentEffect = 'none';
let currentIntensity = effects[currentEffect].max;

noUiSlider.create(effectLevelSlider, {
  start: currentIntensity,
  range: {
    min: effects[currentEffect].min,
    max: effects[currentEffect].max,
  },
  step: effects[currentEffect].step,
  connect: [true, false],
});

document.addEventListener('DOMContentLoaded', () => {
  if (currentEffect === 'none') {
    effectLevelContainer.classList.add('hidden');
  }
});

const applyEffect = (effect, intensity) => {
  imagePreview.style.filter = effects[effect].filter ? effects[effect].filter(intensity) : '';
};

const resetEffects = () => {
  currentEffect = 'none';
  currentIntensity = effects[currentEffect].max;
  imagePreview.style.filter = '';
  effectValueField.value = currentIntensity;
  effectLevelContainer.classList.add('hidden');
  effectLevelSlider.noUiSlider.updateOptions({
    range: { min: effects[currentEffect].min, max: effects[currentEffect].max },
    step: effects[currentEffect].step,
    start: effects[currentEffect].max,
  });
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
    resetEffects();
  }
});

effectRadioButtons.forEach((radio) => {
  radio.addEventListener('change', (event) => {
    currentEffect = event.target.value;
    currentIntensity = effects[currentEffect].max;
    effectValueField.value = currentIntensity;
    effectLevelSlider.noUiSlider.updateOptions({
      range: { min: effects[currentEffect].min, max: effects[currentEffect].max },
      step: effects[currentEffect].step,
      start: effects[currentEffect].max,
    });
    effectLevelContainer.classList.toggle('hidden', currentEffect === 'none');
    applyEffect(currentEffect, currentIntensity);
  });
});

effectLevelSlider.noUiSlider.on('update', (values) => {
  currentIntensity = parseFloat(values[0]);
  effectValueField.value = currentIntensity;
  applyEffect(currentEffect, currentIntensity);
});

uploadCancelButton.addEventListener('click', () => {
  uploadOverlay.classList.add('hidden');
  resetEffects();
});
