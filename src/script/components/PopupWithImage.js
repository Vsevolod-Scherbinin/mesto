import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._image = this._popupElement.querySelector('.popup__image');
    this._imageName = this._popupElement.querySelector('.popup__image-name');
  }

  open(name, link) {
    this._imageName.textContent = name;
    this._image.src = link;
    this._image.alt = name;

    super.open();
  }
}
