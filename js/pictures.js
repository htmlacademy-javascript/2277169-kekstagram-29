import { debounce } from './utils.js';

const picturesContainer = document.querySelector('.pictures');
const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createCard = (({id, url, description, likes, comments}) => {
  const card = picturesTemplate.cloneNode(true);
  card.dataset.id = id;
  card.querySelector('.picture__img').src = url;
  card.querySelector('.picture__comments').textContent = comments.length;
  card.querySelector('.picture__img').alt = description;
  card.querySelector('.picture__likes').textContent = likes;

  return card;
});

function resetPhotos() {
  const pictures = picturesContainer.querySelectorAll('.picture');
  pictures.forEach((picture)=> {
    picture.remove();
  });
}

const renderPictures = (pictures) => {
  resetPhotos();
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const card = createCard(picture);
    fragment.appendChild(card);
  });
  picturesContainer.appendChild(fragment);
};

const renderPicturesWithDebounce = debounce(renderPictures);

export { renderPictures, renderPicturesWithDebounce };
