// класс карточки
export default class Card {
    constructor(card, cardSelector) {
        this._title = card.name;
        this._image = card.link;
        this._cardSelector = cardSelector;
    }
    // считали разметку
    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.place')
            .cloneNode(true);
        return cardElement;
    }
    // лайк карточки
    _handleLike() {
        const like = this._element.querySelector('.place__like');
        like.classList.toggle('place__like_active');
    }
    // удаление карточки
    _handleDelete() {
        const place = this._element.closest('.place');
        place.remove();
    }
    // установка слушателей
    _setEventListeners() {
        this._element.querySelector('.place__delete').addEventListener('click', () => { this._handleDelete() });
        this._element.querySelector('.place__like').addEventListener('click', () => { this._handleLike() });
        this._element.querySelector('.place__image').addEventListener('click', () => { this._openPreviewPicture() });
    }
    // просмотр картинки
    _openPreviewPicture() {
        image.src = this._image;
        title.textContent = this._title;
        image.alt = this._title;
        openPopup(imagePopup);
    }
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        const placeImage = this._element.querySelector('.place__image')
        const placeTitle = this._element.querySelector('.place__title')
        placeImage.src = this._image;
        placeTitle.textContent = this._title;
        placeImage.alt = this._title;
        return this._element;
    }
}

const imagePopup = document.querySelector('.popup_type_image');
const image = imagePopup.querySelector('.popup__image'); 
const title = imagePopup.querySelector('.popup__title'); 