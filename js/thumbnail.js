const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const photoList = document.querySelector('.pictures');

const renderPhoto = ({id, url, description, likes, comments}) => {
  const photoPreview = pictureTemplate.cloneNode(true);
  photoPreview.dataset.imageId = id;
  photoPreview.querySelector('.picture__img').src = url;
  photoPreview.querySelector('.picture__img').alt = description;
  photoPreview.querySelector('.picture__likes').textContent = likes;
  photoPreview.querySelector('.picture__comments').textContent = comments.length;

  return photoPreview;
};

const renderPhotos = (photos) => {
  const photosFragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    photosFragment.appendChild(renderPhoto(photo));
  });

  photoList.appendChild(photosFragment);
};

export {renderPhotos};
