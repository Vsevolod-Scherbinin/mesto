class FormValidator {
  constructor(object, form) {
    this._formSelector = object.formSelector;
    this._inputSelector = object.inputSelector;
    this._submitButtonSelector = object.submitButtonSelector;
    this._inactiveButtonClass = object.inactiveButtonClass;
    this._inputErrorClass = object.inputErrorClass;
    this._errorClass = object.errorClass;

    this._form = form;
    this._inputs = Array.from(form.querySelectorAll(this._inputSelector));
    this._submitButton = form.querySelector(this._submitButtonSelector);
  }

  _showInputError(input, errorMessage) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  };

  _hideInputError(input) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    };
  };

  _hasInvalidInput() {
    return this._inputs.some((item) => {
      return !item.validity.valid;
    });
  };

  _setEventListeners() {
    this.toggleSubmitButtonState();
    this._inputs.forEach((item) => {
      item.addEventListener('input', () => {
        this._checkInputValidity(item);
        this.toggleSubmitButtonState();
      });
    });
  };

  toggleSubmitButtonState() {
    if(this._hasInvalidInput()) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    };
  };

  enableValidation() {
    this._setEventListeners();
  };
}

export default FormValidator;
