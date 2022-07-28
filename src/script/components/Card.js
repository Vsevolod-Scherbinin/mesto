// import PopupWithImage from './PopupWithImage.js';

export default class Card {
  constructor({name, link}, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.cloneNode(true);
    return cardElement;
  }

  _likeCard() {
    this._like.classList.toggle('elements__like_activated');
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {

    this._image.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._like.addEventListener('click', () => {
      this._likeCard();
    });

    this._deleteBtn.addEventListener('click', () => {
      this._deleteCard();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._like = this._element.querySelector('.elements__like');
    this._image = this._element.querySelector('.elements__image');
    this._deleteBtn = this._element.querySelector('.elements__delete');
    this._setEventListeners();

    this._element.querySelector('.elements__name').textContent = this._name;
    const image = this._element.querySelector('.elements__image');
    image.src = this._link;
    image.alt = this._name;

    return this._element;
  }
}
