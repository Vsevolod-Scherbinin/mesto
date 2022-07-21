import {openPopup} from './commonFunctions.js';

const popupCard = document.querySelector('.popup_type_image');


// М.б. надо добавить отдельный метод закрытия по Esc
class Card {
  constructor(object, templateSelector) {
    this._name = object.name;
    this._link = object.link;
    this._templateSelector = templateSelector;
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

  _showImage() {
    popupCard.querySelector('.popup__image-name').textContent = this._name;
    popupCard.querySelector('.popup__image').src = this._link;
    popupCard.querySelector('.popup__image').alt = this._name;
  }

  _setEventListeners() {
    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._showImage();
      openPopup(popupCard);
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

export default Card;
