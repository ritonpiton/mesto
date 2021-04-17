export const formConfig = { 
    inputSelector: '.form__input', 
    submitButtonSelector: '.form__submit-btn', 
    inactiveButtonClass: 'form__submit-btn_disabled', 
    inputErrorClass: 'form__input_type_error', 
    errorClass: 'form__input-error_active' 
  };

export const container = document.querySelector('.content');
export const editPopup = document.querySelector('.popup_type_edit');
export const addPopup = document.querySelector('.popup_type_add');
export const avatarPopup = document.querySelector('.popup_type_avatar');
export const imagePopupSelector = document.querySelector('.popup_type_image');
export const deletePopupSelector = document.querySelector('.popup_type_delete');
export const avatarPopupSelector = document.querySelector('.popup_type_avatar');

// профиль
export const nameSelector = '.profile__title';
export const name = container.querySelector(nameSelector);
export const jobSelector = '.profile__job';
export const job = container.querySelector(jobSelector);
export const avatar = container.querySelector('.profile__avatar');
export const avatarSelector = '.profile__avatar';
// кнопки
export const editButton = container.querySelector('.profile__edit-btn');
export const addButton = container.querySelector('.profile__add-btn');
export const avatarButton = container.querySelector('.profile__avatar-btn')
// Находим формы в DOM
export const formElementEdit = editPopup.querySelector('.form_type_edit');
export const formElementAdd = addPopup.querySelector('.form_type_add');
export const formElementAvatar = avatarPopup.querySelector('.form_type_avatar');
// Находим поля форм в DOM
export const nameInput = formElementEdit.querySelector('.form__input_type_name');
export const jobInput = formElementEdit.querySelector('.form__input_type_job');
export const titleInput = formElementAdd.querySelector('.form__input_type_place-name');
export const linkInput = formElementAdd.querySelector('.form__input_type_place-link');
export const avatarInput = formElementAvatar.querySelector('.form__input_type_avatar-link');
// карточки
export const placesList = document.querySelector('.places');
export const containerSelector = '.places';
export const placeElement = document.querySelector('.place-template');
export const placeImage = placeElement.querySelector('.place__image');
export const placeTitle = placeElement.querySelector('.place__title');
export const deleteButton = placeElement.querySelector('.place__delete');

export const popups = document.querySelectorAll('.popup');
export const image = imagePopupSelector.querySelector('.popup__image'); 
export const title = imagePopupSelector.querySelector('.popup__title'); 