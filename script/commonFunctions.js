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
// ClosePopup-End

function openPopup(elem) {
  elem.classList.add('popup_open');
  document.addEventListener('keydown', closePopupByEsc);
};

export {closePopup, openPopup};
