// popup Profile Edit
const profileEditBtn = document.querySelector(".profile__btn-edit");
const profileExitBtn = document.querySelector(".popup__btn-exit_section_profile");
let popupProfile = document.querySelector(".popup_section_profile");

let profileName = document.querySelector(".profile__data-name");
let profileAbout = document.querySelector(".profile__data-about");
let profileNameEdit = document.querySelector(".popup__profile-name");
let profileAboutEdit = document.querySelector(".popup__profile-about");
const profileEditForm = document.querySelector('.popup__forms_section_profile')

profileEditBtn.addEventListener("click", () => {
  popupProfile.style.opacity = "1";
  popupProfile.style.visibility = "visible";
  profileNameEdit.value = profileName.textContent;
  profileAboutEdit.value = profileAbout.textContent;
});
profileExitBtn.addEventListener("click", () => {
  popupProfile.style.opacity = "0";
  popupProfile.style.visibility = "hidden";
  profileNameEdit.value = "";
  profileAboutEdit.value = "";
});

function profileEdit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameEdit.value;
  profileAbout.textContent = profileAboutEdit.value;
  popupProfile.style.opacity = "0";
  popupProfile.style.visibility = "hidden";
  profileNameEdit.value = "";
  profileAboutEdit.value = "";
}

profileEditForm.addEventListener("submit", profileEdit);

//popup Card Edit
const cardBtnAdd = document.querySelector(".profile__btn-add");
let popupCard = document.querySelector(".popup_section_card");
const cardBtnExit = document.querySelector(".popup__btn-exit_section_card");
let cardNameEdit = document.querySelector(".popup__card-name");
let cardLinkEdit = document.querySelector(".popup__card-link");

cardBtnAdd.addEventListener("click", () => {
  popupCard.style.opacity = "1";
  popupCard.style.visibility = "visible";
});
cardBtnExit.addEventListener("click", () => {
  popupCard.style.opacity = "0";
  popupCard.style.visibility = "hidden";
  cardNameEdit.value = "";
  cardLinkEdit.value = "";
});

//Кнопка Like

let likeBtn = document.querySelector(".card__like");

likeBtn.addEventListener("click", () => {
  likeBtn.classList.toggle("card__like_active");
});
