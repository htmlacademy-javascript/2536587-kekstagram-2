import './utils.js';
import { addPhoto } from './data.js';
import {renderPhotos} from './thumbnail.js';
import { openImageModal } from './full-thumbnail.js';
import './validation-form.js';

renderPhotos(addPhoto());


document.querySelectorAll('.pictures .picture').forEach((item) => {
  item.addEventListener('click', (evt) => {
    evt.preventDefault();

    openImageModal(item.dataset.imageId);
  });
});
