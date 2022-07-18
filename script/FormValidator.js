class FormValidator {
  constructor(object, form) {
    this._formSelector = object.formSelector;
    this._inputSelector = object.inputSelector;
    this._submitButtonSelector = object.submitButtonSelector;
    this._inactiveButtonClass = object.inactiveButtonClass;
    this._inputErrorClass = object.inputErrorClass;
    this._errorClass = object.errorClass;

    this._form = form;
  }

  _showInputError(form, input, errorMessage) {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  };

  _hideInputError(form, input) {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity(form, input) {
    if (!input.validity.valid) {
      this._showInputError(form, input, input.validationMessage);
    } else {
      this._hideInputError(form, input);
    };
  };

  _hasInvalidInput(inputs) {
    return inputs.some((item) => {
      return !item.validity.valid;
    });
  };

  _setEventListeners(form) {
    const inputs = Array.from(form.querySelectorAll(this._inputSelector));
    const submitButton = form.querySelector(this._submitButtonSelector);
    this.toggleSubmitButtonState(inputs, submitButton);
    inputs.forEach((item) => {
      item.addEventListener('input', () => {
        this._checkInputValidity(form, item);
        this.toggleSubmitButtonState(inputs, submitButton);
      });
    });
  };

  toggleSubmitButtonState(inputArray, button) {
    if(this._hasInvalidInput(inputArray)) {
      button.classList.add(this._inactiveButtonClass);
      button.disabled = true;
    } else {
      button.classList.remove(this._inactiveButtonClass);
      button.disabled = false;
    };
  };

  enableValidation() {
    const forms = Array.from(document.querySelectorAll(this._formSelector));
    forms.forEach((item) => {
      item.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });

      this._setEventListeners(item);
    });
  };
}

export default FormValidator;
