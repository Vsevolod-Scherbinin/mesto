import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  open(name, link) {
    super.open();

    this._element.querySelector('.popup__image-name').textContent = name;
    this._element.querySelector('.popup__image').src = link;
    this._element.querySelector('.popup__image').alt = name;
  }
}
