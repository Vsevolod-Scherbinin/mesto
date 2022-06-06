// Buttons-Start
const buttonEdit = document.querySelector('.profile__edit');
const buttonAddCard = document.querySelector('.profile__add-button');
const buttonClose = document.querySelectorAll('.popup__close-button');
const buttonSubmit = document.querySelectorAll('.popup__submit');
// Buttons-End

// Popups-Start
const popupEdit = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_addCard');
const popupImage = document.querySelector('.popup_type_image');
// Popups-End

// Inputs-Start
const inputName = popupEdit.querySelector('.popup__input_content_name');
const inputJob = popupEdit.querySelector('.popup__input_content_job');
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
// Cards-End

function likeCard(evt) {
  evt.target.classList.toggle('elements__like_activated');
};

function deleteCard(evt) {
  evt.target.parentElement.remove();
};

function openPopup(elem) {
  elem.classList.add('popup_open');
};

// Edit-Start
function editProfile() {
  openPopup(popupEdit);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
};
buttonEdit.addEventListener('click', editProfile);

function submitEdit (evt) {
  evt.preventDefault();

  let name = inputName.value;
  let job = inputJob.value;

  profileName.textContent = name;
  profileJob.textContent = job;
};
popupEdit.addEventListener('submit', submitEdit);
// Edit-End

// OpenImage-Start
function openImage(evt) {
  popupImage.querySelector('.popup__image').src = evt.target.src;
  popupImage.querySelector('.popup__image-name').textContent = evt.target.parentElement.querySelector('.elements__name').textContent;
  openPopup(popupImage);
};
// OpenImage-End

// Add-Start
function addCard(elem) {
  const cardElement = cardTemplate.querySelector('.elements__item').cloneNode(true);
  cardElement.querySelector('.elements__name').textContent = elem.name;
  cardElement.querySelector('.elements__image').src = elem.link;
  cardElement.querySelector('.elements__image').addEventListener('click', openImage);
  cardElement.querySelector('.elements__like').addEventListener('click', likeCard);
  cardElement.querySelector('.elements__delete').addEventListener('click', deleteCard);
  cardsList.prepend(cardElement);
};

function openAddCardPopup() {
  popupAddCard.classList.add('popup_open');
};
buttonAddCard.addEventListener('click', openAddCardPopup);

function submitAddCard(evt) {
  evt.preventDefault();

  const newCard = {
    name: inputPlace.value,
    link: inputLink.value
  };
  addCard(newCard);
  inputPlace.value = '';
  inputLink.value = '';
};
popupAddCard.addEventListener('submit', submitAddCard);
// Add-End

// ClosePopup-Start
function closePopup(evt) {
  evt.target.parentElement.parentElement.classList.remove('popup_open');
};

buttonClose.forEach(function(item) {
  item.addEventListener('click', closePopup);
});
buttonSubmit.forEach(function(item) {
  item.addEventListener('click', closePopup);
});
// ClosePopup-End

// InitialCards-Start
const initialCards = [
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

initialCards.forEach(addCard);
// InitialCards-End
