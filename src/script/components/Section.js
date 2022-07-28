export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._renderingItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  render() {
    this._renderingItems.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(elem) {
    this._container.prepend(elem);
  }
}
