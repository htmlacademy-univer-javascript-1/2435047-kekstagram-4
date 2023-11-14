const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPhoto = (photo) => {
  const {url,  likes, comments, description} = photo;
  const newPhoto = pictureTemplate.cloneNode(true);

  newPhoto.querySelector('.picture__img').src = url;
  newPhoto.querySelector('.picture__img').alt = description;
  newPhoto.querySelector('.picture__likes').textContent = likes;
  newPhoto.querySelector('.picture__comments').textContent = comments.length;

  return newPhoto;
};

const renderPhotos = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    fragment.append(renderPhoto(photo));
  });

  pictures.append(fragment);
};

export {renderPhotos};
