import { profileId } from "../utils/constants.js";

export default class Card {
  constructor(data, templateSelector, handleCardClick, handleDelete, {handleLike}) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes.length;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDelete = handleDelete;
    this._handleLike = handleLike;
    this._checkLikeCondition = this._data.likes.some((item) => {
      return item._id === profileId;
    })
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.elements__item').cloneNode(true);
    return cardElement;
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _deleteDisable() {
    if(this._ownerId !== profileId) {
      this._element.querySelector('.elements__delete').classList.add('elements__delete_disabled');
    }
  }

  _likeCard(evt) {
    this._handleLike(evt.target);
  }

  counterOfLikes(numberOfLikes) {
    this._likeCounterContainer = this._element.querySelector('.elements__like-counter');
    this._likeCounterContainer.textContent = numberOfLikes;
  }

  _checkLike() {
    if(this._checkLikeCondition) {
      this._element.querySelector('.elements__like').classList.add('elements__like_activated');
    }
  }

  _setEventListeners() {
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._like.addEventListener('click', (evt) => {
      this._likeCard(evt);
    });

    this._deleteBtn.addEventListener('click', () => {
      this._handleDelete(this._data, this._element);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._like = this._element.querySelector('.elements__like');
    this._image = this._element.querySelector('.elements__image');
    this._deleteBtn = this._element.querySelector('.elements__delete');
    this._element.querySelector('.elements__name').textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;

    this._checkLike();
    this._deleteDisable();
    this._setEventListeners();
    this.counterOfLikes(this._likes);

    return this._element;
  }
}
