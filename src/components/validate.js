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
  
  function toggleButtonState (buttonElement, inputList) {
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
  
  const setEventListeners = (formElement, inputList, inputElement) => {
    const buttonElement = formElement.querySelector('.forms__submit')
    toggleButtonState(buttonElement, inputList)
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement)
      toggleButtonState(buttonElement, inputList)
    })
  }
  
  
  
  export function enableValidation () {
     const formList = Array.from(document.querySelectorAll(".forms"));
     formList.forEach((formElement) => {
       const inputList = Array.from(formElement.querySelectorAll(".forms__input"));
       inputList.forEach((inputElement) => {
         setEventListeners(formElement, inputList, inputElement)
       });
     });
   };
  
  
  