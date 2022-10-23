export default class Popup {
    constructor(selector) {
      this._popup = document.querySelector(`.${selector}`)
    }
  
    //закрытие окна по ESC
  
    _closeFromEscKey = (evt) => {
      if (evt.key === "Escape") {
        this.closePopup();
        }
      }
    
    openPopup() {
      this._popup.classList.add("popup_opened");
      document.addEventListener("keydown", this._closeFromEscKey);
    }
  
    closePopup() {
      this._popup.classList.remove("popup_opened");
      document.removeEventListener("keydown", this._closeFromEscKey);
    }
  
    setEventListener() {
      this._popup.addEventListener("click", (evt) => {
        if (
        evt.target.classList.contains("popup__btn-exit") ||
        evt.target.classList.contains("popup__container")
      ) {
        this.closePopup();
      }})
    }
  
  }