export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(this._popupSelector);

    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if(evt.key === 'Escape') {
      this.close();
    };
  }

  open() {
    this._popupElement.classList.add('popup_open');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove('popup_open');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    document.querySelector(this._popupSelector).addEventListener('click', (evt) => {
      if(evt.target.classList.contains('popup__overlay') || evt.target.classList.contains('popup__close-button')) {
        this.close();
      };
    });
  }
}
