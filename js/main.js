import {showDataError} from './utils.js';
import { renderPhotos } from './thumbnail.js';
import { openFullThumbnail } from './full-thumbnail.js';
import './render-comments.js';
import './validation-form.js';
import './image-scale-editor.js';
import './photo-filter.js';
import './image-preview .js';
import {getData} from './fetch-api.js';
import { initializeFilters } from './sort-photos.js';

const createGallery = (photos) => {
  document.querySelector('.pictures').addEventListener('click', (evt) => {
    const picture = evt.target.closest('[data-picture-id]');

    if (picture) {
      evt.preventDefault();
      openFullThumbnail(picture.dataset.pictureId, photos);
    }
  });
};

getData().then((photos) => {
  window.console.log(photos);
  renderPhotos(photos);
  createGallery(photos);
  initializeFilters(photos);
}).catch(() => showDataError());
