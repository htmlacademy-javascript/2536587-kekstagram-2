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

const like = {
  MIN: 15,
  MAX: 200
};

const comments = {
  MIN: 0,
  MAX: 30
};

const svgCount = {
  MIN: 1,
  MAX: 6
};

const photos = [];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const addComment = () => {
  const feedback = [];
  for(let i = 0; i < getRandomInteger(comments.MIN, comments.MAX); i++){
    feedback.push(
      {
        id: i,
        avatar: `img/avatar-${ getRandomInteger(svgCount.MIN, svgCount.MAX)}.svg`,
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
      likes: getRandomInteger(like.MIN, like.MAX),
      comments: addComment()
    });
  }
  return photos;
};

window.console.log(addPhoto());
