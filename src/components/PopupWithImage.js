import Popup from "./Popup";

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector)
        this._link = document.querySelector('.fullcard__img')
        this._name = document.querySelector('.fullcard__name')
    }

    openPopup(name, link) {
        super.openPopup()
        this._link.src = link
        this._link.alt = name
        this._name.textContent = name
    }
}