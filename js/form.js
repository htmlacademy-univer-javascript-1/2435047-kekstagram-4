import { isEscapeKey } from './util.js';
import { onFilterButtonChange, effectList, sliderWrapper } from './effects.js';
import { uploadData } from './api.js';
import { buttonAdjustment } from './hashtags-pristine.js';

const Zoom = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

const body = document.querySelector('body');
const formUpload = body.querySelector('.img-upload__form');
const overlay = formUpload.querySelector('.img-upload__overlay');
const fileUpload = formUpload.querySelector('#upload-file');
const formUploadClose = formUpload.querySelector('#upload-cancel');
const scaleButtonSmaller = formUpload.querySelector('.scale__control--smaller');
const scaleButtonBigger = formUpload.querySelector('.scale__control--bigger');
const scaleButtonValue = formUpload.querySelector('.scale__control--value');
const imagePreview = formUpload.querySelector('.img-upload__preview img');
const imagesEffectPreview = formUpload.querySelectorAll('.effects__preview');
const errorMessage = body.querySelector('#error').content.querySelector('.error');
const successMessage = body.querySelector('#success').content.querySelector('.success');

const closeForm = () => {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  effectList.removeEventListener('change', onFilterButtonChange);

  imagePreview.style.transform = '';
  imagePreview.className = 'img-upload__preview';
  imagePreview.style.filter = '';

  formUpload.reset();
};

const onCloseFormEscKeyDown = (evt) => {
  if (isEscapeKey(evt) &&
      !evt.target.classList.contains('text__hashtags') &&
      !evt.target.classList.contains('text__description')
  ) {
    evt.preventDefault();
    closeForm();

    document.removeEventListener('keydown', onCloseFormEscKeyDown);
  }
};

const changeImages = () => {
  const file = fileUpload.files[0];
  const fileUrl = URL.createObjectURL(file);

  imagePreview.src = fileUrl;

  for (const imageEffectPreview of imagesEffectPreview) {
    imageEffectPreview.style.backgroundImage = `url(${fileUrl})`;
  }
};

const onFileUploadChange = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');

  changeImages();

  document.addEventListener('keydown', onCloseFormEscKeyDown);
  sliderWrapper.classList.add('hidden');
  effectList.addEventListener('change', onFilterButtonChange);

  buttonAdjustment();
};

fileUpload.addEventListener('change', onFileUploadChange);

formUploadClose.addEventListener('click', () => {
  closeForm();
});

const changeZoom = (coefficient) => {
  const size = parseInt(scaleButtonValue.value, 10) + coefficient * Zoom.STEP;

  scaleButtonValue.value = `${size}%`;
  imagePreview.style.transform = `scale(${size / 100})`;
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

const closePopup = () => {
  const popup = document.querySelector('.error') || document.querySelector('.success');
  popup.remove();
};

const onEscKeyDown = (evt) => {
  if(isEscapeKey(evt)) {
    closePopup();
  }
};

const onErrorEscapeDown = (evt) => {
  if(isEscapeKey(evt)) {
    document.removeEventListener('keydown', onErrorEscapeDown);

    errorMessage.classList.add('hidden');

    document.addEventListener('keydown', onCloseFormEscKeyDown);
  }
};

const onPopupClick = (evt) => {
  if (!evt.target.classList.contains('success__inner') && !evt.target.classList.contains('error__inner')) {
    evt.preventDefault();
    closePopup();
    document.removeEventListener('keydown', onEscKeyDown);
  }
};

const showMessage = (message) => {
  message.addEventListener('click', onPopupClick);
  document.body.appendChild(message);
  document.addEventListener('keydown', onEscKeyDown, {once: true});
};

const showErrorMessage = () => {
  const messageFragment = errorMessage.cloneNode(true);
  messageFragment.classList.remove('hidden');

  document.removeEventListener('keydown', onCloseFormEscKeyDown);
  document.addEventListener('keydown', onErrorEscapeDown);

  showMessage(messageFragment);
};

const showSuccessMessage = () => {
  const messageFragment = successMessage.cloneNode(true);
  showMessage(messageFragment);
};

const onSuccess = () => {
  closeForm();
  showSuccessMessage();
};

const onError = () => {
  showErrorMessage();
};

const onFromUploadSubmit = (evt) => {
  evt.preventDefault();
  uploadData(onSuccess, onError, 'POST', new FormData(evt.target));
};

formUpload.addEventListener('submit', onFromUploadSubmit);
