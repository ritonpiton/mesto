import './index.css';

import { initialCards } from '../scripts/utils/initial-сards.js';

import {
  formConfig,
  editPopup,
  addPopup,
  imagePopupSelector,
  editButton,
  addButton,
  formElementEdit,
  formElementAdd,
  nameInput,
  jobInput,
  titleInput,
  linkInput,
  placesList,
  containerSelector,
  name, job
} from '../scripts/utils/constants.js'

import Card from '../scripts/components/Card.js'
import FormValidator from '../scripts/components/FormValidator.js'
import Section from '../scripts/components/Section.js'
import PopupWithImage from '../scripts/components/PopupWithImage.js'
import PopupWithForm from '../scripts/components/PopupWithForm.js'
import UserInfo from '../scripts/components/UserInfo.js'


const userInfo = new UserInfo({
  nameSelector: name, 
  jobSelector: job
});

// создание новой карточки
function createCard (item) {
  const card = new Card(item, '.place-template', (name, link) => { imagePopup.open(name, link) });
  const cardElement = card.generateCard();
  return cardElement;
}

// инициализация исходного массива
const cardList = new Section ({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardList.addItem(cardElement);
  }
}, containerSelector)
cardList.renderItems();

// попап редактирования профиля
const profilePopup = new PopupWithForm(editPopup, (inputValues) => {
  userInfo.setUserInfo(inputValues);
});
profilePopup.setEventListeners();

// попап добавления новой карточки
const newCardPopup = new PopupWithForm(addPopup, () => {
  const input = {
    name: titleInput.value,
    link: linkInput.value
  }
  const cardElement = createCard(input);
  placesList.prepend(cardElement);
});
newCardPopup.setEventListeners();

// попап просмотра картинки
const imagePopup = new PopupWithImage(imagePopupSelector);
imagePopup.setEventListeners();

// открытие попапа редактирования профиля
editButton.addEventListener('click', () => {
  editProfileFormValidator.clearValidation();
  nameInput.value = userInfo.getUserInfo().nameInput;
  jobInput.value = userInfo.getUserInfo().jobInput;
  profilePopup.open();
});

// открытие попапа добавления карточки
addButton.addEventListener('click', () => {
  addCardFormValidator.clearValidation();
  newCardPopup.open();
});

// валидация всех форм
const editProfileFormValidator = new FormValidator(formConfig, formElementEdit);
const addCardFormValidator = new FormValidator(formConfig, formElementAdd);
editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();