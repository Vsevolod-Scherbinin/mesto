import Api from "../components/Api.js";

export const validationObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const api = new Api('https://nomoreparties.co/v1/cohort-47','d56489ec-bc38-40f2-8680-e7ca1665b976');

// Buttons-Start
export const buttonEdit = document.querySelector('.profile__edit');
export const buttonEditAvatar = document.querySelector('.profile__avatarEditButton');
export const buttonAddCard = document.querySelector('.profile__add-button');
export const submitButtonEdit = document.querySelector('.popup__button_type_edit');
export const submitButtonEditAvatar = document.querySelector('.popup__button_type_editAvatar');
export const submitButtonAddCard = document.querySelector('.popup__button_type_addCard');
export const submitButtonConfirm = document.querySelector('.popup__button_type_confirm');
// Buttons-End

// Forms-Start
export const formEdit = document.querySelector('.popup__form_type_edit');
export const formAddCard = document.querySelector('.popup__form_type_addCard');
export const formEditAvatar = document.querySelector('.popup__form_type_editAvatar');
// Forms-End

// Profile-Start
export const profileNameSelector = '.profile__name';
export const profileJobSelector = '.profile__job';
export const profileAvatarSelector = '.profile__avatar';
// Profile-End

// Cards-Start
export const cardsContainerSelector = '.elements__items';
export const cardsContainer = document.querySelector(cardsContainerSelector);
// Cards-End
