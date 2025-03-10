const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const scaleValueField = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');

let scaleValue = 100;

const updateScale = () => {
  scaleValueField.value = `${scaleValue}%`;

  imagePreview.style.transform = `scale(${scaleValue / 100})`;
};

smallerButton.addEventListener('click', () => {

  if (scaleValue > 25) {
    scaleValue -= 25;
    updateScale();
  }
});

biggerButton.addEventListener('click', () => {
  if (scaleValue < 100) {
    scaleValue += 25;
    updateScale();
  }
});
