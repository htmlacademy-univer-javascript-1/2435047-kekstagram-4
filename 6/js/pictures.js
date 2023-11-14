
const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPhoto = (photo) => {
  const {url, description, likes, comments} = photo;
  const newPhoto = pictureTemplate.cloneNode(true);

  newPhoto.querySelector('.picture__img').src = url;
  newPhoto.querySelector('.picture__img').alt = description;
  newPhoto.querySelector('.picture__comments') = comments;
  newPhoto.querySelector('.picture__likes') = likes;

  return newPhoto;
};

const renderPhotos = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    fragment.appendChild(renderPhoto(photo));
  });

  pictures.appendChild(fragment);
};

export {renderPhotos};
