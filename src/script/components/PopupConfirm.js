import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor(popupSelector, submitFunction) {
    super(popupSelector);
    this._submitFunction = submitFunction;
    this._form = this._popupElement.querySelector('.popup__form');
  }

  open(card, elemToDel) {
    this._card = card;
    this._elemToDel = elemToDel;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFunction(this._card, this._elemToDel);
    });
  }
}
