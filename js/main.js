// Необходимое количество сгенерированных объектов

const SIMILAR_PHOTOS_COUNT = 25;
const SIMILAR_COMMENT_COUNT = 30;

// Функция-генератор для получения случайных идентификаторов из указанного диапазона

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const generatePhotoId = createRandomIdFromRangeGenerator(1, 25);
const generateCommentId = createRandomIdFromRangeGenerator(1, 30);

// Функция-генератор для получения уникальных идентификаторов

function createIdGenerator () {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

const generatePhotoUrl = createIdGenerator();

// Описание фотографий

const DESCRIPTIONS = [
  'Да, да! В это зеркало я буду фоткаться до тех пор, пока не состарюсь.',
  'Чтобы достичь новых берегов, мы должны плыть, а не дрейфовать.',
  'Икона стиля районного масштаба.',
  'Водка может и не быть ответом, но попробовать стоит.',
  'С прекрасной девушкой приходят большие расходы.',
  'Я иду медленно, но не назад.'
];

// Текст комментариев

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!',
];

// Имена авторов

const NAMES = [
  'Ибрагим',
  'Олег',
  'Зинаида',
  'Всеволод',
  'Анджела',
  'Дина'
];

const comment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: MESSAGES[getRandomInteger(0, DESCRIPTIONS.length - 1)],
  name: NAMES[getRandomInteger(0, DESCRIPTIONS.length - 1)]
});

const createPhotos = () => ({
  id: generatePhotoId(),
  url: `photos/${generatePhotoUrl()}.jpg`,
  description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: SIMILAR_COMMENT_COUNT}, comment)
});

const similarPhotos = Array.from({length: SIMILAR_PHOTOS_COUNT}, createPhotos);

window.console.log(similarPhotos);
