export default class LoadMoreSection {
  constructor(hidden = true) {
    this._section = document.createElement("section");
    this._section.classList.add("load-more");
    this._button = document.createElement("button");
    this._button.classList.add("load-more__button");

    this._section.appendChild(this._button);

    if (hidden) {
      this.hide();
    }
    this.ready();
  }

  getElement() {
    return this._section;
  }

  setListener(callback) {
    this._button.addEventListener("click", callback);
  }

  ready() {
    this._button.disabled = false;
    this._button.textContent = "Load more";
  }

  busy() {
    this._button.disabled = true;
    this._button.textContent = "Loading...";
  }

  show() {
    this._section.classList.remove("visually-hidden");
  }

  hide() {
    this._section.classList.add("visually-hidden");
  }
}
