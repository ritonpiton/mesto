// класс валидации полей ввода
export default class FormValidator {
  constructor (config, form) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = form;
  }
  // показать сообщение об ошибке
  _showInputError (inputElement, errorMessage) { 
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`); 
    inputElement.classList.add(this._inputErrorClass); 
    errorElement.textContent = errorMessage; 
    errorElement.classList.add(this._errorClass);
    
  }; 
  // скрыть сообщение об ошибке 
  _hideInputError (inputElement) { 
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`); 
    inputElement.classList.remove(this._inputErrorClass); 
    errorElement.classList.remove(this._errorClass); 
    errorElement.textContent = ''; 
  }; 
  // проверка валидности инпутов
  _checkInputValidity (inputElement) { 
    if (!inputElement.validity.valid) { 
      this._showInputError(inputElement, inputElement.validationMessage); 
    } else { 
      this._hideInputError(inputElement); 
    } 
  }
  // есть ли невалидные данные
  _hasInvalidInput () { 
    return this._inputList.some((inputElement) => { 
      return !inputElement.validity.valid; 
    }) 
  }
  // изменение состояния кнопки
  _toggleButtonState () { 
    const button = this._form.querySelector(this._submitButtonSelector);
    if (this._hasInvalidInput()){
      button.classList.add(this._inactiveButtonClass);
    }
    else {
      button.classList.remove(this._inactiveButtonClass);
    }
  }
  // установка слушателей
  _setEventListeners () {
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
    this._toggleButtonState();
  }
  // валидация формы
  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}