import {getRandomInteger, getRandomElement} from './utils.js';

const PHOTOS_COUNT = 25;

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

const DESCRIPTIONS = [
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

const Likes = {
  MIN: 15,
  MAX: 200
};

const Comments = {
  MIN: 0,
  MAX: 30
};

const AvatarIds = {
  MIN: 1,
  MAX: 6
};

const photos = [];

const createComment = (id) => ({
  id: id,
  avatar: `img/avatar-${ getRandomInteger(AvatarIds.MIN, AvatarIds.MAX)}.svg`,
  message: getRandomElement(COMMENTS),
  name: getRandomElement(NAMES)
});

const addComment = () => {
  const feedback = [];
  const commentCount = getRandomInteger(Comments.MIN, Comments.MAX);

  for (let i = 0; i < commentCount; i++) {
    feedback.push(createComment(i));
  }

  return feedback;
};


const addPhoto = () => {
  for(let i = 1; i <= PHOTOS_COUNT; i++){
    photos.push({
      id: i,
      url: `photos/${i}.jpg`,
      description: getRandomElement(DESCRIPTIONS),
      likes: getRandomInteger(Likes.MIN, Likes.MAX),
      comments: addComment()
    });
  }
  return photos;
};

export {addPhoto, photos};
