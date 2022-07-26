import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector, submitFunction) {
    super(selector);
    this._submitFunction = submitFunction;
    this._form = document.querySelector(this._selector).querySelector('.popup__form');
    this._formInputs = Array.from(this._form.querySelectorAll('.popup__input'));
    // this._submitButton = document.querySelector(this._selector).querySelector('.popup__button');
  }

  _getInputValues() {
    this._formValues = {};
    this._formInputs.forEach((item) => {
      this._formValues[item.name] = item.value;
    });
    return this._formValues;
  }

  setInputValues({name, job}){
    this._formInputs[0].value = name;
    this._formInputs[1].value = job;
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

      this._form.reset();
      this.close();
    });
  }
}
