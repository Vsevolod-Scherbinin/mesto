import './index.css';
import Section from '../script/components/Section.js';
import UserInfo from '../script/components/UserInfo.js';
import FormValidator from '../script/components/FormValidator.js';
import PopupWithForm from '../script/components/PopupWithForm.js';
import {
  createCard
} from '../script/utils/utils.js';

import {
  initialCards,
  validationObject,
  buttonEdit,
  buttonAddCard,
  formEdit,
  formAddCard,
  profileNameSelector,
  profileJobSelector,
  cardsContainerSelector
} from '../script/utils/constants.js';

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
    cardsList.addItem(createCard(elem));
  }
}, cardsContainerSelector);

cardsList.render();
// Ititial-Cards-End

//Popup-Add-Start
const popupAdd = new PopupWithForm(
  '.popup_type_addCard',
  (elem) => {
    cardsList.addItem(createCard(elem));
  }
);
popupAdd.setEventListeners();

buttonAddCard.addEventListener('click', () => {
  popupAdd.open();
  validatorAddCard.toggleSubmitButtonState();
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
  validatorEdit.toggleSubmitButtonState();
});
//Popup-Edit-End
