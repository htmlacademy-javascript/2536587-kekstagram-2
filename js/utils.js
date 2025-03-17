const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

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

  setTimeout(() => errorElement.remove(), 5000);
};

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {getRandomInteger, getRandomElement, onEscKeydown, numDecline, showDataError, debounce};
