const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
const photoListElement = document.querySelector('.pictures');

const renderPhoto = ({id, url, description, likes, comments}) => {
  const photoPreview = pictureTemplateElement.cloneNode(true);
  photoPreview.dataset.pictureId = id;
  photoPreview.querySelector('.picture__img').src = url;
  photoPreview.querySelector('.picture__img').alt = description;
  photoPreview.querySelector('.picture__likes').textContent = likes;
  photoPreview.querySelector('.picture__comments').textContent = comments.length;

  return photoPreview;
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
