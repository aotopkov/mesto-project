import Popup from "./Popup"
export default class PopupWithForm extends Popup {
    constructor(selector, popupFormToApi) {
      super(selector)
      this._popupFormToApi = popupFormToApi
      this._form = this._popup.querySelector('.forms')
      this._formSubmitButton = this._form.elements.submit
      this._inputs = Array.from(this._form.querySelectorAll('.forms__input'))
    }
  
    _getInputValues() {
      const inputsList = {}
      this._inputs.forEach((element) => {
        inputsList[element.name] = element.value
      }
    )
    return inputsList
    }
  
    setEventListener() {
      super.setEventListener()
      this._popup.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._popupFormToApi(this._getInputValues())
      })
    }

    changeSubmitBtnText() {
      this._formSubmitButtonText = this._formSubmitButton.textContent
      this._formSubmitButton.textContent = 'Сохраняем...'
    }

    returnSubmitBtnText() {
      this._formSubmitButton.textContent = this._formSubmitButtonText
    }
  
    closePopup() {
      super.closePopup()
      this._form.reset()
      
  
    }
  }