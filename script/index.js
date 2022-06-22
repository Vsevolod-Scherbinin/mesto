// Popups-Start
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_addCard');
const popupImage = document.querySelector('.popup_type_image');
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
const formEdit = popupEdit.querySelector('.popup__form');
const formAddCard = popupAddCard.querySelector('.popup__form');
// Forms-End

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

function likeCard(evt) {
  evt.target.classList.toggle('elements__like_activated');
};

function deleteCard(evt) {
  evt.target.closest('.elements__item').remove();
};

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
  toggleSubmitButtonState(editInputs, editSubmitButton, validationObject);
  editInputs.forEach(function (item) {
    checkInputValidity(formEdit, item, validationObject);
  });
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
  toggleSubmitButtonState(addInputs, addSubmitButton, validationObject);
  openPopup(popupAddCard);
};
buttonAddCard.addEventListener('click', inputCard);

function createCard(elem) {
  cardElement = cardTemplate.querySelector('.elements__item').cloneNode(true);
  cardElement.querySelector('.elements__name').textContent = elem.name;
  cardElement.querySelector('.elements__image').src = elem.link;
  cardElement.querySelector('.elements__image').alt = elem.name;
  cardElement.querySelector('.elements__image').addEventListener('click', openImage);
  cardElement.querySelector('.elements__like').addEventListener('click', likeCard);
  cardElement.querySelector('.elements__delete').addEventListener('click', deleteCard);
  return cardElement;
};

function addCard(elem) {
  cardsList.prepend(elem);
};

function submitAddCard(evt) {
  evt.preventDefault();
  const newCard = {
    name: inputPlace.value,
    link: inputLink.value
  };
  addCard(createCard(newCard));
  formAddCard.reset();
  closePopup(evt.target.closest('.popup'));
};
formAddCard.addEventListener('submit', submitAddCard);
// Add-End

// OpenImage-Start
function openImage(evt) {
  popupImage.querySelector('.popup__image').src = evt.target.src;
  popupImage.querySelector('.popup__image').alt = evt.target.alt;
  popupImage.querySelector('.popup__image-name').textContent = evt.target.alt;
  openPopup(popupImage);
};
// OpenImage-End

initialCards.forEach(function(item){
    addCard(createCard(item));
});
