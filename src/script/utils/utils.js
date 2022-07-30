import PopupWithImage from '../components/PopupWithImage.js';
import Card from '../components/Card.js';

const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();
export function handleCardClick(name, link) {
  popupImage.open(name, link);
}

export function createCard(elem) {
  const card = new Card(elem, '#elements__item', handleCardClick);
  return card.generateCard();
}
