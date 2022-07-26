import '../../pages/index.css';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import handleCardClick from '../utils/utils.js';

import {
  initialCards,
  validationObject,
  buttonEdit,
  buttonAddCard,
  editSubmitButton,
  addSubmitButton,
  formEdit,
  formAddCard,
  inputsEdit,
  inputsAdd,
  profileNameSelector,
  profileJobSelector,
  cardsContainerSelector
} from '../utils/constants.js';

// Validators-Start
const validatorEdit = new FormValidator (validationObject, formEdit);
validatorEdit.enableValidation();
const validatorAddCard = new FormValidator (validationObject, formAddCard);
validatorAddCard.enableValidation();
// Validators-End

// Add-Card-Start
// Ititial-Cards-Start
const cardsList = new Section({
  items: initialCards,
  renderer: (elem) => {
    const card = new Card(elem, '#elements__item',
    handleCardClick);
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
  }
}, cardsContainerSelector);

cardsList.render();
// Ititial-Cards-End

//Popup-Add-Start
const popupAdd = new PopupWithForm(
  '.popup_type_addCard',
  (elem) => {
    const card = new Card(elem, '#elements__item',
    handleCardClick);
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
  }
);
popupAdd.setEventListeners();

buttonAddCard.addEventListener('click', () => {
  popupAdd.open();
  validatorAddCard.toggleSubmitButtonState(inputsAdd, addSubmitButton);
});
//Popup-Add-End
// Add-Card-End

//Popup-Edit-Start
const profile = new UserInfo(profileNameSelector, profileJobSelector);

const popupEdit = new PopupWithForm(
  '.popup_type_edit',
  (elem) => {
    profile.setUserInfo(elem.name, elem.job);
  }
);
popupEdit.setEventListeners();

buttonEdit.addEventListener('click', () => {
  popupEdit.open();
  popupEdit.setInputValues(profile.getUserInfo());
  validatorEdit.toggleSubmitButtonState(inputsEdit, editSubmitButton);
});
//Popup-Edit-End
