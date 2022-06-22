function showInputError(form, input, errorMessage, obj) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.add(obj.inputErrorClass);
  errorElement.classList.add(obj.errorClass);
  errorElement.textContent = errorMessage;
};

function hideInputError(form, input, obj) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove(obj.inputErrorClass);
  errorElement.classList.remove(obj.errorClass);
  errorElement.textContent = '';
};

function checkInputValidity(form, input, obj) {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, obj);
  } else {
    hideInputError(form, input, obj);
  };
};

function hasInvalidInput(inputs) {
  return inputs.some(function(item) {
    return !item.validity.valid;
  });
};

function toggleSubmitButtonState(inputArray, button, obj) {
  if(hasInvalidInput(inputArray)) {
    button.classList.add(obj.inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(obj.inactiveButtonClass);
    button.disabled = false;
  };
};

function setEventListeners(form, obj) {
  const inputs = Array.from(form.querySelectorAll(obj.inputSelector));
  const submitButton = form.querySelector(obj.submitButtonSelector);
  toggleSubmitButtonState(inputs, submitButton, obj);
  inputs.forEach(function(item) {
    item.addEventListener('input', function () {
      checkInputValidity(form, item, obj);
      toggleSubmitButtonState(inputs, submitButton, obj);
    });
  });
};

function enableValidation(obj) {
  const forms = Array.from(document.querySelectorAll(obj.formSelector));
  forms.forEach(function(item) {
    item.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setEventListeners(item, obj);
  });
};

enableValidation(validationObject);
