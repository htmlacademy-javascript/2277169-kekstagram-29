import { isEscapeKey } from './utils.js';
import { resetScale } from './scale.js';
import { sendData } from './api.js';
import { showMessage } from './message.js';

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ErrorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  INVALID_PATTERN: 'Неправильный хэштег',
};

const bodyElement = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const uploadOverlay = form.querySelector('.img-upload__overlay');
const uploadInput = form.querySelector('.img-upload__input');
const uploadCancel = form.querySelector('.img-upload__cancel');
const textHashtags = form.querySelector('.text__hashtags');
const textDescription = form.querySelector('.text__description');
const uploadSubmit = document.querySelector('.img-upload__submit');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const closeModal = () => {
  form.reset();
  resetScale();
  pristine.reset();

  uploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('.modal-open');

  uploadInput.value = ''; // сбрасывает значение поля выбора файла

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

function blockUploadSubmit() {
  uploadSubmit.disabled = true;
}

function unblockUploadSubmit() {
  uploadSubmit.disabled = false;
}

const normalizeTags = (tagString) => tagString.trim().split(' ').filter((tag) => Boolean(tag.length));

const hasValidTags = (value) => normalizeTags(value).every((tag) => VALID_SYMBOLS.test(tag));

const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
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

const uploadFormData = async () => {
  try {
    const formData = new FormData(form);
    blockUploadSubmit();
    await sendData(formData);
    unblockUploadSubmit();
    showMessage('success');
    closeModal();
  } catch {
    showMessage('error');
  }
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  if (!pristine.validate()) {
    return;
  }
  uploadFormData();
};

pristine.addValidator(textHashtags, hasValidCount, ErrorText.INVALID_COUNT,3,true);
pristine.addValidator(textHashtags, hasUniqueTags, ErrorText.NOT_UNIQUE,1,true);
pristine.addValidator(textHashtags, hasValidTags, ErrorText.INVALID_PATTERN,2,true);

form.addEventListener('submit', onUploadFormSubmit);
uploadInput.addEventListener('change', openModal);
