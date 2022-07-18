const popupCard = document.querySelector('.popup_type_image');
const popupImgClsBtn = popupCard.querySelector('.popup__close-button');

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
  }

  _closePopup() {
    popupCard.querySelector('.popup__image-name').textContent = '';
    popupCard.querySelector('.popup__image').src = '';
    popupCard.classList.remove('popup_open');
    document.removeEventListener('keydown', (evt) => {
      this._closePopupByEsc(evt);
    });
  }

  _closePopupByEsc(evt) {
    const popupCardOpened = document.querySelector('.popup_open');
    if(popupCardOpened && evt.key === 'Escape') {
      this._closePopup();
    };
  }

  _openPopup() {
    popupCard.querySelector('.popup__image-name').textContent = this._name;
    popupCard.querySelector('.popup__image').src = this._link;
    popupCard.classList.add('popup_open');
    document.addEventListener('keydown', (evt) => {
      this._closePopupByEsc(evt);
    });
  }

  _setEventListeners() {
    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._openPopup();
    });

    popupImgClsBtn.addEventListener('click', () => {
      this._closePopup();
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
    this._element.querySelector('.elements__image').src = this._link;
    this._element.querySelector('.elements__image').alt = this._name;

    return this._element;
  }
}

export default Card;
