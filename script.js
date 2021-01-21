let container = document.querySelector('.content');

//кнопки
let editButton = container.querySelector('.profile__edit-btn');
let closeButton = container.querySelector('.popup_close');
let saveButton = container.querySelector('.form__submit-btn_action_save');
let overlay = container.querySelector('.overlay');
function togglePopup () {
    overlay.classList.toggle('overlay_active');
}
editButton.addEventListener('click', togglePopup); 
closeButton.addEventListener('click', togglePopup);
saveButton.addEventListener('click', togglePopup);
 

//поля ввода
let profile = container.querySelector('.profile');
let popup = container.querySelector('.popup');



let popupOpen = () => { 
    popup.classList.add('popup_open');
    let name = popup.querySelector('.input__text_type_name');
    let description = popup.querySelector('.input__text_type_description');
    let curName = profile.querySelector('.profile__title');
    let curDesc = profile.querySelector('.profile__description');

    console.log(name);
    console.log(description);
    console.log(curName);
    console.log(curDesc);

    name.value = curName.textContent;
    description.value = curDesc.textContent;

    console.log(name.value);
    console.log(description.value);
} 


let popupClose = () => {
    popupOpen.insertAdjacentHTML('beforeend', `
    <div class="input">
          <p class="input__text input__text_type_name">${curName.value}</p>
          <p class="input__text input__text_type_description">${curDesc.value}</p>
    </div>
`);
} 
 





saveButton.addEventListener('click', popupOpen);
