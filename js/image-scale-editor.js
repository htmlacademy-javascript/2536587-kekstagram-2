const MIN_SCALE = 25;
const MAX_SCALE = 100;
const SCALE_STEP = 25;

const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const scaleValueField = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');

let scaleValue = MAX_SCALE;

const updateScale = () => {
  scaleValueField.value = `${scaleValue}%`;
  imagePreview.style.transform = `scale(${scaleValue / 100})`;
};

const onSmallerButtonClick = () => {
  if (scaleValue > MIN_SCALE) {
    scaleValue -= SCALE_STEP;
    updateScale();
  }
};

const onBiggerButtonClick = () => {
  if (scaleValue < MAX_SCALE) {
    scaleValue += SCALE_STEP;
    updateScale();
  }
};

smallerButton.addEventListener('click', onSmallerButtonClick);
biggerButton.addEventListener('click', onBiggerButtonClick);

const resetScale = () => {
  scaleValue = MAX_SCALE;
  updateScale();
};

export { resetScale};
