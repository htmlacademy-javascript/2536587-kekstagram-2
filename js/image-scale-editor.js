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

smallerButton.addEventListener('click', onSmallerButtonClick);
biggerButton.addEventListener('click', onBiggerButtonClick);

export { resetScale};
