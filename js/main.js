import './utils.js';
import { addPhoto } from './data.js';
import {renderPhotos} from './thumbnail.js';
import { openImageModal } from './fullThumbnail.js';
import './validationForm.js';

renderPhotos(addPhoto());


document.querySelectorAll('.pictures .picture').forEach((item) => {
  item.addEventListener('click', (evt) => {
    evt.preventDefault();

    openImageModal(item.dataset.imageId);
  });
});
