import { getRandomInteger } from './util.js';

const PHOTO_COUNT = 25;

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

const CommentCount = {
  MIN: 0,
  MAX: 30
};

const AvatarCount = {
  MIN: 1,
  MAX: 6
};

const Likes = {
  MIN: 15,
  MAX: 200
};

const createComment = (id) => ({
  id: id,
  avatar: `img/avatar-${getRandomInteger(AvatarCount.MIN, AvatarCount.MAX)}.svg`,
  message: MESSAGES_FOR_COMMENTS[getRandomInteger(0, MESSAGES_FOR_COMMENTS.length - 1)],
  name: NAME_COMMENTATOS[getRandomInteger(0, NAME_COMMENTATOS.length - 1)]
});

const createPhoto = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: DESCRIPTION[getRandomInteger(0, DESCRIPTION.length - 1)],
  likes: getRandomInteger(Likes.MIN, Likes.MAX),
  comments: Array.from({length: getRandomInteger(CommentCount.MIN, CommentCount.MAX)}, (_, index) => createComment(index + 1))
});

const photos = Array.from({length: PHOTO_COUNT}, (_, index) => createPhoto(index + 1));

export {photos};
