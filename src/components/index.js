import "../pages/index.css";
import { openPopup, closeFromOverlay, closePopup } from "./modal.js";
import { enableValidation, toggleButtonState } from "./validate.js";
import { createCard, formNewCard, cardContainer } from "./card.js";


const profileEditBtn = document.querySelector(".profile__btn-edit");
const popupCardAdd = document.querySelector(".card__btn-add");
const formEditProfile = document.forms.editprofile;
const profileName = document.querySelector(".profile__data-name");
const profileAbout = document.querySelector(".profile__data-about");
const popupProfile = document.querySelector(".popup_section_profile");
const popupCard = document.querySelector(".popup_section_card");


document.addEventListener("click", (evt) => {
  closeFromOverlay(evt);
});

//обработка формы изменения профиля

profileEditBtn.addEventListener("click", () => {
  openPopup(popupProfile);
  initProfileData();
});

function initProfileData() {
  formEditProfile.elements.name__input.value = profileName.textContent;
  formEditProfile.elements.about__input.value = profileAbout.textContent;
}
initProfileData();

function editProfile(evt) {
  evt.preventDefault();
  profileName.textContent = formEditProfile.elements.name__input.value;
  profileAbout.textContent = formEditProfile.elements.about__input.value;
  closePopup(popupProfile, evt);
}

formEditProfile.addEventListener("submit", editProfile);

//обработка формы новой карточки

popupCardAdd.addEventListener("click", () => {
  openPopup(popupCard);
});

function addCard(evt) {
    evt.preventDefault();
    cardContainer.prepend(createCard(formNewCard.elements.name.value, formNewCard.elements.link.value));
    closePopup(popupCard, evt);
    evt.target.reset()
  }

formNewCard.addEventListener("submit", addCard);

//подключение валидации

enableValidation({
    formSelector: '.forms',
    inputSelector: '.forms__input',
    submitButtonSelector: '.forms__submit',
    submitButtonInactive: '.forms__submit_inactive'
});
