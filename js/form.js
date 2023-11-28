import { closeOnEscKeyDown } from './util.js';

const Zoom = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

const body = document.body;
const imgUploadInput = body.querySelector('.img-upload__input');
const imgUploadOverlay = body.querySelector('.img-upload__overlay');
const closeOverlayButton = imgUploadOverlay.querySelector('.img-upload__cancel');
const scaleButtonSmaller = body.querySelector('.scale__control--smaller');
const scaleButtonBigger = body.querySelector('.scale__control--bigger');
const scaleButtonValue = body.querySelector('.scale__control--value');
const imgUploadPreview = body.querySelector('.img-upload__preview');

const changeZoom = (coefficient) => {
  const size = parseInt(scaleButtonValue.value, 10) + coefficient * Zoom.STEP;

  scaleButtonValue.value = `${size}%`;
  imgUploadPreview.style.transform = `scale(${size / 100})`;
};

scaleButtonSmaller.addEventListener('click', (evt) => {
  evt.preventDefault();

  const coefficient = -1;

  if (parseInt(scaleButtonValue.value, 10) > Zoom.MIN) {
    changeZoom(coefficient);
  }
});

scaleButtonBigger.addEventListener('click', (evt) => {
  evt.preventDefault();

  const coefficient = 1;

  if (parseInt(scaleButtonValue.value, 10) < Zoom.MAX) {
    changeZoom(coefficient);
  }
});

const closeImgUploadOverlay = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
};

const openImgUploadOverlay = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  imgUploadOverlay.addEventListener('keydown', (evt) => {
    if (!evt.target.classList.contains('text__hashtags') &&
     !evt.target.classList.contains('text__description')) {
      closeOnEscKeyDown(evt, closeImgUploadOverlay);
    }
  });
};

closeOverlayButton.addEventListener('click', closeImgUploadOverlay);
imgUploadInput.addEventListener('change', openImgUploadOverlay);
