// Buttons-Start
const buttonEdit = document.querySelector('.profile__edit');
const buttonAddCard = document.querySelector('.profile__add-button');
const buttonsClose = document.querySelectorAll('.popup__close-button');
const buttonsSubmit = document.querySelectorAll('.popup__submit');
// Buttons-End

// Popups-Start
const popupEdit = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_addCard');
const popupImage = document.querySelector('.popup_type_image');
// Popups-End

// Forms-Start
const formEdit = popupEdit.querySelector('.popup__container_type_form');
const formAddCard = popupAddCard.querySelector('.popup__container_type_form');
// Forms-End

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
let cardElement = '';
// Cards-End

function likeCard(evt) {
  evt.target.classList.toggle('elements__like_activated');
};

function deleteCard(evt) {
  evt.target.closest('.elements__item').remove();
};

function openPopup(elem) {
  elem.classList.add('popup_open');
};

// ClosePopup-Start
function closePopup(evt) {
  evt.target.closest('.popup').classList.remove('popup_open');
};

buttonsClose.forEach(function(item) {
  item.addEventListener('click', closePopup);
});
// ClosePopup-End

// Edit-Start
function editProfile() {
  openPopup(popupEdit);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
};
buttonEdit.addEventListener('click', editProfile);

function submitEdit (evt) {
  evt.preventDefault();

  const name = inputName.value;
  const job = inputJob.value;

  profileName.textContent = name;
  profileJob.textContent = job;
  closePopup(evt);
};
formEdit.addEventListener('submit', submitEdit);
// Edit-End

// OpenImage-Start
function openImage(evt) {
  popupImage.querySelector('.popup__image').src = evt.target.src;
  popupImage.querySelector('.popup__image').alt = evt.target.alt;
  popupImage.querySelector('.popup__image-name').textContent = evt.target.alt;
  openPopup(popupImage);
};
// OpenImage-End

// Add-Start
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
buttonAddCard.addEventListener('click', () => openPopup(popupAddCard));

function submitAddCard(evt) {
  evt.preventDefault();

  const newCard = {
    name: inputPlace.value,
    link: inputLink.value
  };
  addCard(createCard(newCard));
  formAddCard.reset();
  closePopup(evt);
};
formAddCard.addEventListener('submit', submitAddCard);
// Add-End

initialCards.forEach(function(item){
    addCard(createCard(item));
});
