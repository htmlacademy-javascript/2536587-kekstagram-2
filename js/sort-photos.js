import { renderPhotos } from './thumbnail.js';
import { debounce } from './utils.js';

const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
const MAX_PICTURE_COUNT = 10;

const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const SortFunction = {
  RANDOM: () => Math.random() - 0.5,
  DISCUSSED: (a, b) => b.comments.length - a.comments.length,
};

const filterContainer = document.querySelector('.img-filters');
let currentFilterId = Filters.DEFAULT;
let photoData = [];

const debouncedRenderPhotos = debounce(renderPhotos);

const applyPhotoFilter = () => {
  let filteredPhotos = [...photoData];

  if (currentFilterId === Filters.RANDOM) {
    filteredPhotos = filteredPhotos.sort(SortFunction.RANDOM).slice(0, MAX_PICTURE_COUNT);
  } else if (currentFilterId === Filters.DISCUSSED) {
    filteredPhotos = filteredPhotos.sort(SortFunction.DISCUSSED);
  }

  debouncedRenderPhotos(filteredPhotos);
};

const handleFilterClick = (evt) => {
  const clickedButton = evt.target.closest('button');

  if (!clickedButton || clickedButton.classList.contains(ACTIVE_BUTTON_CLASS)) {
    return;
  }

  filterContainer.querySelector(`.${ACTIVE_BUTTON_CLASS}`)?.classList.remove(ACTIVE_BUTTON_CLASS);
  clickedButton.classList.add(ACTIVE_BUTTON_CLASS);

  currentFilterId = clickedButton.id;
  applyPhotoFilter();
};

const initializeFilters = (photos) => {
  photoData = photos;
  filterContainer.classList.remove('img-filters--inactive');
  filterContainer.addEventListener('click', handleFilterClick);
};

export { initializeFilters };
