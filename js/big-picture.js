import { data } from './data.js';

const COMMENTS_IN_SECTION = 5;

const picturesContainer = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const socialComments = bigPicture.querySelector('.social__comments');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

let step = 1;


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

function renderComments(comments) {
  socialComments.innerHTML = comments.map((el) => createComment(el)).join('');
}

function reviewComments(shownComments, allСomments) {
  commentCount.innerHTML = `${shownComments} из ${allСomments} комментариев`;

  if (shownComments === allСomments) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
}

const onCommentsLoaderClick = () => {

  step = step + 1;
  const comments = JSON.parse(bigPicture.dataset.comments);
  const restComments = comments.slice(0, step * COMMENTS_IN_SECTION);
  renderComments(restComments);
  reviewComments(restComments.length, comments.length);
};

function fillBigPicture({url, description, likes, comments}) {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.dataset.comments = JSON.stringify(comments);

  step = 1;
  const commentsShown = comments.slice(0, COMMENTS_IN_SECTION);

  renderComments(commentsShown);
  reviewComments(commentsShown.length, comments.length);

  commentsLoader.addEventListener('click', onCommentsLoaderClick);
}


function onPicturesContainerClick(evt) {
  const cardId = evt.target.closest('.picture').dataset.id;
  const pictureData = data.find((element) => element.id === Number(cardId));

  fillBigPicture(pictureData);
}

picturesContainer.addEventListener('click', onPicturesContainerClick);
