// класс карточки
export default class Card {
    constructor(card, cardSelector, handleCardClick) {
        this._title = card.name;
        this._image = card.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        
        
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
        this._placeImage = this._element.querySelector('.place__image');
        this._element.querySelector('.place__delete').addEventListener('click', () => this._handleDelete());
        this._element.querySelector('.place__like').addEventListener('click', () => this._handleLike());
        this._placeImage.addEventListener('click', () => this._handleCardClick(this._title, this._image));
    }
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._placeImage.src = this._image;
        this._element.querySelector('.place__title').textContent = this._title;
        this._placeImage.alt = this._title;
        return this._element;
    }
}
