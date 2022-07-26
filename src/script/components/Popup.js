export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._element = document.querySelector(this._selector);
  }

  open() {
    this._element.classList.add('popup_open');
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
  }

  close() {
    this._element.classList.remove('popup_open');
    document.removeEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
  }

  _handleEscClose(evt) {
    if(evt.key === 'Escape') {
      this.close();
    };
  }

  setEventListeners() {
    document.querySelector(this._selector).addEventListener('click', (evt) => {
      if(evt.target.classList.contains('popup__overlay') || evt.target.classList.contains('popup__close-button')) {
        this.close();
      };
    });
  }
}
