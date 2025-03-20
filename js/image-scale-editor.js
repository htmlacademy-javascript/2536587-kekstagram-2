const MIN_SCALE = 25;
const MAX_SCALE = 100;
const SCALE_STEP = 25;

const smallerButtonElement = document.querySelector('.scale__control--smaller');
const biggerButtonElement = document.querySelector('.scale__control--bigger');
const scaleValueFieldElement = document.querySelector('.scale__control--value');
const imagePreviewElement = document.querySelector('.img-upload__preview img');

let scaleValue = MAX_SCALE;

const updateScale = () => {
  scaleValueFieldElement.value = `${scaleValue}%`;
  imagePreviewElement.style.transform = `scale(${scaleValue / 100})`;
};

const changeScale = (step) => {
  const newScale = scaleValue + step;

  if (newScale >= MIN_SCALE && newScale <= MAX_SCALE) {
    scaleValue = newScale;
    updateScale();
  }
};

const onSmallerButtonClick = () => changeScale(-SCALE_STEP);
const onBiggerButtonClick = () => changeScale(SCALE_STEP);


const resetScale = () => {
  scaleValue = MAX_SCALE;
  updateScale();
};

smallerButtonElement.addEventListener('click', onSmallerButtonClick);
biggerButtonElement.addEventListener('click', onBiggerButtonClick);

export { resetScale};
