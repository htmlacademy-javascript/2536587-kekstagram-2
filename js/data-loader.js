import { getData } from './fetch-api.js';

let photos = [];

const loadPhotos = () => getData()
  .then((data) => {
    photos = data;
    return photos;
  })
  .catch((error) => {
    window.console.error('Ошибка загрузки фотографий:', error);
    return [];
  });

export { loadPhotos, photos };
