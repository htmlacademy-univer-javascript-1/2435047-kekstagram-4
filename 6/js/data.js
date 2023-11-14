import { getRandomIdFromRange } from './util.js';

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

const photoId = getRandomIdFromRange(1, PHOTO_COUNT);
const urlId = getRandomIdFromRange(1, PHOTO_COUNT);
const getDiscription = getRandomIdFromRange(0, DESCRIPTION.length - 1);
const getCountOfLikes = getRandomIdFromRange(Likes.MIN, Likes.MAX);

const commentCount = getRandomIdFromRange(CommentCount.MIN, CommentCount.MAX);
const commentId = getRandomIdFromRange(1, PHOTO_COUNT * CommentCount.MAX);
const avatarId = getRandomIdFromRange(AvatarCount.MIN, AvatarCount.MAX);
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

const getPhoto = () => Array.from({length: PHOTO_COUNT}).map((_, index) => createPhoto(index + 1));

const photos = getPhoto();

export {photos};
