import { clearComments, initializeComments } from './render-comments.js';
import { onEscKeydown } from './utils.js';

const imageModalElement = document.querySelector('.big-picture');
const imageElement = imageModalElement.querySelector('.big-picture__img img');
const likeCountElement = imageModalElement.querySelector('.likes-count');
const imageCaptionElement = imageModalElement.querySelector('.social__caption');
const closeButtonElement = imageModalElement.querySelector('.big-picture__cancel');

function onFullThumbnailCancelClick() {
  closeFullThumbnail();
}

const onDocumentEscapePress = (evt) => {
  onEscKeydown(evt, closeFullThumbnail);
};

function closeFullThumbnail() {
  clearComments();
  imageModalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentEscapePress);
  closeButtonElement.removeEventListener('click', onFullThumbnailCancelClick);
}

const openFullThumbnail = (pictureId, photos) => {
  const selectedImage = photos.find((photo) => photo.id === Number(pictureId));

  imageElement.src = selectedImage.url;
  likeCountElement.textContent = selectedImage.likes;
  imageCaptionElement.textContent = selectedImage.description;

  initializeComments(selectedImage.comments);

  imageModalElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButtonElement.addEventListener('click', onFullThumbnailCancelClick);
  document.addEventListener('keydown', onDocumentEscapePress);
};

export { openFullThumbnail };
