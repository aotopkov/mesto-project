export const settings = {
    input: 'forms__input',
    submitButtonSelector: 'forms__submit',
    submitButtonInactive: 'forms__submit_inactive'
}

export const userInfoSelectors = {
    nameSelector: '.profile__data-name',
    descriptionSelector: '.profile__data-about',
    avatarSelector: '.profile__avatar'
}

export const config = {
    url: "https://nomoreparties.co/v1/plus-cohort-14",
    headers: {
      authorization: "f9e9e49f-0819-4dc4-9e7e-0ee189046934",
      "Content-Type": "application/json",
    }
}

export const formEditProfile = document.forms.editprofile;
export const inputUserName = formEditProfile.elements.name;
export const inputUserDescription = formEditProfile.elements.about;
export const buttonOpenEditProfile = document.querySelector(".profile__btn-edit");

export const buttonOpenChangeAvatar = document.querySelector(".profile__btn-edit-avatar");
export const formChangeAvatar = document.forms.avataredit;

export const formAddCard = document.forms.newcard;

export const buttonOpenAddCard = document.querySelector(".card__btn-add");

export const inputPlaceName = document.querySelector("#newcard__name");
export const inputPlaceLink = document.querySelector("#newcard__link");
