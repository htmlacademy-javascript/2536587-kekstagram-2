import { photos } from './data.js';
import { clearComments, initializeComments } from './render-comments.js';
import { onEscKeydown } from './utils.js';

const imageModal = document.querySelector('.big-picture');
const imageElement = imageModal.querySelector('.big-picture__img img');
const likeCountElement = imageModal.querySelector('.likes-count');
const imageCaptionElement = imageModal.querySelector('.social__caption');
const closeButton = imageModal.querySelector('.big-picture__cancel');


function onFullThumbnailCancelClick() {
  closefullThumbnail();
}

const closeOnDocumentEscape = (evt) => {
  onEscKeydown(evt, closefullThumbnail);
};

function closefullThumbnail() {
  clearComments();
  imageModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', closeOnDocumentEscape);
}

const openImageModal = (imageId) => {
  const selectedImage = photos.find((photo) => photo.id === Number(imageId));

  imageElement.src = selectedImage.url;
  likeCountElement.textContent = selectedImage.likes;
  imageCaptionElement.textContent = selectedImage.description;

  initializeComments(selectedImage.comments);

  imageModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButton.addEventListener('click', onFullThumbnailCancelClick);
  closeButton.focus();
  document.addEventListener('keydown', closeOnDocumentEscape);
};

export {openImageModal};
