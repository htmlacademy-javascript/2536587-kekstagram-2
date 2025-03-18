const ERROR_DISPLAY_TIME = 5000;
const DEBOUNCE_DELAY = 500;

const onEscKeydown = (evt, cb) => {
  if (evt.key === 'Escape' && cb) {
    cb();
  }
};

const numDecline = (num, nominative, genitiveSingular, genitivePlural) => {
  if (num % 10 === 0 || num % 100 > 4 && num % 100 < 21) {
    return genitivePlural;
  }
  return num % 10 === 1
    ? nominative
    : genitiveSingular;
};

const showDataError = () => {
  const template = document.querySelector('#data-error').content.cloneNode(true);
  const errorElement = template.querySelector('.data-error');
  document.body.append(errorElement);

  setTimeout(() => errorElement.remove(), ERROR_DISPLAY_TIME);
};

function debounce (callback, timeoutDelay = DEBOUNCE_DELAY) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {onEscKeydown, numDecline, showDataError, debounce};
