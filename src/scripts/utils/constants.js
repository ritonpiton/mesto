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
export const imagePopup = document.querySelector('.popup_type_image');
// профиль
export const name = container.querySelector('.profile__title');
export const job = container.querySelector('.profile__job');
// кнопки
export const editButton = container.querySelector('.profile__edit-btn');
export const addButton = container.querySelector('.profile__add-btn');
// Находим формы в DOM
export const formElementEdit = editPopup.querySelector('.form_type_edit');
export const formElementAdd = addPopup.querySelector('.form_type_add');
// Находим поля форм в DOM
export const nameInput = formElementEdit.querySelector('.form__input_type_name');
export const jobInput = formElementEdit.querySelector('.form__input_type_job');
export const titleInput = formElementAdd.querySelector('.form__input_type_place-name');
export const linkInput = formElementAdd.querySelector('.form__input_type_place-link');
// карточки
export const placesList = document.querySelector('.places');
export const containerSelector = '.places';
export const placeElement = document.querySelector('.place-template')
export const placeImage = placeElement.querySelector('.place__image');
export const placeTitle = placeElement.querySelector('.place__title');

export const popups = document.querySelectorAll('.popup');
export const image = imagePopup.querySelector('.popup__image'); 
export const title = imagePopup.querySelector('.popup__title'); 