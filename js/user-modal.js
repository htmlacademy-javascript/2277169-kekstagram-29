import './pictures.js';
import { isEscapeKey} from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const picturesContainer = document.querySelector('.pictures');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const onBigPictureCloseClick = () => {
  closeBigPicture();
};

function openBigPicture() {
  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
  bigPictureClose.addEventListener('click', onBigPictureCloseClick);
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');

  document.querySelector('body').classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  bigPictureClose.removeEventListener('click', onBigPictureCloseClick);
}

const onPicturesContainerClick = (evt) => {
  if (evt.target.closest('.picture')) {
    openBigPicture();
  }
};

picturesContainer.addEventListener('click', onPicturesContainerClick);
