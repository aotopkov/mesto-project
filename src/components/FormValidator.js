export default class FormValidator {
    constructor(settings, form) {
      this._formElement = document.querySelector(`.${form}`),
      this._inputList = Array.from(this._formElement.querySelectorAll(`.${settings.input}`)),
      this._buttonElement = this._formElement.querySelector(`.${settings.submitButtonSelector}`),
      this._errorElement = function (inputElement) {return this._formElement.querySelector(`.${inputElement.id}_error`)}
      this._submitButtonInactive = settings.submitButtonInactive
    }
  
    _showInputError (inputElement, errorMessage) {
      this._errorElement(inputElement).textContent = errorMessage
    }
    
    _hideInputError(inputElement) {
      this._errorElement(inputElement).textContent = '';
    }
    
    _isThisInvalid() {
      return this._inputList.some((inputElement) => {
        return !inputElement.validity.valid
      })
    }
    
    _toggleButtonState() {
      if (this._isThisInvalid(this._inputList)) {
        this._buttonElement.classList.add(`${this._submitButtonInactive}`)
        this._buttonElement.disabled = true;
      }
      else {
        this._buttonElement.classList.remove(`${this._submitButtonInactive}`)
        this._buttonElement.disabled = false;
      }
    }
    
    
    _checkInputValidity(inputElement) {
      if(inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.getAttribute("data-error-message"))
      }
      else {
        inputElement.setCustomValidity('')
      }
    
      if(!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage)
      }
      else {
        this._hideInputError(inputElement)
      }
    }
  
    _setEventListeners() {
      this._toggleButtonState()
      this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._checkInputValidity(inputElement)
          this._toggleButtonState()
        })
      })
      
    }
  
    enableValidation() {
      this._setEventListeners()
    }
  
    resetError() {
      this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement)
        this._toggleButtonState()
      })
    }
  
  }
  