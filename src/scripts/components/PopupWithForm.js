import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupElement, submitHandler) {
        super(popupElement);
        this._submitHandler = submitHandler;
        this._form = this._popupElement.querySelector('.form')
    }
    _getInputValues() {
        this._inputValues = {};
        this._inputList = this._form.querySelectorAll('.form__input')
        this._inputList.forEach ((input) => {
            this._inputValues[input.name] = input.value;
        })
        return this._inputValues;
    }
    renderLoading(isLoading) {
        this._saveBtn = this._form.querySelector('.form__submit-btn_action_save');
        this._saveBtnLoading = this._form.querySelector('.form__submit-btn_action_loading');
        if (isLoading) {
            
            this._saveBtn.classList.add('form__submit-btn_hidden');
            this._saveBtnLoading.classList.add('form__submit-btn_action_loading_visible');
        }
        else {
            this._saveBtnLoading.classList.remove('form__submit-btn_action_loading_visible');
            this._saveBtn.classList.remove('form__submit-btn_hidden');
        }
    }
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitHandler(this._getInputValues());
            this.close();
        })
    }
    close() {
        super.close();
        this._form.reset();
    }
}