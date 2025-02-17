import {getRandomInteger, getRandomElement} from './util.js';

const PHOTO_COUNT = 25;

const NAMES = [
  'Евгений',
  'Алексей',
  'Алёна',
  'Саша',
  'Надежда',
  'Вера',
  'Никита',
  'Любовь',
  'Дмитрий',
  'Тимур'
];

const DESCRIPTION = [
  'Пейзаж горного озера',
  'Лучи света в воде',
  'Туристы на переднем плане',
  'Заснеженные вершины гор',
  'Атмосфера спокойствия',
  'Источник вдохновения',
  'Ценить и беречь природу',
  'Источник вдохновения',
  'Чувство умиротворения'
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const Like = {
  MIN: 15,
  MAX: 200
};

const Comments = {
  MIN: 0,
  MAX: 30
};

const SvgCount = {
  MIN: 1,
  MAX: 6
};

const photos = [];

const addComment = () => {
  const feedback = [];
  for(let i = 0; i < getRandomInteger(Comments.MIN, Comments.MAX); i++){
    feedback.push(
      {
        id: i,
        avatar: `img/avatar-${ getRandomInteger(SvgCount.MIN, SvgCount.MAX)}.svg`,
        message: getRandomElement(COMMENTS),
        name: getRandomElement(NAMES)
      }
    );
  }
  return feedback;
};

const addPhoto = () => {
  for(let i = 1; i <= PHOTO_COUNT; i++){
    photos.push({
      id: i,
      url: `photos/${i}.jpg`,
      description: getRandomElement(DESCRIPTION),
      likes: getRandomInteger(Like.MIN, Like.MAX),
      comments: addComment()
    });
  }
  return photos;
};

export {addPhoto};
