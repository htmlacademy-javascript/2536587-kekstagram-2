import { renderPhotos } from './thumbnail.js';
import { debounce } from './utils.js';

const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
const MAX_PICTURE_COUNT = 10;

const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISSCUSSED: 'filter-discussed',
};
const SortFunction = {
  RANDOM: () => 0.5 - Math.random(),
  DISSCUSSED: (a, b) => b.comments.length - a.comments.length,
};


const filterContainer = document.querySelector('.img-filters');
let currentFilterId = Filters.DEFAULT;
let photoData = [];

const debouncedRenderPhotos = debounce(renderPhotos);

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
    case Filters.RANDOM:
      filteredPhotos = filteredPhotos.sort(SortFunction.RANDOM).slice(0, MAX_PICTURE_COUNT);
      break;
    case Filters.DISSCUSSED:
      filteredPhotos = filteredPhotos.sort(SortFunction.DISSCUSSED);
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
