// класс карточки
import {containerSelector} from "../utils/constants";

export default class Card {
    constructor(card, cardSelector, handleCardClick, handleLikeClick, handleDislikeClick, handleDeleteClick, userId) {
        this._card = card

        this._title = card.name;
        this._image = card.link;
        this._likesCount = card.likes;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;

        this._handleLikeClick = handleLikeClick;
        this._handleDislikeClick = handleDislikeClick
        this._handleDeleteClick = handleDeleteClick

        this._userId = userId
        this._ownerId = card.owner._id


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
        this._like.classList.add('place__like_active');
    }
    // дизлайк карточки
    _removeLike() {
        this._like.classList.remove('place__like_active');
    }
    // удаление карточки
    handleDelete() {
        const place = this._element.closest('.place');
        place.remove();
    }
    // установка слушателей
    _setEventListeners() {
        this._placeImage = this._element.querySelector('.place__image');
        this._like = this._element.querySelector('.place__like');
        this._delete = this._element.querySelector('.place__delete');
        // показ значка корзины
        if (this._userId === this._ownerId) {
             this._delete.addEventListener('click', () => {
               this._handleDeleteClick(this._card)
            });
        }
        else {
            this._delete.classList.add('place__delete_hidden')
        }
        // слушатель лайка
        this._like.addEventListener('click', () => {
            if (this._isMyLike()) {
                this._handleDislikeClick(this._card)
            }
            else this._handleLikeClick(this._card)
        });
        this._placeImage.addEventListener('click', () => this._handleCardClick(this._title, this._image));
    }
    // отображение количество лайков
    _renderLikes() {
        this._likes.textContent = this._likesCount.length;
    }
    // есть ли мой лайк
    _isMyLike() {
        return Boolean(this._likesCount.find(el => el._id === this._userId))
    }
    
    _updateLikesView() {
        if (this._isMyLike()) { // если нашли мой лайк
            this._handleLike() // сделаем кнопку активной
            this._renderLikes()
        }
        else {
            this._removeLike()
            this._renderLikes()
        }
    }
    // обновление состояния лайков (получаем данные с сервера и ищем, где я ставила лайки)
    handleLikes(data) {
        this._likesCount = data.likes // все лайки
        this._updateLikesView()
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();  

        this._placeImage.src = this._image;
        this._element.querySelector('.place__title').textContent = this._title;
        this._placeImage.alt = this._title;

        this._likes = this._element.querySelector('.place__like-counter')

        this._updateLikesView()
        this._renderLikes()

        return this._element;
    }
}
