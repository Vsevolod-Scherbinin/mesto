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
  profileAvatar,
  buttonEdit,
  buttonEditAvatar,
  buttonAddCard,
  submitButtonEdit,
  submitButtonEditAvatar,
  submitButtonAddCard,
  submitButtonConfirm,
  formEdit,
  formAddCard,
  formEditAvatar,
  profileNameSelector,
  profileJobSelector,
  cardsContainerSelector
} from '../script/utils/constants.js';

const api = new Api('https://nomoreparties.co/v1/cohort-47','d56489ec-bc38-40f2-8680-e7ca1665b976');

// Validators-Start
const validatorEdit = new FormValidator (validationObject, formEdit);
validatorEdit.enableValidation();
const validatorAddCard = new FormValidator (validationObject, formAddCard);
validatorAddCard.enableValidation();
const validatorEditAvatar = new FormValidator (validationObject, formEditAvatar);
validatorEditAvatar.enableValidation();
// Validators-End

// -------------------------Profile-Start-------------------------
// Edit-Profile-Start
const profile = new UserInfo(profileNameSelector, profileJobSelector);

const popupEdit = new PopupWithForm(
  '.popup_type_edit',
  (elem) => {
    submitButtonEdit.textContent = 'Сохранение...';
    api.editProfile(elem.name, elem.job)
      .then((res) => {
        profile.setUserInfo(res.name, res.about);
        submitButtonEdit.textContent = 'Сохранить';
        popupEdit.close();
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
const popupEditAvatar = new PopupWithForm(
  '.popup_type_editAvatar',
  (elem) => {
    submitButtonEditAvatar.textContent = 'Сохранение...';
    api.editAvatar(elem.link)
      .then((res) => {
        profileAvatar.src = res.avatar;
        submitButtonEditAvatar.textContent = 'Сохранить';
        popupEditAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
);
popupEditAvatar.setEventListeners();

buttonEditAvatar.addEventListener('click', () => {
  popupEditAvatar.open();
  validatorAddCard.hideFormErrors();
  validatorAddCard.toggleSubmitButtonState();
});
// Edit-Avatar-End
// -------------------------Profile-End-------------------------

// -------------------------Card-Start-------------------------
const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

// Popup-Confirm-Start
const popupDeleteCard = new PopupConfirm(
  '.popup_type_confirm',
  (elem, elemToDel) => {
    submitButtonConfirm.textContent = 'Удаление...';
    api.deleteCard(elem)
      .then(() => {
        popupDeleteCard.setEventListeners(elem);
        console.log(elemToDel);
        elemToDel.remove();
        elemToDel = null;
        submitButtonConfirm.textContent = 'Да';
        popupDeleteCard.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
);
// Popup-Confirm-End

function handleCardClick(name, link) {
  popupImage.open(name, link);
}

function handleDelete(card, elemToDel) {
  popupDeleteCard.open(elemToDel);
  popupDeleteCard.setEventListeners(card);
}

function createCard(elem) {
  const card = new Card(elem, '#elements__item', handleCardClick, handleDelete, {
    handleLike: (button) => {
      if(button.classList.contains('elements__like_activated')) {
        api.deleteLike(elem)
          .then((res) => {
            !card.counterOfLikes(res.likes.length);
            button.classList.remove('elements__like_activated');
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api.putLike(elem)
          .then((res) => {
            !card.counterOfLikes(res.likes.length);
            button.classList.add('elements__like_activated');
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  });
  return card.generateCard();
}

const cardsList = new Section(
  (elem) => {
    cardsList.addItem(createCard(elem));
  },
cardsContainerSelector);

// Popup-Add-Start
const popupAdd = new PopupWithForm(
  '.popup_type_addCard',
  (elem) => {
    submitButtonAddCard.textContent = 'Создание...';
    api.addCard(elem)
      .then((res) => {
        cardsList.addItem(createCard(res));
        submitButtonAddCard.textContent = 'Создать';
        popupAdd.close();
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
// -------------------------Card-End-------------------------

// -------------------------Api-Start-------------------------
const user = api.getUserInfo();
const cards = api.getCards();

Promise.all([user, cards])
  .then((values) => {
    const userData = values[0];
    profile.setUserInfo(userData.name, userData.about)
    profileAvatar.src = userData.avatar;

    const cardsData = values[1];
    cardsList.render(cardsData);
  })
  .catch((err) => {
    console.log(err);
  });
// -------------------------Api-End-------------------------
