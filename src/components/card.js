export const formNewCard = document.forms.newcard;
export const cardContainer = document.querySelector('.cards');
const templateCard = document.querySelector('.template__card').content;
const fullCardPopup = document.querySelector('.fullcard');
const fullCardName = document.querySelector('.fullcard__name');
const fullCardImg = document.querySelector('.fullcard__img');

import {openPopup} from './modal.js'

export function createCard (name, link) {
    const cardElement = templateCard.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__name').textContent = name;
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.setAttribute('src', link);
    cardImage.setAttribute('alt', name);
    cardElement.querySelector('.card__like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('card__like_active');
    })
    cardElement.querySelector('.card__delete').addEventListener('click', () => {
      cardElement.closest('.card').remove();
    })
    cardElement.querySelector('.card__full-btn').addEventListener('click', () => {
      openPopup(fullCardPopup);
      fullCardName.textContent = name;
      fullCardImg.setAttribute('src', link)
      fullCardImg.setAttribute('alt', name)
    })
    return cardElement;
  }


// Массив карточек
const сards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  сards.forEach(element => {
    cardContainer.append(createCard(element.name, element.link));
  });