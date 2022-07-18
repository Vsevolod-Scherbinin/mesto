import Card from './Card.js';
import initialCards from './initialCards.js';
import FormValidator from './FormValidator.js';
import validationObject from './validationObject.js';

// Popups-Start
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_addCard');
const popupOverlays = document.querySelectorAll('.popup__overlay');
// Popups-End

// Buttons-Start
const buttonEdit = document.querySelector('.profile__edit');
const buttonAddCard = document.querySelector('.profile__add-button');
const buttonsClose = document.querySelectorAll('.popup__close-button');
const buttonsSubmit = document.querySelectorAll('.popup__button');
const editSubmitButton = popupEdit.querySelector('.popup__button');
const addSubmitButton = popupAddCard.querySelector('.popup__button');
// Buttons-End

// Forms-Start
const formEdit = document.querySelector('.popup__form_type_edit');
const formAddCard = document.querySelector('.popup__form_type_addCard');
const forms = document.querySelectorAll('.popup__form');
// Forms-End

// Validators-Start
const validatorEdit = new FormValidator (validationObject, formEdit);
validatorEdit.enableValidation();
const validatorAddCard = new FormValidator (validationObject, formAddCard);
validatorAddCard.enableValidation();
// Validators-End

// Inputs-Start
const editInputs = Array.from(popupEdit.querySelectorAll('.popup__input'));
const inputName = popupEdit.querySelector('.popup__input_content_name');
const inputJob = popupEdit.querySelector('.popup__input_content_job');
const addInputs = Array.from(popupAddCard.querySelectorAll('.popup__input'));
const inputPlace = popupAddCard.querySelector('.popup__input_content_place');
const inputLink = popupAddCard.querySelector('.popup__input_content_link');
// Inputs-End

// Profile-Start
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
// Profile-End

// Cards-Start
const cardsList = document.querySelector('.elements__items');
const cardTemplate = document.querySelector('#elements__item').content;
let cardElement = '';
// Cards-End

// ClosePopup-Start
function closePopupByEsc(evt) {
  const popupOpened = document.querySelector('.popup_open');
  if(popupOpened && evt.key === 'Escape') {
    closePopup(popupOpened);
  };
};

function closePopup(elem) {
  elem.classList.remove('popup_open');
  document.removeEventListener('keydown', closePopupByEsc);
};

popups.forEach(function(item) {
  item.addEventListener('click', function(evt) {
    if(evt.target.classList.contains('popup__overlay') || evt.target.classList.contains('popup__close-button')) {
      closePopup(evt.target.closest('.popup'));
    };
  });
});
// ClosePopup-End

function openPopup(elem) {
  elem.classList.add('popup_open');
  document.addEventListener('keydown', closePopupByEsc);
};

// Edit-Start
function editProfile() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  validatorEdit.toggleSubmitButtonState(editInputs, editSubmitButton);
  openPopup(popupEdit);
};
buttonEdit.addEventListener('click', editProfile);

function submitEdit (evt) {
  evt.preventDefault();
  const name = inputName.value;
  const job = inputJob.value;
  profileName.textContent = name;
  profileJob.textContent = job;
  closePopup(evt.target.closest('.popup'));
};
formEdit.addEventListener('submit', submitEdit);
// Edit-End

// Add-Start
function inputCard() {
  validatorAddCard.toggleSubmitButtonState(addInputs, addSubmitButton);
  openPopup(popupAddCard);
};
buttonAddCard.addEventListener('click', inputCard);

function addCard(elem) {
  const card = new Card(elem, '#elements__item');
  const cardElement = card.generateCard();
  cardsList.prepend(cardElement);
}

function submitAddCard(evt) {
  evt.preventDefault();
  const newCard = {
    name: inputPlace.value,
    link: inputLink.value
  };
  addCard(newCard);
  formAddCard.reset();
  closePopup(evt.target.closest('.popup'));
};
formAddCard.addEventListener('submit', submitAddCard);
// Add-End

initialCards.forEach(function(item){
  addCard(item);
});
