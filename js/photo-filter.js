const imagePreviewElement = document.querySelector('.img-upload__preview img');
const effectLevelSliderElement = document.querySelector('.effect-level__slider');
const effectValueElement = document.querySelector('.effect-level__value');
const effectRadioElements = document.querySelectorAll('.effects__radio');
const effectLevelContainerElement = document.querySelector('.img-upload__effect-level');

const Effects = {
  CHROME: { filter: (intensity) => `grayscale(${intensity.toFixed(1)})`, min: 0, max: 1, step: 0.1 },
  SEPIA: { filter: (intensity) => `sepia(${intensity.toFixed(1)})`, min: 0, max: 1, step: 0.1 },
  MARVIN: { filter: (intensity) => `invert(${intensity}%)`, min: 0, max: 100, step: 1 },
  PHOBOS: { filter: (intensity) => `blur(${intensity}px)`, min: 0, max: 3, step: 0.1 },
  HEAT: { filter: (intensity) => `brightness(${intensity})`, min: 1, max: 3, step: 0.1 },
  NONE: { filter: () => '', min: 0, max: 100, step: 1 },
};

let currentEffect = 'NONE';
let currentIntensity = Effects[currentEffect].max;

noUiSlider.create(effectLevelSliderElement, {
  start: currentIntensity,
  range: {
    min: Effects[currentEffect].min,
    max: Effects[currentEffect].max,
  },
  step: Effects[currentEffect].step,
  connect: [true, false],
});

const applyEffect = (effect, intensity) => {
  imagePreviewElement.style.filter = Effects[effect].filter ? Effects[effect].filter(intensity) : '';
};

const resetEffects = () => {
  currentEffect = 'NONE';
  currentIntensity = Effects[currentEffect].max;

  imagePreviewElement.style.filter = '';

  effectValueElement.value = currentIntensity;
  effectLevelContainerElement.classList.add('hidden');
  document.querySelector('#effect-none').checked = true;
  effectLevelSliderElement.noUiSlider.set(currentIntensity);

  effectLevelSliderElement.noUiSlider.updateOptions({
    range: { min: Effects[currentEffect].min, max: Effects[currentEffect].max },
    step: Effects[currentEffect].step,
    start: Effects[currentEffect].max,
  });
};

effectRadioElements.forEach((radio) => {
  radio.addEventListener('change', (event) => {
    currentEffect = event.target.value.toUpperCase();
    currentIntensity = Effects[currentEffect].max;
    effectValueElement.value = currentIntensity;
    imagePreviewElement.style.filter = '';

    effectLevelSliderElement.noUiSlider.updateOptions({
      range: { min: Effects[currentEffect].min, max: Effects[currentEffect].max },
      step: Effects[currentEffect].step,
      start: currentIntensity,
    });

    effectLevelContainerElement.classList.toggle('hidden', currentEffect === 'NONE');
    applyEffect(currentEffect, currentIntensity);
  });
});

effectLevelSliderElement.noUiSlider.on('update', (values) => {
  currentIntensity = parseFloat(values[0]);
  effectValueElement.value = currentIntensity;
  applyEffect(currentEffect, currentIntensity);
});

document.addEventListener('DOMContentLoaded', () => {
  if (currentEffect === 'NONE') {
    effectLevelContainerElement.classList.add('hidden');
  }
});

export { resetEffects };
