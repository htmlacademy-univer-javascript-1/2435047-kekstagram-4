const PHOTO_COUNT = 25;
const COMMENT_COUNT = 30;
const AVATAR_COUNT = 6;

const likes = {
  MIN: 15,
  MAX: 200
};

const MESSAGES_FOR_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAME_COMMENTATOS = [
  'Андрей',
  'Николай',
  'Алексей',
  'Александра',
  'Ольга'
];

const DESCRIPTION = [
  'Сегодня нашел такую фотку в галерее...',
  'Смешной прикольчик',
  'Хороший был день',
  'Сегодня заработал 100 рублей',
  'А как проходит ваш день?'
];


const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomIdFromRange = (min, max) => {
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
};

const photoId = getRandomIdFromRange(1, PHOTO_COUNT);
const urlId = getRandomIdFromRange(1, PHOTO_COUNT);
const getDiscription = getRandomIdFromRange(0, DESCRIPTION.length - 1);
const getCountOfLikes = getRandomIdFromRange(likes.MIN, likes.MAX);

const commentCount = getRandomIdFromRange(0, COMMENT_COUNT);
const commentId = getRandomIdFromRange(1, PHOTO_COUNT * COMMENT_COUNT);
const avatarId = getRandomIdFromRange(1, AVATAR_COUNT);
const getCommetnId = getRandomIdFromRange(0,MESSAGES_FOR_COMMENTS.length - 1);
const getNameCommentorId = getRandomIdFromRange(0, NAME_COMMENTATOS.length - 1);

const createComment = () => ({
  id: commentId(),
  avatar: `img/avatar-${avatarId()}.svg`,
  message: MESSAGES_FOR_COMMENTS[getCommetnId()],
  name: NAME_COMMENTATOS[getNameCommentorId()]
});

const commentArray = Array.from({length: commentCount}, createComment());

const createPhoto = () => ({
  id: photoId(),
  url: `photos/${urlId()}.jpg`,
  description: DESCRIPTION[getDiscription()],
  likes: getCountOfLikes(),
  comments: commentArray
});

const photosArray = Array.from({length: PHOTO_COUNT}, createPhoto);

const getPhotos = (photos) => photos;

getPhotos(photosArray);
