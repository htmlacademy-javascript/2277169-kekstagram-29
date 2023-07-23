const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const modalElement = document.querySelector('.img-upload');
const reduceButton = modalElement.querySelector('.scale__control--smaller');
const raiseButton = modalElement.querySelector('.scale__control--bigger');
const scaleControl = modalElement.querySelector('.scale__control--value');
const imageElement = modalElement.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  imageElement.style.transform = `scale(${value / 100})`;
  scaleControl.value = `${value}%`;
};

const onReduceButtonClick = () => {
  const currentValue = parseInt(scaleControl.value, 10);
  const newValue = currentValue - SCALE_STEP;
  if (newValue < MIN_SCALE) {
    scaleImage(MIN_SCALE);
  } else {
    scaleImage(newValue);
  }
};

const onRaiseButtonClick = () => {
  const currentValue = parseInt(scaleControl.value, 10);
  const newValue = currentValue + SCALE_STEP;
  if (newValue > MAX_SCALE) {
    scaleImage(MAX_SCALE);
  } else {
    scaleImage(newValue);
  }
};

const resetScale = () => scaleImage(DEFAULT_SCALE);

reduceButton.addEventListener('click', onReduceButtonClick);
raiseButton.addEventListener('click', onRaiseButtonClick);

export { resetScale };
