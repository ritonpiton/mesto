let container = document.querySelector('.content');
let popup = document.querySelector('.popup');

let editButton = container.querySelector('.profile__edit-btn');
let closeButton = popup.querySelector('.popup__close-btn');
//let saveButton = popup.querySelector('.form__submit-btn_action_save');

let profile = container.querySelector('.profile')
let curName = container.querySelector('.profile__title');
let curJob = container.querySelector('.profile__job');
// Находим форму в DOM
let formElement = popup.querySelector('.form');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.form__input-text_type_name');
let jobInput = formElement.querySelector('.form__input-text_type_job');

function popupOpen () {
    popup.classList.add('popup_opened');
    nameInput.value = curName.textContent;
    jobInput.value = curJob.textContent;
}

function popupClose () {
    popup.classList.remove('popup_opened');
}

function formSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    curName.textContent = nameInput.value;
    curJob.textContent = jobInput.value;
    popupClose();
}

editButton.addEventListener('click', popupOpen); 
closeButton.addEventListener('click', popupClose);
formElement.addEventListener('submit', formSubmit);