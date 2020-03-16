import axios from 'axios';

const addCommentForm = document.getElementById('jsAddComment');
const commentList = document.getElementById('jsCommentList');
const commentNumber = document.getElementById('jsCommentNumber');

const increaseNumber = () => {
  commentNumber.innerText = parseInt(commentNumber.innerHTML, 10) + 1;
};

const decreaseNumber = () => {
  commentNumber.innerText = parseInt(commentNumber.innerHTML, 10) - 1;
};

const addComment = (comment, id) => {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const input = document.createElement('input');

  input.setAttribute('type', 'submit');
  input.setAttribute('value', 'delete');
  input.setAttribute('id', id);

  span.innerHTML = comment;
  li.appendChild(span);
  li.appendChild(input);
  commentList.prepend(li);

  const handleDeleteClick = async () => {
    const response = await axios({
      url: `/api/${id}/comment`,
      method: 'DELETE'
    });

    if (response.status === 200) {
      li.remove();
      decreaseNumber();
    }
  };
  input.addEventListener('click', handleDeleteClick);
  increaseNumber();
};

async function sendComment(comment) {
  const videoId = window.location.href.split('/videos/')[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: 'POST',
    data: {
      comment
    }
  });
  if (response.status === 200) {
    const {
      data: { id }
    } = response;
    addComment(comment, id);
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector('input');
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = '';
}

function init() {
  addCommentForm.addEventListener('submit', handleSubmit);
}

if (addCommentForm) {
  init();
}
