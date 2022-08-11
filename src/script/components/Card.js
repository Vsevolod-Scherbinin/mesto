export default class Card {
  constructor(data, templateSelector, popupImage, popupDeleteCard, handlePutLike, handleDeleteLike, profileId) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes.length;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._profileId = profileId;
    this._templateSelector = templateSelector;
    this._popupImage = popupImage;
    this._popupDeleteCard = popupDeleteCard;
    this._handlePutLike = handlePutLike;
    this._handleDeleteLike = handleDeleteLike;
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
  counterOfLikes(numberOfLikes) {
    this._likeCounterContainer = this._element.querySelector('.elements__like-counter');
    this._likeCounterContainer.textContent = numberOfLikes;
  }

  putLike() {
    this._like.classList.add('elements__like_activated');
  }

  deleteLike() {
    this._like.classList.remove('elements__like_activated');
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
      if(this._like.classList.contains('elements__like_activated')) {
        this._handleDeleteLike(this._data);
      } else {
        this._handlePutLike(this._data);
      }
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
    this.counterOfLikes(this._likes);
    this._setEventListeners();

    return this._element;
  }
}
