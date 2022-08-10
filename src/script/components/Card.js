export default class Card {
  constructor(data, templateSelector, popupImage, popupDeleteCard, profileId, api) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes.length;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._profileId = profileId;
    this._api = api;
    this._templateSelector = templateSelector;
    this._popupImage = popupImage;
    this._popupDeleteCard = popupDeleteCard;
    this._checkLikesCondition = this._data.likes.some((item) => {
      return item._id === this._profileId;
    })
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.elements__item').cloneNode(true);
    return cardElement;
  }

  _handleCardClick(name, link) {
    this._popupImage.open(name, link);
  }

// Delete-Start
  _handleDelete(card, elemToDel) {
    this._popupDeleteCard.open(card, elemToDel);
    // this._popupDeleteCard.setEventListeners(card);
  }

  _deleteDisable() {
    if(this._ownerId !== this._profileId) {
      this._element.querySelector('.elements__delete').classList.add('elements__delete_disabled');
    }
  }

  deleteCard(elem) {
    elem.remove();
    elem = null;
  }
  // Delete-End

  // Like-Start
  _counterOfLikes(numberOfLikes) {
    this._likeCounterContainer = this._element.querySelector('.elements__like-counter');
    this._likeCounterContainer.textContent = numberOfLikes;
  }

  _handleLike() {
    if(this._like.classList.contains('elements__like_activated')) {
      this._api.deleteLike(this._data)
        .then((res) => {
          !this._counterOfLikes(res.likes.length);
          this._like.classList.remove('elements__like_activated');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this._api.putLike(this._data)
        .then((res) => {
          !this._counterOfLikes(res.likes.length);
          this._like.classList.add('elements__like_activated');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  _checkLikes() {
    if(this._checkLikesCondition) {
      this._like.classList.add('elements__like_activated');
    }
  }
  // Like-End

  _setEventListeners() {
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._deleteBtn.addEventListener('click', () => {
      this._handleDelete(this._data, this._element);
    });

    this._like.addEventListener('click', () => {
      this._handleLike();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.elements__image');
    this._element.querySelector('.elements__name').textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;
    this._deleteBtn = this._element.querySelector('.elements__delete');
    this._like = this._element.querySelector('.elements__like');

    this._deleteDisable();
    this._checkLikes();
    this._counterOfLikes(this._likes);
    this._setEventListeners();

    return this._element;
  }
}
