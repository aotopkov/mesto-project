import "../pages/index.css";
import { openPopup, closePopup } from "./modal.js";
import { enableValidation } from "./validate.js";
import { createCard, formNewCard, cardContainer } from "./card.js";
import { getUser, postUser, getCards, postNewCard, editAvatar } from "./api";

const profileEditBtn = document.querySelector(".profile__btn-edit");
const popupCardAdd = document.querySelector(".card__btn-add");
const formEditProfile = document.forms.editprofile;
export const profileName = document.querySelector(".profile__data-name");
export const profileAbout = document.querySelector(".profile__data-about");
export const profileAvatar = document.querySelector(".profile__avatar");
const popupProfile = document.querySelector(".popup_section_profile");
const popupCard = document.querySelector(".popup_section_card");
const avatarEditBtn = document.querySelector('.profile__btn-edit-avatar')
const popupEditAvatar = document.querySelector('.popup__avatar-edit');
const formEditAvatar = document.forms.avataredit



//Данные пользователя с сервера

getUser()
.then((res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`)
})
.then((res) => {
  profileName.textContent = res.name;
  profileAbout.textContent = res.about;
  profileAvatar.setAttribute("src", res.avatar);
})
.catch((err) => {
  console.log(err);
});


//обработка формы изменения профиля

profileEditBtn.addEventListener("click", () => {
  openPopup(popupProfile);
  initProfileData();
});

function initProfileData() {
  formEditProfile.elements.name__input.value = profileName.textContent;
  formEditProfile.elements.about__input.value = profileAbout.textContent;
  formEditProfile.elements.submit.disabled = false
}

function editProfile(evt) {
  evt.preventDefault();
  formEditProfile.elements.submit.textContent = 'Сохранение...'
  postUser(formEditProfile)
  .then((res) => {
    if (res.ok) {
        profileName.textContent = formEditProfile.elements.name__input.value
        profileAbout.textContent = formEditProfile.elements.about__input.value
        formEditProfile.elements.submit.textContent = 'Сохранить'
        closePopup(popupProfile, evt)
    }
    else {
    return Promise.reject(`Ошибка: ${res.status}`)}
  })
  .catch((err) => {
    console.log(err);})

}

formEditProfile.addEventListener("submit", editProfile);


// Сменить аватар

avatarEditBtn.addEventListener('click', () => {
  openPopup(popupEditAvatar)
})

formEditAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault();
  formEditAvatar.elements.submit.textContent = "Cохраняем..."
  editAvatar(formEditAvatar)
  .then((res) => {if (res.ok){
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`)})
  .then((res) => {
    profileAvatar.setAttribute("src", res.avatar)
    closePopup(popupEditAvatar)
    formEditAvatar.elements.submit.textContent = "Cохранить"
    evt.target.reset()
    formEditAvatar.elements.submit.disabled = true
  })
  .catch((err) => {
    console.log(err);})
})

// Отрисовка карточек с сервера

getCards()
.then((res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`)
})
.then((res) => {
  res.forEach((elem) => {
    cardContainer.prepend(createCard(elem.name, elem.link, elem.likes, elem.owner.name, elem._id))
  });
})
.catch((err) => {
  console.log(err);});


//обработка формы новой карточки

popupCardAdd.addEventListener("click", () => {
  openPopup(popupCard);
});

function addCard(evt) {
    evt.preventDefault();
    formNewCard.elements.submit.textContent = 'Создаём...'
    postNewCard(formNewCard)
    .then((res) => {
      if(res.ok) {
      return res.json()}
      return Promise.reject(`Ошибка: ${res.status}`)})
    .then((res) => {
      cardContainer.prepend(createCard(res.name, res.link, res.likes, res.owner.name, res._id))
      closePopup(popupCard, evt);
      formNewCard.elements.submit.textContent = 'Cоздать'
      evt.target.reset()
      formNewCard.elements.submit.disabled = true;
    }  
    )
    .catch((err) => {
      console.log(err);})}
    

formNewCard.addEventListener("submit", addCard);

//подключение валидации

enableValidation({
    formSelector: '.forms',
    inputSelector: '.forms__input',
    submitButtonSelector: '.forms__submit',
    submitButtonInactive: '.forms__submit_inactive'
});
