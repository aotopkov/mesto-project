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

const profileEditBtn = document.querySelector(".profile__btn-edit");
const popupProfile = document.querySelector(".popup_section_profile");
const profileName = document.querySelector(".profile__data-name");
const profileAbout = document.querySelector(".profile__data-about");
const profileNameEdit = document.querySelector(".popup__profile-name");
const profileAboutEdit = document.querySelector(".popup__profile-about");
const profileEditForm = document.querySelector('.popup__forms_section_profile')

const popupCardAdd = document.querySelector('.card__btn-add')
const popupCard = document.querySelector(".popup_section_card");
const cardBtnExit = document.querySelector(".popup__btn-exit_section_card");
const cardNameEdit = document.querySelector(".popup__card-name");
const cardLinkEdit = document.querySelector(".popup__card-link");
const cardAddForm = document.querySelector('.popup__forms_section_card')
const fullCardPopup = document.querySelector('.fullcard');
const fullCardName = document.querySelector('.fullcard__name');
const fullCardImg = document.querySelector('.fullcard__img');

const cardContainer = document.querySelector('.cards');
const templateCard = document.querySelector('.template__card').content;

const buttonsExit = document.querySelectorAll('.popup__btn-exit');

//открытие попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//закрытие попапов

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

buttonsExit.forEach((btn) => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => {closePopup(popup)}) 
})

//Profile Edit

profileEditBtn.addEventListener('click', () => {
  openPopup(popupProfile); 
  profileNameEdit.value = profileName.textContent;
  profileAboutEdit.value = profileAbout.textContent;
})

function editProfile(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameEdit.value;
  profileAbout.textContent = profileAboutEdit.value;
  closePopup(popupProfile)
}

profileEditForm.addEventListener("submit", editProfile);


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
  cardContainer.prepend(createCard(cardNameEdit.value, cardLinkEdit.value));
  closePopup(popupCard);
  evt.target.reset(); 
}

cardAddForm.addEventListener('submit', addCard);


// добавление карточек из массива
//обход массива

сards.forEach(element => {
  cardContainer.append(createCard(element.name, element.link));
});
