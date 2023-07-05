import {similarPhotos} from './data.js';

const picturesContainer = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();
const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');

const display = similarPhotos();

display.forEach(({url, description, likes, comments}) => {
  const element = picturesTemplate.cloneNode(true);
  element.querySelector('.picture__img').src = url;
  element.querySelector('.picture__comments').textContent = comments.length;
  element.querySelector('.picture__img').alt = description;
  element.querySelector('.picture__likes').textContent = likes;
  fragment.appendChild(element);
});

picturesContainer.appendChild(fragment);
