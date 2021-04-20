import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupElement, submitHandler) {
        super(popupElement);
        this._submitHandler = submitHandler;
        this._form = this._popupElement.querySelector('.form')

        this._inputList = this._form.querySelectorAll('.form__input');
        this._submitButton = this._form.querySelector('.form__submit-btn_action_save');
    }
    _getInputValues() {
        this._inputValues = {};
        this._inputList.forEach ((input) => {
            this._inputValues[input.name] = input.value;
        })
        return this._inputValues;
    }
    renderLoading(isLoading) {
        if (isLoading) {
            this._submitButton.textContent = 'Сохранение...';
        }
        else {
            this._submitButton.textContent = 'Сохранить';
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