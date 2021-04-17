import "core-js/stable";
import "regenerator-runtime/runtime";

import './index.css';

import {
  formConfig,
  editPopup,
  addPopup,
  imagePopupSelector,
  deletePopupSelector,
  avatarPopupSelector,
  editButton,
  addButton,
  formElementEdit,
  formElementAdd,
  formElementAvatar,
  nameInput,
  jobInput,
  titleInput,
  linkInput,
  avatarInput,
  placesList,
  containerSelector,
  nameSelector, jobSelector, avatarSelector,
  name, job, avatar, avatarButton
} from '../scripts/utils/constants.js'

import Card from '../scripts/components/Card.js'
import FormValidator from '../scripts/components/FormValidator.js'
import Section from '../scripts/components/Section.js'
import PopupWithImage from '../scripts/components/PopupWithImage.js'
import PopupWithForm from '../scripts/components/PopupWithForm.js'
import PopupWithSubmit from '../scripts/components/PopupWithSubmit'
import UserInfo from '../scripts/components/UserInfo.js'
import Api from '../scripts/components/Api.js'


const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-22',
  token: 'a9adc374-6482-48a1-89c0-e921c3b9f044'
})

const userInfo = new UserInfo({
  nameSelector: nameSelector, 
  jobSelector: jobSelector,
  avatarSelector: avatarSelector
});

Promise.all([api.getInitialCards(), api.getUserInfo()])
.then(([ cardsArray, userData ]) => {

})

let userId
// получение данных профиля с сервера
api.getUserInfo()
 .then(values => {
    name.textContent = values.name;
    job.textContent = values.about;
    avatar.src = values.avatar;
    userId = values._id;
})
.catch(err => console.log('Ошибка получения данных профиля'));

// создание новой карточки
function createCard (item) {
  const card = new Card(
    item, 
    '.place-template', 
    // handleCardClick
    (name, link) => { 
      imagePopup.open(name, link)
    },
    // handleLikeClick
    () => { 
      api.setLike(item._id)
      .then(res => {
        card.handleLikes(res);
      })
      .catch(err => console.log('Ошибка лайка карточки'));
    },
    // handleDislike
    () => {
      api.deleteLike(item._id)
      .then(res => {
        card.handleLikes(res);
      })
      .catch(err => console.log('Ошибка дизлайка карточки'));
    },
    // handleDeleteClick
    () => {
      deletePopup.setSubmitAction(() => {
        api.deleteCard(item._id)
        .then(res => {
          card.handleDelete();
        })
        .catch(err => console.log('Ошибка удаления карточки'));
      })
      deletePopup.open();
    },
    userId);

  const cardElement = card.generateCard();
  return cardElement;
}

// инициализация исходного массива 
const cardList = new Section ({ 
  renderer: (item) => { 
    const cardElement = createCard(item); 
    cardList.addItem(cardElement); 
  } 
}, containerSelector) 

api.getInitialCards()
.then((cards) => {
  cardList.renderItems(cards); 
})
.catch(err => console.log('Ошибка инициализации исходного массива'));

// попап редактирования профиля
const profilePopup = new PopupWithForm(editPopup, (inputValues) => {
  profilePopup.renderLoading(true);
  api.setUserInfo({ // отправка данных профиля на сервер
    name: inputValues.name,
    about: inputValues.job
  })
    .then(inputs => {
      userInfo.setUserInfo(inputs);
    })
    .catch(err => console.log('Ошибка отправки данных профиля'))
    .finally(() => {
      profilePopup.renderLoading(false);
    })

});
profilePopup.setEventListeners();

// попап добавления новой карточки
const newCardPopup = new PopupWithForm(addPopup, () => {
  newCardPopup.renderLoading(true);
  api.addCard({ // отправка новой карточки на сервер
    name: titleInput.value,
    link: linkInput.value
  })
    .then(input => {
      placesList.prepend(createCard(input));
    })
    .catch(err => console.log('Ошибка при создании карточки'))
    .finally(() => {
      newCardPopup.renderLoading(false);
    })
});
newCardPopup.setEventListeners();

// попап просмотра картинки
const imagePopup = new PopupWithImage(imagePopupSelector);
imagePopup.setEventListeners();

// попап удаления
const deletePopup = new PopupWithSubmit(deletePopupSelector);
deletePopup.setEventListeners();

// попап изменения аватарки
const avatarPopup = new PopupWithForm(avatarPopupSelector, () => {
  avatarPopup.renderLoading(true);
  api.setUserAvatar({ 
    avatar: avatarInput.value 
  })
  .then(input => {
    userInfo.editUserAvatar(input);
  })
  .catch(err => console.log('Ошибка обновления аватара'))
  .finally(() => {
    avatarPopup.renderLoading(false);
  })
});
avatarPopup.setEventListeners();

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

// открытие попапа изменения аватарки
avatarButton.addEventListener('click', () => {
  editAvatarFormValidator.clearValidation();
  avatarPopup.open();
})

// валидация всех форм
const editProfileFormValidator = new FormValidator(formConfig, formElementEdit);
const addCardFormValidator = new FormValidator(formConfig, formElementAdd);
const editAvatarFormValidator = new FormValidator(formConfig, formElementAvatar);
editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
editAvatarFormValidator.enableValidation();