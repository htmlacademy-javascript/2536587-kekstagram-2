const COUNT_STEP = 5;

let currentCount = 0;
let comments = [];

const imageModal = document.querySelector('.big-picture');
const commentsContainer = imageModal.querySelector('.social__comments');
const commentTemplate = commentsContainer.querySelector('.social__comment');
const commentCountElement = imageModal.querySelector('.social__comment-count');
const loadMoreCommentsButton = imageModal.querySelector('.social__comments-loader');

commentsContainer.innerHTML = '';

const renderNextComments = () => {
  const commentsFragment = document.createDocumentFragment();
  const nextComments = comments.slice(currentCount, currentCount + COUNT_STEP);
  const renderCommentsLength = nextComments.length + currentCount;

  nextComments.forEach((comment) => {
    const commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;

    commentsFragment.appendChild(commentElement);
  });

  commentsContainer.appendChild(commentsFragment);
  commentCountElement.querySelector('.social__comment-shown-count').textContent = renderCommentsLength;
  commentCountElement.querySelector('.social__comment-total-count').textContent = comments.length;

  if (renderCommentsLength >= comments.length) {
    loadMoreCommentsButton.classList.add('hidden');
  }

  currentCount = renderCommentsLength;
};

const onCommentLoaderClick = () => {
  renderNextComments();
};

const clearComments = () => {
  currentCount = 0;
  commentsContainer.innerHTML = '';
  loadMoreCommentsButton.classList.remove('hidden');
  loadMoreCommentsButton.removeEventListener('click', onCommentLoaderClick);
};

const initializeComments = (photoComments) => {
  comments = photoComments;
  currentCount = 0;
  commentsContainer.innerHTML = '';
  renderNextComments();

  loadMoreCommentsButton.addEventListener('click', onCommentLoaderClick);
};

export { clearComments, initializeComments };
