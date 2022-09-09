//Открытие и закрытие Попапов

export function closePopup(popup, evt) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeFromEscKey);
  popup.removeEventListener("click", closeFromOverlay);
}

//закрытие окна по ESC

function closeFromEscKey(evt) {
  if (evt.key === "Escape") {
    const popupOpen = document.querySelector(".popup_opened");
    closePopup(popupOpen);
  }
}

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeFromEscKey);
  popup.addEventListener("click", closeFromOverlay);
  
}

export function closeFromOverlay (evt) {
  if (
    evt.target.classList.contains("popup__btn-exit") ||
    evt.target.classList.contains("popup")
  ) {
    closePopup(evt.currentTarget, evt);
  }
}
