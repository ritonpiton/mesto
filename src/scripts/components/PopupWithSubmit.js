import Popup from "./Popup";

export default class PopupWithSubmit extends Popup {
    constructor(popupElement) {
        super(popupElement);
        this._form = this._popupElement.querySelector('.form')
    }
    setSubmitAction(submitAction) {
        this._submitAction = submitAction
    }
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitAction(this._)
            this.close();
        })
    }
}