import { clearComments, initializeComments } from './render-comments.js';
import { onEscKeydown } from './utils.js';

const imageModal = document.querySelector('.big-picture');
const imageElement = imageModal.querySelector('.big-picture__img img');
const likeCountElement = imageModal.querySelector('.likes-count');
const imageCaptionElement = imageModal.querySelector('.social__caption');
const closeButton = imageModal.querySelector('.big-picture__cancel');

function onFullThumbnailCancelClick() {
  closeFullThumbnail();
}

const closeOnDocumentEscape = (evt) => {
  onEscKeydown(evt, closeFullThumbnail);
};

function closeFullThumbnail() {
  clearComments();
  imageModal.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', closeOnDocumentEscape);
  closeButton.removeEventListener('click', onFullThumbnailCancelClick);
}

const openFullThumbnail = (pictureId, photos) => {
  const selectedImage = photos.find((photo) => photo.id === Number(pictureId));

  imageElement.src = selectedImage.url;
  likeCountElement.textContent = selectedImage.likes;
  imageCaptionElement.textContent = selectedImage.description;

  initializeComments(selectedImage.comments);

  imageModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButton.addEventListener('click', onFullThumbnailCancelClick);
  document.addEventListener('keydown', closeOnDocumentEscape);
};

export { openFullThumbnail };
