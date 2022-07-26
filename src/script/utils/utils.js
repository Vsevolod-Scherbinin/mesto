import PopupWithImage from '../components/PopupWithImage.js';

export default function handleCardClick(elem) {
  const popupImage = new PopupWithImage('.popup_type_image');
  popupImage.open(elem.name, elem.link);
  popupImage.setEventListeners();
}
