export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const validationObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Popups-Start
export const popupEditSelector = document.querySelector('.popup_type_edit');
export const popupAddCardSelector = document.querySelector('.popup_type_addCard');
// Popups-End

// Buttons-Start
export const buttonEdit = document.querySelector('.profile__edit');
export const buttonAddCard = document.querySelector('.profile__add-button');
export const editSubmitButton = popupEditSelector.querySelector('.popup__button');
export const addSubmitButton = popupAddCardSelector.querySelector('.popup__button');
// Buttons-End

// Forms-Start
export const formEdit = document.querySelector('.popup__form_type_edit');
export const formAddCard = document.querySelector('.popup__form_type_addCard');
// Forms-End

// Inputs-Start
export const inputsEdit = Array.from(popupEditSelector.querySelectorAll('.popup__input'));
export const inputsAdd = Array.from(popupAddCardSelector.querySelectorAll('.popup__input'));
// Inputs-End

// Profile-Start
// export const profileName = document.querySelector('.profile__name');
// export const profileJob = document.querySelector('.profile__job');
export const profileNameSelector = '.profile__name';
export const profileJobSelector = '.profile__job';
// Profile-End

// Cards-Start
export const cardsContainerSelector = '.elements__items';
export const cardsContainer = document.querySelector(cardsContainerSelector);
// Cards-End
