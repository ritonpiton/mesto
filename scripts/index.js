import Card from './Card.js'
import FormValidator from './FormValidator.js'

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
// создание новой карточки
function createCard (input) {
  const card = new Card(input, '.place-template');
  const cardElement = card.generateCard();
  return cardElement;
}
// инициализация исходного массива
const renderElements = () => {
  placesList.innerHTML = '';
  initialCards.forEach(function (element) {
    const cardElement = createCard(element);
    placesList.append(cardElement);
  })
}
renderElements();
// открытие попапа редактирования профиля
function openEditPopup() {
  editProfileFormValidator.clearValidation();
  nameInput.value = curName.textContent;
  jobInput.value = curJob.textContent;
  openPopup(editPopup);
}
// открытие попапа добавления карточки
function openAddPopup() {
  addCardFormValidator.clearValidation();
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
  const cardElement = createCard(input);
  placesList.prepend(cardElement);
  closePopup(addPopup);
}
// валидация всех форм
const editProfileFormValidator = new FormValidator(formConfig, formElementEdit);
const addCardFormValidator = new FormValidator(formConfig, formElementAdd);
editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

editButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', openAddPopup);
formElementEdit.addEventListener('submit', submitEditForm);
formElementAdd.addEventListener('submit', submitAddCard);