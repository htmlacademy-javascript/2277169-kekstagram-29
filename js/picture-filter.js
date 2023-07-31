import { data } from './load.js';
import { renderPicturesWithDebounce } from './pictures.js';

const NUMBER_OF_RANDOM_PHOTOS = 10;

const imageFilter = document.querySelector('.img-filters');
const imageFilterButton = imageFilter.querySelector('.img-filters__form');

const filterDefaultButton = document.querySelector('#filter-default');
const filterRandomButton = document.querySelector('#filter-random');
const filterDiscussedButton = document.querySelector('#filter-discussed');

// Функция отбора 10 случайных не повторяющихся карточек
function getRandomPhotos(arr) {
  for (let i = 0 ; (i < NUMBER_OF_RANDOM_PHOTOS) && (i < arr.length) ; i++) {
    const r = Math.floor(Math.random() * (arr.length - i)) + i;
    const photo = arr[r];
    arr[r] = arr[i];
    arr[i] = photo;
  }
  return arr.slice(0, NUMBER_OF_RANDOM_PHOTOS);
}

// Функция сортировки карточек в порядке убывания по кол-ву ком-ев
function getDiscussedPhotosFirst (arr) {
  return arr.sort((a, b) => b.comments.length - a.comments.length);
}

// Функция выбора нужного фильтра с параметрами
function getFilterData (id) {
  const idToFilter = {
    'filter-default': data,
    'filter-random': getRandomPhotos([...data]),
    'filter-discussed': getDiscussedPhotosFirst ([...data])
  };
  return idToFilter[id];
}
// Функция переключения активного фильтра
function setActiveFilterButton (evt) {
  imageFilterButton.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
}

// Функция переключения фильтров
function onFilterClick(evt) {
  const pictures = getFilterData(evt.target.id);
  setActiveFilterButton(evt); // переключаемся на выбранный фильтр
  renderPicturesWithDebounce(pictures); // отрисовываем карточки, удовлетворяющие фильтру
}

function initializeFilters() {
  imageFilter.classList.remove('img-filters--inactive');

  filterDefaultButton.addEventListener('click', onFilterClick);
  filterRandomButton.addEventListener('click', onFilterClick);
  filterDiscussedButton.addEventListener('click', onFilterClick);
}

export { initializeFilters };
