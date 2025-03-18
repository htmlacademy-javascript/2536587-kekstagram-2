const imagePreview = document.querySelector('.img-upload__preview img');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectValueField = document.querySelector('.effect-level__value');
const effectRadioButtons = document.querySelectorAll('.effects__radio');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');


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

noUiSlider.create(effectLevelSlider, {
  start: currentIntensity,
  range: {
    min: Effects[currentEffect].min,
    max: Effects[currentEffect].max,
  },
  step: Effects[currentEffect].step,
  connect: [true, false],
});

const applyEffect = (effect, intensity) => {
  imagePreview.style.filter = Effects[effect].filter ? Effects[effect].filter(intensity) : '';
};

const resetEffects = () => {
  currentEffect = 'none';
  currentIntensity = Effects[currentEffect].max;

  imagePreview.style.filter = '';

  effectValueField.value = currentIntensity;
  effectLevelContainer.classList.add('hidden');
  document.querySelector('#effect-none').checked = true;
  effectLevelSlider.noUiSlider.set(currentIntensity);

  effectLevelSlider.noUiSlider.updateOptions({
    range: { min: Effects[currentEffect].min, max: Effects[currentEffect].max },
    step: Effects[currentEffect].step,
    start: Effects[currentEffect].max,
  });
};

effectRadioButtons.forEach((radio) => {
  radio.addEventListener('change', (event) => {
    currentEffect = event.target.value;
    currentIntensity = Effects[currentEffect].max;
    effectValueField.value = currentIntensity;
    imagePreview.style.filter = '';

    effectLevelSlider.noUiSlider.updateOptions({
      range: { min: Effects[currentEffect].min, max: Effects[currentEffect].max },
      step: Effects[currentEffect].step,
      start: Effects[currentEffect].max,
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

document.addEventListener('DOMContentLoaded', () => {
  if (currentEffect === 'none') {
    effectLevelContainer.classList.add('hidden');
  }
});

export {resetEffects};
