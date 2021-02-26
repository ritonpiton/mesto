// показать сообщение об ошибке в поле ввода 
const showInputError = (formElement, inputElement, inputErrorClass, errorClass, errorMessage) => { 
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
  inputElement.classList.add(inputErrorClass); 
  errorElement.textContent = errorMessage; 
  errorElement.classList.add(errorClass); 
}; 
// спрятать сообщение об ошибке 
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => { 
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
  inputElement.classList.remove(inputErrorClass); 
  errorElement.classList.remove(errorClass); 
  errorElement.textContent = ''; 
}; 
// проверяем валидность введенных данных 
const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => { 
  if (!inputElement.validity.valid) { 
    showInputError(formElement, inputElement, inputErrorClass, errorClass, inputElement.validationMessage); 
  } else { 
    hideInputError(formElement, inputElement, inputErrorClass, errorClass); 
  } 
}; 
// проверяем есть ли невалидные данные 
function hasInvalidInput (inputList) { 
  return inputList.some((inputElement) => { 
    return !inputElement.validity.valid; 
  }) 
} 
// ф-я меняющая состояние кнопки 
function toggleButtonState (inputList, buttonElement, inactiveButtonClass) { 
  if (hasInvalidInput(inputList)){
    buttonElement.classList.add(inactiveButtonClass);
  }
  else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
}
// вешаем слушатели на каждое поле ввода 
const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState (inputList, buttonElement, inactiveButtonClass);
    });
  });
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState (inputList, buttonElement, inactiveButtonClass);
};
//валидация всех полей
function enableValidation({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
  });
}
enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit-btn_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
});