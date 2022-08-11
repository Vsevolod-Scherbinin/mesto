import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor(popupSelector, submitFunction) {
    super(popupSelector);
    this._submitFunction = submitFunction;
    this._form = this._popupElement.querySelector('.popup__form');
    this._submitButton = document.querySelector('.popup__button_type_confirm');
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    this._submitFunction(this._card, this._elemToDel);
  }

  _handleEnterSubmit = (evt) => {
    if(evt.key === 'Enter') {
      this._submitButton.click();
    }
  }

  open(card, elemToDel) {
    this._card = card;
    this._elemToDel = elemToDel;
    document.addEventListener('keydown', this._handleEnterSubmit);
    super.open();
  }

  close() {
    document.removeEventListener('keydown', this._handleEnterSubmit);
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      this._handleSubmit(evt);
    });
  }
}
