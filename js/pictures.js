import { showBigPicture } from './big-picture.js';


const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const fragment = document.createDocumentFragment();

const renderPhoto = (picture) => {
  const {url,  likes, comments, description} = picture;
  const newPhoto = pictureTemplate.cloneNode(true);

  newPhoto.querySelector('.picture__img').src = url;
  newPhoto.querySelector('.picture__img').alt = description;
  newPhoto.querySelector('.picture__likes').textContent = likes;
  newPhoto.querySelector('.picture__comments').textContent = comments.length;

  const onNewPhotoClick = (evt) => {
    evt.preventDefault();

    showBigPicture(picture);
  };

  newPhoto.addEventListener('click', onNewPhotoClick);

  return newPhoto;
};

const renderPhotos = (photos) => {
  photos.forEach((photo) => {
    fragment.appendChild(renderPhoto(photo));
  });

  pictures.appendChild(fragment);
};

const removePhotos = () => {
  const photos = document.querySelectorAll('.picture');
  photos.forEach((picture) => picture.remove());
};


export {renderPhotos, removePhotos};
