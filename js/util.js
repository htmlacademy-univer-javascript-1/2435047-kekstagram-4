const DELAY = 500;

const EscKeys = {
  ESC: 'Esc',
  ESCAPE: 'Escape',
};

const isEscapeKey = (evt) => evt.key === EscKeys.ESC || evt.key === EscKeys.ESCAPE;

const closeOnEscKeyDown = (evt, cb) => {
  if (isEscapeKey(evt)) {
    cb();
  }
};

const debounce = (cb) => {
  let lastTimeout = null;

  return (...args) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...args);
    }, DELAY);
  };
};

const shuffleArray = (array) => {
  for (let indexOne = array.length - 1; indexOne  > 0; indexOne--) {
    const indexTwo = Math.floor(Math.random() * (indexOne + 1));
    [array[indexOne], array[indexTwo]] = [array[indexTwo], array[indexOne]];
  }

  return array;
};


export { debounce, shuffleArray, closeOnEscKeyDown, isEscapeKey };
