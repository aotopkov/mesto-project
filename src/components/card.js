export const formNewCard = document.forms.newcard;
export const cardContainer = document.querySelector(".cards");
const templateCard = document.querySelector(".template__card").content;
const fullCardPopup = document.querySelector(".fullcard");
const fullCardName = document.querySelector(".fullcard__name");
const fullCardImg = document.querySelector(".fullcard__img");
const popupCardDelete = document.querySelector(".popup__card-delete");


import { openPopup, closePopup } from "./modal.js";
import { profileName } from "./index.js";
import { deleteCard, addLike, removeLike } from "./api.js";

export function createCard(name, link, likes, owner, id) {
  const cardElement = templateCard.querySelector(".card").cloneNode(true);
  cardElement.id = id;
  cardElement.querySelector(".card__name").textContent = name;
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.setAttribute("src", link);
  cardImage.setAttribute("alt", name);
  const cardLikebtn = cardElement.querySelector(".card__like");
  const cardLikeCounter = cardElement.querySelector(".card__like-counter");
  cardLikeCounter.textContent = likes.length;
  if (likes.some(elem => { if(elem.name == profileName.textContent){return true}})) {
    cardLikebtn.classList.add("card__like_active")
  }
  cardLikebtn.addEventListener("click", (evt) => {
    if (!evt.target.classList.contains("card__like_active")) {
      addLike(cardElement.id)
        .then((res) => {
          evt.target.classList.add("card__like_active");
          cardLikeCounter.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(err);});
    } else {
      removeLike(cardElement.id)
        .then((res) => {
          evt.target.classList.remove("card__like_active");
          cardLikeCounter.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(err);});
    }
  });
  let cardDeletebtn = cardElement.querySelector(".card__delete");
  if (owner !== profileName.textContent) {
    cardDeletebtn.classList.add("card__delete_hidden");
  }
  else {cardDeletebtn.addEventListener("click", () => {
    deleteCard(id)
    .then(() => {
        cardElement.closest(".card").remove();
        closePopup(popupCardDelete)
    })
    .catch((err) => {
      console.log(err);});
  });
  }

  cardElement.querySelector(".card__full-btn").addEventListener("click", () => {
    openPopup(fullCardPopup);
    fullCardName.textContent = name;
    fullCardImg.setAttribute("src", link);
    fullCardImg.setAttribute("alt", name);
  });
  return cardElement;
}

