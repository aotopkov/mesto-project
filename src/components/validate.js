//Валидация форм

function showInputError (errorElement, errorMessage) {
    errorElement.textContent = errorMessage
  }
  
  function hideInputError (errorElement) {
    errorElement.textContent = '';
  }
  
  function isThisInvalid (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }
  
  export function toggleButtonState (buttonElement, inputList) {
    if (isThisInvalid(inputList)) {
      buttonElement.classList.add('forms__submit_inactive')
      buttonElement.disabled = true;
    }
    else {
      buttonElement.classList.remove('forms__submit_inactive')
      buttonElement.disabled = false;
    }
  }
  
  
  const checkInputValidity = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}_error`)
    if(inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage)
    }
    else {
      inputElement.setCustomValidity('')
    }
  
    if(!inputElement.validity.valid) {
      showInputError(errorElement, inputElement.validationMessage)
    }
    else {
      hideInputError(errorElement)
    }
  }
  
  const setEventListeners = (formElement, inputList, inputElement, settings) => {
    const buttonElement = formElement.querySelector(settings.submitButtonSelector)
    toggleButtonState(buttonElement, inputList)
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement)
      toggleButtonState(buttonElement, inputList)
    })
    formElement.addEventListener('submit', () => {
      toggleButtonState(buttonElement, inputList)
    })
  }
  
  
  
  export function enableValidation (settings) {
     const formList = Array.from(document.querySelectorAll(settings.formSelector));
     formList.forEach((formElement) => {
       const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
       inputList.forEach((inputElement) => {
         setEventListeners(formElement, inputList, inputElement, settings)
       });
     });
   };
  
  
  