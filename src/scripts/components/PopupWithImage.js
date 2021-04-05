import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
    constructor(popupElement) {
        super(popupElement);
    }
    open( placeTitle, placeImage) {
        super.open();

        const image = this._popupElement.querySelector('.popup__image');
        const title = this._popupElement.querySelector('.popup__title');

        image.src = placeImage;
        title.textContent = placeTitle;
        image.alt = placeTitle;
    }
}