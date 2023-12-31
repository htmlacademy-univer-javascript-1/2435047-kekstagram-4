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

const uploadOverlay = document.querySelector('.img-upload__overlay');
const slider = uploadOverlay.querySelector('.effect-level__slider');
const sliderWrapper = uploadOverlay.querySelector('.effect-level');
const effectValue = uploadOverlay.querySelector('.effect-level__value');
const effectList = uploadOverlay.querySelector('.effects__list');
const imagePreview = uploadOverlay.querySelector('.img-upload__preview img');

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
  const target = evt.target.value;
  if (target === 'none') {
    sliderWrapper.classList.add('hidden');
    imagePreview.style.filter = 'none';
  } else {
    imagePreview.removeAttribute('class');
    sliderWrapper.classList.remove('hidden');
    imagePreview.classList.add(`effects__preview--${target}`);
    slider.noUiSlider.updateOptions(Effects[target].options);
    imagePreview.style.filter = `${Effects[target].filter}`;
    slider.noUiSlider.on('update', () => updateFilter(target));
  }
};


export { onFilterButtonChange, initEffects, effectList, sliderWrapper };
