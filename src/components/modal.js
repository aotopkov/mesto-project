const formEditProfile = document.forms.editprofile;
const profileName = document.querySelector(".profile__data-name");
const profileAbout = document.querySelector(".profile__data-about");
const popupProfile = document.querySelector(".popup_section_profile");
export const popupCard = document.querySelector(".popup_section_card");

import { addCard, formNewCard } from "./card.js";

//Открытие и закрытие Попапов

export function closePopup(popup, evt) {
  popup.classList.remove("popup_opened");
}

//закрытие окна по ESC

function closeFromEscKey(evt) {
  if (evt.key === "Escape") {
    const popupOpen = document.querySelector(".popup_opened");
    closePopup(popupOpen);
    document.removeEventListener("keydown", closeFromEscKey);
  }
}

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeFromEscKey);
}

export const popupListeners = () => {
  const profileEditBtn = document.querySelector(".profile__btn-edit");
  const popupCardAdd = document.querySelector(".card__btn-add");
  document.addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("popup__btn-exit") ||
      evt.target.classList.contains("popup")
    ) {
      closePopup(evt.target.closest(".popup"), evt);
    }
  });
  profileEditBtn.addEventListener("click", () => {
    openPopup(popupProfile);
    initProfileData();
  });
  formEditProfile.addEventListener("submit", editProfile);
  popupCardAdd.addEventListener("click", () => {
    openPopup(popupCard);
  });
  formNewCard.addEventListener("submit", addCard);
};

export function initProfileData() {
  formEditProfile.elements.name__input.value = profileName.textContent;
  formEditProfile.elements.about__input.value = profileAbout.textContent;
}

function editProfile(evt) {
  evt.preventDefault();
  profileName.textContent = formEditProfile.elements.name__input.value;
  profileAbout.textContent = formEditProfile.elements.about__input.value;
  closePopup(popupProfile, evt);
}
