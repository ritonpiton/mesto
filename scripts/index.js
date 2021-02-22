const container = document.querySelector('.content');
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_add');
const imagePopup = document.querySelector('.popup_type_image');
// профиль
const curName = container.querySelector('.profile__title');
const curJob = container.querySelector('.profile__job');
// кнопки
const editButton = container.querySelector('.profile__edit-btn');
const editCloseButton = editPopup.querySelector('.popup__close-btn');
const addButton = container.querySelector('.profile__add-btn');
const addCloseButton = addPopup.querySelector('.popup__close-btn');
const imageCloseButton = imagePopup.querySelector('.popup__close-btn');
const imageOpen = imagePopup.querySelector('.popup__container_type_image');
// Находим формы в DOM
const formElementEdit = editPopup.querySelector('.form_type_edit');
const formElementAdd = addPopup.querySelector('.form_type_add');
// Находим поля форм в DOM
const formInput = document.querySelector('.form__input');
const nameInput = formElementEdit.querySelector('.form__input_type_name');
const jobInput = formElementEdit.querySelector('.form__input_type_job');
const titleInput = formElementAdd.querySelector('.form__input_type_place-name');
const linkInput = formElementAdd.querySelector('.form__input_type_place-link');
// просмотр картинки
const image = imagePopup.querySelector('.popup__image');
const title = imagePopup.querySelector('.popup__title');
// карточки
const placesList = document.querySelector('.places');
const placeTemplate = document.querySelector('.place-template').content;

// инициализация карточки
function getCard(card) {
  const placeElement = placeTemplate.cloneNode(true);
  const placeTitle = placeElement.querySelector('.place__title');
  const placeLink =  placeElement.querySelector('.place__image');  
  placeElement.querySelector('.place__delete').addEventListener('click', handleDelete); 
  placeElement.querySelector('.place__like').addEventListener('click', handleLike);
  placeLink.addEventListener('click', () => openPreviewPicture(card));
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
  evt.target.closest('.place').remove();
}
function openPopup (currentPopup) {
  currentPopup.classList.add('popup_opened');
}
function closePopup (currentPopup) {
  currentPopup.classList.remove('popup_opened');
}
function openEditPopup () {
    nameInput.value = curName.textContent;
    jobInput.value = curJob.textContent;
    openPopup(editPopup);
}
function openAddPopup () {
  openPopup(addPopup);
}
// просмотр картинки
function openPreviewPicture (card) {
  image.src = card.link;
  title.textContent = card.name;
  image.alt = card.name;
  openPopup(imagePopup);
} 
// отправка формы профиля
function submitEditForm (evt) {
  evt.preventDefault();
  curName.textContent = nameInput.value;
  curJob.textContent = jobInput.value;
  closePopup(editPopup);
}
// добавление новой карточки
function submitAddCard (evt) {
  evt.preventDefault();
  const card = {
    name: titleInput.value,
    link: linkInput.value
  }
  placesList.prepend(getCard(card));
  closePopup(addPopup);
  formElementAdd.reset(); 
}
//закрытие по ESC
function keyHandler (evt) {
  //поиск открытого попапа
  const popupActive = document.querySelector('.popup_opened')
  if (evt.key === 'Escape') {
    closePopup(popupActive);
  }
}
//закрытие по клике по оверлею
function closeByOverlay (evt) {
  //поиск открытого попапа
  const popupActive = document.querySelector('.popup_opened')
  if (evt.target === popupActive) {
    closePopup(popupActive);
  }
}

editButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', openAddPopup);
editCloseButton.addEventListener('click', () => closePopup(editPopup));
addCloseButton.addEventListener('click', () => closePopup(addPopup));
imageCloseButton.addEventListener('click', () => closePopup(imagePopup));
formElementEdit.addEventListener('submit', submitEditForm);
formElementAdd.addEventListener('submit', submitAddCard);
document.addEventListener('keydown', (evt) => keyHandler(evt));
document.addEventListener('click', (evt) => closeByOverlay(evt));