import './utils.js';
import { loadPhotos } from './data-loader.js';
import { renderPhotos } from './thumbnail.js';
import { openImageModal } from './full-thumbnail.js';
import './validation-form.js';
import './image-scale-editor.js';
import './photo-filter.js';
import './fetch-api.js';

loadPhotos().then((photos) => {
  renderPhotos(photos);

  document.querySelectorAll('.pictures .picture').forEach((item) => {
    item.addEventListener('click', (evt) => {
      evt.preventDefault();
      openImageModal(item.dataset.imageId);
    });
  });
});
