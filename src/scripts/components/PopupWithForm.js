import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmit) {
        super(popupSelector);
        this._formSubmit = formSubmit;
        this._form = this._popupSelector.querySelector('.form')
    }
    _getInputValues() {
        this._inputValues = {};
        this._inputList = this._form.querySelectorAll('.form__input')
        this._inputList.forEach ((input) => {
            this._inputValues[input.name] = input.value;
        })
        return this._inputValues;
    }
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._formSubmit(this._getInputValues());
            this.close();
        })
    }
    close() {
        super.close();
        this._form.reset();
    }
}