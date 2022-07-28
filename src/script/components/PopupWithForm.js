import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFunction) {
    super(popupSelector);
    this._submitFunction = submitFunction;
    this._form = this._popupElement.querySelector('.popup__form');
    this._formInputs = Array.from(this._form.querySelectorAll('.popup__input'));
  }

  _getInputValues() {
    this._formValues = {};
    this._formInputs.forEach((item) => {
      this._formValues[item.name] = item.value;
    });
    return this._formValues;
  }

  setInputValues(data){
    this._formInputs.forEach((item) => {
      item.value = data[item.name];
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFunction(this._getInputValues());

      this.close();
    });
  }
}
