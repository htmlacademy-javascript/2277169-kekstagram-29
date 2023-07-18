import { isEscapeKey} from './utils.js';

const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadInput = document.querySelector('.img-upload__input');
const bodyElement = document.querySelector('body');
const uploadCancel = document.querySelector('.img-upload__cancel');
const textHashtags = uploadOverlay.querySelector('.text__hashtags');
const textDescription = uploadOverlay.querySelector('.text__description');
const uploadForm = document.querySelector('.img-upload__form');
const redexp = /^#[a-zа-яё0-9]{1,19}$/i;

window.console.log(redexp);

const closeModal = () => {
  uploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('.modal-open');

  uploadInput.value = ''; // сбрасывает значение поля выбора файла ??

  document.removeEventListener('keydown', onDocumentKeydown);
  textHashtags.removeEventListener('keydown', onFormFieldKeydown);
  textDescription.removeEventListener('keydown', onFormFieldKeydown);
};

const openModal = () => {
  uploadOverlay.classList.remove('hidden');
  bodyElement.classList.add('.modal-open');
  uploadCancel.addEventListener('click', closeModal);
  document.addEventListener('keydown', onDocumentKeydown);


  textHashtags.addEventListener('keydown', onFormFieldKeydown);
  textDescription.addEventListener('keydown', onFormFieldKeydown);
};

function onFormFieldKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

const pristine = new Pristine (uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'error',
});

function onUploadFormSubmit(evt) {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    window.console.log('Можно отправлять');
  } else {
    window.console.log('Форма невалидна');
  }
}

uploadForm.addEventListener('submit', onUploadFormSubmit);

uploadInput.addEventListener('change', openModal);
