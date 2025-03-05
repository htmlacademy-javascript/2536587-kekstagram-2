import { photos } from './data.js';
import { onEscKeydown } from './utils.js';

const imageModal = document.querySelector('.big-picture');
const imageElement = imageModal.querySelector('.big-picture__img img');
const likeCountElement = imageModal.querySelector('.likes-count');
const commentsContainer = imageModal.querySelector('.social__comments');
const commentTemplate = commentsContainer.querySelector('.social__comment');
const imageCaptionElement = imageModal.querySelector('.social__caption');
const commentCountElement = imageModal.querySelector('.social__comment-count');
const loadMoreCommentsButton = imageModal.querySelector('.social__comments-loader');
const closeButton = imageModal.querySelector('.big-picture__cancel');


function onFullThumbnailCancelClick() {
  closefullThumbnail();
}

const closeOnDocumentEscape = (evt) => {
  onEscKeydown(evt, closefullThumbnail);
};

function closefullThumbnail() {
  imageModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', closeOnDocumentEscape);
}

const openImageModal = (imageId) => {
  const selectedImage = photos.find((photo) => photo.id === Number(imageId));
  const commentsFragment = document.createDocumentFragment();

  imageElement.src = selectedImage.url;
  likeCountElement.textContent = selectedImage.likes;
  commentsContainer.innerHTML = '';

  selectedImage.comments.forEach((comment) => {
    const commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;

    commentsFragment.appendChild(commentElement);
  });

  commentsContainer.appendChild(commentsFragment);
  imageCaptionElement.textContent = selectedImage.description;
  commentCountElement.classList.add('hidden');
  loadMoreCommentsButton.classList.add('hidden');

  imageModal.classList.remove('hidden');
  closeButton.addEventListener('click', onFullThumbnailCancelClick);
  closeButton.focus();

  document.body.classList.add('modal-open');
  document.addEventListener('keydown', closeOnDocumentEscape);
};

export {openImageModal};
