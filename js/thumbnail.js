const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
const photoListElement = document.querySelector('.pictures');

const renderPhoto = ({id, url, description, likes, comments}) => {
  const photoPreviewElement = pictureTemplateElement.cloneNode(true);
  photoPreviewElement.dataset.pictureId = id;
  photoPreviewElement.querySelector('.picture__img').src = url;
  photoPreviewElement.querySelector('.picture__img').alt = description;
  photoPreviewElement.querySelector('.picture__likes').textContent = likes;
  photoPreviewElement.querySelector('.picture__comments').textContent = comments.length;

  return photoPreviewElement;
};

const renderPhotos = (photos) => {
  const currentPhotos = photoListElement.querySelectorAll('.picture');
  currentPhotos.forEach((photo) => photo.remove());

  const photosFragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    photosFragment.appendChild(renderPhoto(photo));
  });

  photoListElement.appendChild(photosFragment);
};

export {renderPhotos};
