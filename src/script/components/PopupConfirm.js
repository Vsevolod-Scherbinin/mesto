import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor(popupSelector, submitFunction) {
    super(popupSelector);
    this._submitFunction = submitFunction;
    this._form = this._popupElement.querySelector('.popup__form');
  }

  open(elemToDel) {
    super.open();
    this._elemToDel = elemToDel;
  }

  setEventListeners(elem) {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFunction(elem, this._elemToDel);
    });
  }
}
