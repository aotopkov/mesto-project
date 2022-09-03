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

const formEditProfile = document.forms.editprofile;
const profileEditBtn = document.querySelector(".profile__btn-edit");
const popupProfile = document.querySelector(".popup_section_profile");
const profileName = document.querySelector(".profile__data-name");
const profileAbout = document.querySelector(".profile__data-about");

const formNewCard = document.forms.newcard;
const popupCardAdd = document.querySelector('.card__btn-add');
const popupCard = document.querySelector(".popup_section_card");
const cardNameEdit = document.querySelector(".popup__card-name");
const cardLinkEdit = document.querySelector(".popup__card-link");
const fullCardPopup = document.querySelector('.fullcard');
const fullCardName = document.querySelector('.fullcard__name');
const fullCardImg = document.querySelector('.fullcard__img');

const cardContainer = document.querySelector('.cards');
const templateCard = document.querySelector('.template__card').content;

//Открытие и закрытие Попапов

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//закрытие окна по ESC 

function escapeKey (evt) {
  if (evt.key === 'Escape') {
    const popupOpen = document.querySelector('.popup_opened')
    closePopup(popupOpen)
    document.removeEventListener('keydown', escapeKey)
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', escapeKey)
}

document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup__btn-exit') || evt.target.classList.contains('popup')) {
    closePopup(evt.target.closest('.popup'))
  }
})

//Profile Edit

profileEditBtn.addEventListener('click', () => {
  openPopup(popupProfile); 
  formEditProfile.elements.name.value = profileName.textContent;
  formEditProfile.elements.about.value = profileAbout.textContent;
})

function editProfile(evt) {
  evt.preventDefault();
  profileName.textContent = formEditProfile.elements.name.value;
  profileAbout.textContent = formEditProfile.elements.about.value;
  closePopup(popupProfile)
}

formEditProfile.addEventListener("submit", editProfile);


//Card Add

popupCardAdd.addEventListener('click', () => {
  openPopup(popupCard);
})



function createCard (name, link) {
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

function addCard(evt) {
  evt.preventDefault();
  cardContainer.prepend(createCard(formNewCard.elements.name.value, formNewCard.elements.link.value));
  closePopup(popupCard);
  evt.target.reset(); 
}

formNewCard.addEventListener('submit', addCard);


// добавление карточек из массива
//обход массива

сards.forEach(element => {
  cardContainer.append(createCard(element.name, element.link));
});
