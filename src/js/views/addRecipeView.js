import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2
import { formatCheck } from '../model.js';
import { state } from '../model.js';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded :)';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _btnUpload = document.querySelector('.upload__btn');
  _formatModal = document.querySelector('.format-message');
  _btnCloseFormatModal = document.querySelector('.btn--close-formatmodal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
    this._addHandlerToggleValidateModal();
  }

  _toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _toggleBothWindows() {
    this._toggleWindow();
    this._toggleFormatWindow();
  }

  // Way to combine hiding and showing the window
  // [this._btnClose, this._btnOpen, this._overlay].forEach(btn =>
  //   btn.addEventListener('click', this._toggleWindow.bind(this))
  // );
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this._toggleWindow.bind(this));
  }
  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this._toggleWindow.bind(this));
    this._overlay.addEventListener('click', this._toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _toggleFormatWindow() {
    this._formatModal.classList.toggle('hidden');
  }

  _addHandlerToggleValidateModal() {
    this._btnUpload.addEventListener(
      'mouseover',
      function () {
        formatCheck();
        if (state.validity) return;
        this._toggleBothWindows();
      }.bind(this)
    );
    this._btnCloseFormatModal.addEventListener(
      'click',
      function () {
        this._toggleBothWindows();
        state.validity = true;
      }.bind(this)
    );
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
