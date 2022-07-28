import PopupWithImage from '../components/PopupWithImage.js';
import Card from '../components/Card.js';

export function handleCardClick(name, link) {
  const popupImage = new PopupWithImage('.popup_type_image');
  popupImage.open(name, link);
  popupImage.setEventListeners();
}

export function createCard(elem) {
  const card = new Card(elem, '#elements__item',
  handleCardClick);
  return card.generateCard();
}
