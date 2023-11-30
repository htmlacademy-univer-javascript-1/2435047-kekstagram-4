import { imagePreview  } from './form.js';

const slider = document.querySelector('.effect-level__slider');
const sliderWrapper = document.querySelector('.effect-level');
const effectValue = document.querySelector('.effect-level__value');
const effectList = document.querySelector('.effects__list');


const Effects = {
  chrome: {
    filter: 'grayscale',
    units: '',
    options: {
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1
    }
  },
  sepia: {
    filter: 'sepia',
    units: '',
    options: {
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1
    }
  },
  marvin: {
    filter: 'invert',
    units: '%',
    options: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1
    }
  },
  phobos: {
    filter: 'blur',
    units: 'px',
    options: {
      range: {
        min: 0,
        max: 3
      },
      start: 3,
      step: 0.1
    }
  },
  heat: {
    filter: 'brightness',
    units: '',
    options: {
      range: {
        min: 1,
        max: 3
      },
      start: 3,
      step: 0.1
    }
  }
};

const initEffects = () => {
  noUiSlider.create(slider, {
    range: {
      min: 0,
      max: 100
    },
    start: 100,
    step: 0.1,
    connect: 'lower',
    format: {
      to: (value) => {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: (value) => parseFloat(value),
    },
  });
};

initEffects();

const updateFilter = (item) => {
  effectValue.value = slider.noUiSlider.get();
  imagePreview.style.filter = `${Effects[item].filter}(${effectValue.value}${Effects[item].units})`;
};

const onFilterButtonChange = (evt) => {
  const evtHandler = evt.target.value;
  if (evtHandler === 'none') {
    sliderWrapper.classList.add('hidden');
    imagePreview.style.filter = 'none';
  } else {
    sliderWrapper.classList.remove('hidden');
    imagePreview.removeAttribute('class');
    imagePreview.classList.add(`effects__preview--${evtHandler}`);
    slider.noUiSlider.updateOptions(Effects[evtHandler].options);
    slider.noUiSlider.on('update', updateFilter(evtHandler));
  }
};

export { onFilterButtonChange, initEffects, effectList, sliderWrapper };
