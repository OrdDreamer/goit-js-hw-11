export default class LoadMoreSection {
  constructor(hidden = true) {
    this._section = document.querySelector(".load-more");
    this._button = document.querySelector(".load-more__button");
    if (hidden) {
      this.hide();
    }
    this.ready();
  }

  setListener(callback) {
    this._button?.addEventListener("click", callback);
  }

  ready() {
    if (!this._button) {
      return;
    }
    this._button.disabled = false;
    this._button.textContent = "Load more";
  }

  busy() {
    if (!this._button) {
      return;
    }
    this._button.disabled = true;
    this._button.textContent = "Loading...";
  }

  show() {
    this._section?.classList.remove("visually-hidden");
  }

  hide() {
    this._section?.classList.add("visually-hidden");
  }
}
