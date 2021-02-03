const container = document.querySelector('.content');
let popup = document.querySelector('.popup');
let editPopup = document.querySelector('.popup_type_edit');
let addPopup = document.querySelector('.popup_type_add');
let imagePopup = document.querySelector('.popup_type_image');

// профиль
let profile = container.querySelector('.profile')
let curName = container.querySelector('.profile__title');
let curJob = container.querySelector('.profile__job');

// кнопки
const editButton = container.querySelector('.profile__edit-btn');
const editCloseButton = editPopup.querySelector('.popup__close-btn');
const addButton = container.querySelector('.profile__add-btn');
const addCloseButton = addPopup.querySelector('.popup__close-btn');
const imageCloseButton = imagePopup.querySelector('.popup__close-btn');
const imageOpen = imagePopup.querySelector('.popup__container_type_image');

// Находим формы в DOM
const formElementEdit = editPopup.querySelector('.form__edit');
const formElementAdd = addPopup.querySelector('.form__add');

// Находим поля форм в DOM
let nameInput = formElementEdit.querySelector('.form__input-text_type_name');
let jobInput = formElementEdit.querySelector('.form__input-text_type_job');
let titleInput = formElementAdd.querySelector('.form__input-text_type_place-name');
let linkInput = formElementAdd.querySelector('.form__input-text_type_place-link');

// карточки
const placesList = document.querySelector('.places');
const placeTemplate = document.querySelector('.place-template').content;

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
// инициализация карточки
function getCard(card) {
  const placeElement = placeTemplate.cloneNode(true);
  const placeTitle = placeElement.querySelector('.place__title');
  const placeLink =  placeElement.querySelector('.place__image');
  placeElement.querySelector('.place__delete').addEventListener('click', handleDelete);
  placeElement.querySelector('.place__like').addEventListener('click', handleLike);
  placeElement.querySelector('.place__image').addEventListener('click', function () {imagePopupOpen(card)});
  placeTitle.textContent = card.name;
  placeLink.src = card.link;
  placeLink.alt = card.name;
  return placeElement;
}
// инициализация исходного массива
initialCards.forEach(function (element) {
  placesList.append(getCard(element));
})
// лайк карточки
function handleLike (evt) {
  evt.target.classList.toggle('place__like_active');
}
// удаление карточки
function handleDelete (evt) {
  evt.target.closest('.place').remove('place');
}
function popupOpened (current_popup) {
  current_popup.classList.add('popup_opened');
}
function popupClose (current_popup) {
  current_popup.classList.remove('popup_opened');
}
function editPopupOpen () {
    popupOpened(editPopup);
    nameInput.value = curName.textContent;
    jobInput.value = curJob.textContent;
}
function addPopupOpen () {
  popupOpened(addPopup);
}
// просмотр картинки
function imagePopupOpen (card) {
  imageOpen.classList.remove('popup__container');
  const image = imagePopup.querySelector('.popup__image');
  const title = imagePopup.querySelector('.popup__title');
  image.src = card.link;
  title.textContent = card.name;
  popupOpened(imagePopup);
} 
// отправка формы профиля
function formSubmitEdit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  curName.textContent = nameInput.value;
  curJob.textContent = jobInput.value;
  popupClose(editPopup);
}
// добавление новой карточки
function addCardSubmit (card) {
  card.preventDefault();
  card.name = titleInput.value;
  card.link = linkInput.value;
  card.alt = titleInput.value;
  placesList.prepend(getCard(card));
  popupClose(addPopup);
  titleInput.value = '';
  linkInput.value = '';
}

editButton.addEventListener('click', editPopupOpen);
addButton.addEventListener('click', addPopupOpen);
editCloseButton.addEventListener('click', function() {popupClose(editPopup)});
addCloseButton.addEventListener('click', function() {popupClose(addPopup)});
imageCloseButton.addEventListener('click', function(){popupClose(imagePopup)});
formElementEdit.addEventListener('submit', formSubmitEdit);
formElementAdd.addEventListener('submit', addCardSubmit);