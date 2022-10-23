import Popup from "./Popup";

export default class PopupCardDelete extends Popup {
    constructor(selector, deleteCard) {
        super(selector)
        this._form = this._popup.querySelector('.forms')
        this._button = this._form.elements.submit
        this._deleteCard = deleteCard
    }

    setEventListener() {
        super.setEventListener()
        this._button.addEventListener('click', this._deleteCard)
    }

    changeSubmitBtnText() {
        this._formSubmitButtonText = this._button.textContent
        this._button.textContent = 'Удаляем...'
      }
  
      returnSubmitBtnText() {
        this._button.textContent = this._formSubmitButtonText
        this._button.removeEventListener('click', this._deleteCard)
      }
}