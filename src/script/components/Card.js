// import PopupWithImage from './PopupWithImage.js';

export default class Card {
  constructor({name, link}, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.children[0].cloneNode(true);
    return cardElement;
  }

  _likeCard() {
    this._element.querySelector('.elements__like').classList.toggle('elements__like_activated');
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    // this._element.querySelector('.elements__image').addEventListener('click', () => {
    //   const popupImage = new PopupWithImage('.popup_type_image');
    //   popupImage.open(this._name, this._link);
    // });
    const name = this._name;
    const link = this._link;
    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._handleCardClick({name, link});
    });

    this._element.querySelector('.elements__like').addEventListener('click', () => {
      this._likeCard();
    });

    this._element.querySelector('.elements__delete').addEventListener('click', () => {
      this._deleteCard();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.elements__name').textContent = this._name;
    const image = this._element.querySelector('.elements__image');
    image.src = this._link;
    image.alt = this._name;

    return this._element;
  }
}
