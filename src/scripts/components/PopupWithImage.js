import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }
    open( placeTitle, placeImage) {
        super.open();

        const image = this._popupSelector.querySelector('.popup__image');
        const title = this._popupSelector.querySelector('.popup__title');

        image.src = placeImage;
        title.textContent = placeTitle;
        image.alt = placeTitle;
    }
}