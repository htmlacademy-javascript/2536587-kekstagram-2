const COUNT_STEP = 5;

let currentCount = 0;
let comments = [];

const imageModalElement = document.querySelector('.big-picture');
const commentsContainerElement = imageModalElement.querySelector('.social__comments');
const commentTemplateElement = commentsContainerElement.querySelector('.social__comment');
const commentCountElement = imageModalElement.querySelector('.social__comment-count');
const loadMoreCommentsButtonElement = imageModalElement.querySelector('.social__comments-loader');

commentsContainerElement.innerHTML = '';

const renderNextComments = () => {
  const commentsFragment = document.createDocumentFragment();
  const nextComments = comments.slice(currentCount, currentCount + COUNT_STEP);
  const renderCommentsLength = nextComments.length + currentCount;

  nextComments.forEach((comment) => {
    const commentElement = commentTemplateElement.cloneNode(true);

    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;

    commentsFragment.appendChild(commentElement);
  });

  commentsContainerElement.appendChild(commentsFragment);
  commentCountElement.querySelector('.social__comment-shown-count').textContent = renderCommentsLength;
  commentCountElement.querySelector('.social__comment-total-count').textContent = comments.length;

  if (renderCommentsLength >= comments.length) {
    loadMoreCommentsButtonElement.classList.add('hidden');
  }

  currentCount = renderCommentsLength;
};

const onCommentLoaderClick = () => {
  renderNextComments();
};

const clearComments = () => {
  currentCount = 0;
  commentsContainerElement.innerHTML = '';
  loadMoreCommentsButtonElement.classList.remove('hidden');
  loadMoreCommentsButtonElement.removeEventListener('click', onCommentLoaderClick);
};

const initializeComments = (photoComments) => {
  comments = photoComments;
  currentCount = 0;
  commentsContainerElement.innerHTML = '';
  renderNextComments();

  loadMoreCommentsButtonElement.addEventListener('click', onCommentLoaderClick);
};

export { clearComments, initializeComments };
