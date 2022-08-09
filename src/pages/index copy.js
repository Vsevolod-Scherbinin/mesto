import './index.css';
import Api from '../script/components/Api.js';
import Card from '../script/components/Card.js';
import FormValidator from '../script/components/FormValidator.js';
import PopupConfirm from '../script/components/PopupConfirm.js';
import PopupWithForm from '../script/components/PopupWithForm.js';
import PopupWithImage from '../script/components/PopupWithImage.js';
import Section from '../script/components/Section.js';
import UserInfo from '../script/components/UserInfo.js';

import {
  validationObject,
  buttonEdit,
  buttonAddCard,
  formEdit,
  formAddCard,
  profileNameSelector,
  profileJobSelector,
  profileAvatarSelector,
  cardsContainerSelector
} from '../script/utils/constants.js';

const api = new Api('https://nomoreparties.co/v1/cohort-47','d56489ec-bc38-40f2-8680-e7ca1665b976');

// Validators-Start
const validatorEdit = new FormValidator (validationObject, formEdit);
validatorEdit.enableValidation();
const validatorAddCard = new FormValidator (validationObject, formAddCard);
validatorAddCard.enableValidation();
// Validators-End

// -------------------------Profile-Start-------------------------
// Edit-Profile-Start
const profile = new UserInfo(profileNameSelector, profileJobSelector);

const popupEdit = new PopupWithForm(
  '.popup_type_edit',
  (elem) => {
    api.editProfile(elem.name, elem.job)
      .then((res) => {
        profile.setUserInfo(res.name, res.about)
      })
      .catch((err) => {
        console.log(err);
      });
  }
);
popupEdit.setEventListeners();

buttonEdit.addEventListener('click', () => {
  popupEdit.open();
  popupEdit.setInputValues(profile.getUserInfo());
  validatorEdit.checkFormValidity();
  validatorEdit.toggleSubmitButtonState();
});
// Edit-Profile-End

// Edit-Avatar-Start
// Edit-Avatar-End
// -------------------------Profile-End-------------------------

// -------------------------Card-Start-------------------------
const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

const popupDeleteCard = new PopupConfirm(
  '.popup_type_confirm',
  (elem) => {
    api.deleteCard(elem)
      .then(() => {
        popupDeleteCard.setEventListeners(elem);
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

// Utils-Start
function handleCardClick(name, link) {
  popupImage.open(name, link);
}

function handleDelete(card) {
  popupDeleteCard.open(card);
  popupDeleteCard.setEventListeners(card);
}

function handleLike(button) {
  if(button.classList.contains('elements__like_activated')) {
    api.deleteLike
  }
}

function createCard(elem) {
  const card = new Card(elem, '#elements__item', handleCardClick, handleDelete, handleLike);
  return card.generateCard();
}
// Utils-End

// Add-Card-Start
// const cardsList = new Section({
//   items: [],
//   renderer: (elem) => {
//     cardsList.addItem(createCard(elem));
//   }
// }, cardsContainerSelector);

const cardsList = new Section(
  (elem) => {
    cardsList.addItem(createCard(elem));
  },
cardsContainerSelector);

// Popup-Add-Start
const popupAdd = new PopupWithForm(
  '.popup_type_addCard',
  (elem) => {
    api.addCard(elem)
      .then((res) => {
        cardsList.addItem(createCard(res));
        cardsList.render([res]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
);
popupAdd.setEventListeners();

buttonAddCard.addEventListener('click', () => {
  popupAdd.open();
  validatorAddCard.hideFormErrors();
  validatorAddCard.toggleSubmitButtonState();
});
  // Popup-Add-End
// Add-Card-End
// -------------------------Card-End-------------------------

// -------------------------Api-Start-------------------------
const user = api.getUserInfo();
const cards = api.getCards();

Promise.all([user, cards])
  .then((values) => {
    const userData = values[0];
    profile.setUserInfo(userData.name, userData.about)
    document.querySelector(profileAvatarSelector).src = userData.avatar;

    const cardsData = values[1];
    cardsList.render(cardsData);
  })
  .catch((err) => {
    console.log(err);
  });
// -------------------------Api-End-------------------------
