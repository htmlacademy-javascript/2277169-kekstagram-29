import { data } from './data.js';

const picturesContainer = document.querySelector('.pictures');

function createComment({avatar, name, message}) {
  return `<li class="social__comment">
    <img
        class="social__picture"
        src="${avatar}"
        alt="${name}"
        width="35" height="35">
    <p class="social__text">${message}</p>
</li>`;
}

function fillBigPicture({url, description, likes, comments}) {
  const bigPicture = document.querySelector('.big-picture');

  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__comments').innerHTML = comments.map((el) => createComment(el)).join('');
  bigPicture.querySelector('.social__caption').textContent = description;
}

function onPicturesContainerClick(evt) {
  const cardId = evt.target.closest('.picture').dataset.id;
  const pictureData = data.find((element) => element.id === Number(cardId));

  fillBigPicture(pictureData);
}

picturesContainer.addEventListener('click', onPicturesContainerClick);

