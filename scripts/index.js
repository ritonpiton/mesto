// исходный массив
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const container = document.querySelector('.content');
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_add');
const imagePopup = document.querySelector('.popup_type_image');
// профиль
const curName = container.querySelector('.profile__title');
const curJob = container.querySelector('.profile__job');
// кнопки
const editButton = container.querySelector('.profile__edit-btn');
const addButton = container.querySelector('.profile__add-btn');
// Находим формы в DOM
const formElementEdit = editPopup.querySelector('.form_type_edit');
const formElementAdd = addPopup.querySelector('.form_type_add');
// Находим поля форм в DOM
const nameInput = formElementEdit.querySelector('.form__input_type_name');
const jobInput = formElementEdit.querySelector('.form__input_type_job');
const titleInput = formElementAdd.querySelector('.form__input_type_place-name');
const linkInput = formElementAdd.querySelector('.form__input_type_place-link');
// карточки
const placesList = document.querySelector('.places');
//закрытие по клику по оверлею или крестике
const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) { //поиск открытого попапа
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close-btn')) {
      closePopup(popup);
    }
  })
})
//закрытие по ESC
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    //поиск открытого попапа
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
}
// инициализация исходного массива
const renderElements = () => {
  placesList.innerHTML = '';
  initialCards.forEach(function (element) {
    const card = new Card(element, '.place-template');
    const cardElement = card.generateCard();
    placesList.append(cardElement);
  })
}
renderElements();

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}
function openEditPopup() {
  nameInput.value = curName.textContent;
  jobInput.value = curJob.textContent;
  openPopup(editPopup);
}
function openAddPopup() {
  openPopup(addPopup);
}
// отправка формы профиля
function submitEditForm(evt) {
  evt.preventDefault();
  curName.textContent = nameInput.value;
  curJob.textContent = jobInput.value;
  closePopup(editPopup);
}
// добавление новой карточки
function submitAddCard(evt) {
  evt.preventDefault();
  const input = {
    name: titleInput.value,
    link: linkInput.value
  }
  const card = new Card(input, '.place-template');
  const cardElement = card.generateCard();
  placesList.prepend(cardElement);
  closePopup(addPopup);
  formElementAdd.reset();
}

// валидация всех форм
const formConfig = { 
  inputSelector: '.form__input', 
  submitButtonSelector: '.form__submit-btn', 
  inactiveButtonClass: 'form__submit-btn_disabled', 
  inputErrorClass: 'form__input_type_error', 
  errorClass: 'form__input-error_active' 
};
const renderForms = (config) => {
  const allForms = document.querySelectorAll('.form');
  allForms.forEach(function (formElement) {
    const validatedForm = new FormValidator(config, formElement);
    validatedForm.enableValidation();
  })
}
renderForms(formConfig);

editButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', openAddPopup);
formElementEdit.addEventListener('submit', submitEditForm);
formElementAdd.addEventListener('submit', submitAddCard);

import Card from './Card.js'
import FormValidator from './FormValidator.js'