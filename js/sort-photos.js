import { renderPhotos } from './thumbnail.js';
import { debounce } from './utils.js';

const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
const FILTER_DELAY = 500;

const FILTERS = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed',
};
const SORT_FUNCTION = {
  random: () => 0.5 - Math.random(),
  discussed: (a, b) => b.comments.length - a.comments.length,
};
const MAX_PICTURE_COUNT = 10;


const filterContainer = document.querySelector('.img-filters');
let currentFilterId = FILTERS.default;
let photoData = [];

const debouncedRenderPhotos = debounce(renderPhotos, FILTER_DELAY);

function handleFilterClick(evt) {
  const clickedButton = evt.target.closest('button');

  if (!clickedButton || clickedButton.classList.contains(ACTIVE_BUTTON_CLASS)) {
    return;
  }

  const activeButton = filterContainer.querySelector(`.${ACTIVE_BUTTON_CLASS}`);
  activeButton.classList.remove(ACTIVE_BUTTON_CLASS);
  clickedButton.classList.add(ACTIVE_BUTTON_CLASS);

  currentFilterId = clickedButton.id;
  applyPhotoFilter();
}

function applyPhotoFilter() {
  let filteredPhotos = [...photoData];

  switch (currentFilterId) {
    case FILTERS.random:
      filteredPhotos = filteredPhotos.sort(SORT_FUNCTION.random).slice(0, MAX_PICTURE_COUNT);
      break;
    case FILTERS.discussed:
      filteredPhotos = filteredPhotos.sort(SORT_FUNCTION.discussed);
      break;
  }

  debouncedRenderPhotos(filteredPhotos);
}

function initializeFilters(photos) {
  filterContainer.classList.remove('img-filters--inactive');
  filterContainer.addEventListener('click', handleFilterClick);
  photoData = photos;
}

export { initializeFilters };
