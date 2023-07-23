const EFFECTS = [
  {
    name: 'none',
    style: '',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
];

const DEFAULT_EFFECT = EFFECTS[0];

const rangesSliderContainer = document.querySelector('.effect-level');
const rangeSlider = document.querySelector('.effect-level__slider');
const rangeSliderInput = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects');
const image = document.querySelector('.img-upload__preview');

let currentEffect = DEFAULT_EFFECT;

function showRangeSlider() {
  rangesSliderContainer.classList.remove('hidden');
}

function hideRangeSlider() {
  rangesSliderContainer.classList.add('hidden');
}

hideRangeSlider();

function updateSlider() {
  rangeSlider.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    step: currentEffect.step,
    start: currentEffect.max,
  });
}

function onEffectsListClick(evt) {
  if (evt.target.classList.contains('effects__radio')) {
    currentEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
    image.className = `img-upload__preview effects__preview--${currentEffect.name}`;

    updateSlider();

    if (currentEffect.name === 'none') {
      hideRangeSlider();
    } else {
      showRangeSlider();
    }
  }
}

function onRangeSliderUpdate() {
  const rangeSliderValue = rangeSlider.noUiSlider.get();
  rangeSliderInput.value = rangeSliderValue;
  image.style.filter = `${currentEffect.style}(${rangeSliderValue}${currentEffect.unit})`;

  if (currentEffect.name === 'none') {
    image.style.filter = DEFAULT_EFFECT.style;
  }
}

noUiSlider.create(rangeSlider, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  step: DEFAULT_EFFECT.step,
  start: DEFAULT_EFFECT.min,
});

effectsList.addEventListener('click', onEffectsListClick);
rangeSlider.noUiSlider.on('update', onRangeSliderUpdate);
