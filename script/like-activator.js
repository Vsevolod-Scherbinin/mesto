let likeButton = document.querySelectorAll('.elements__like');

for (let i = 0; i < likeButton.length; i++) {
  likeButton[i].onclick = function() {
    if (likeButton[i].classList.contains('elements__like_activated')) {
      likeButton[i].classList.remove('elements__like_activated');
    } else {
      likeButton[i].classList.add('elements__like_activated');
    };
  };
};

