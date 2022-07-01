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

//открытие попапов
function openPopup(popup) {
  popup.style.opacity = '1';
  popup.style.visibility = 'visible';
}

//закрытие попапов

function closePopup(popup) {
  popup.style.opacity = '0';
  popup.style.visibility = 'hidden';
}


// popup Profile Edit
const profileEditBtn = document.querySelector(".profile__btn-edit");
const popupProfile = document.querySelector(".popup_section_profile");
const profileName = document.querySelector(".profile__data-name");
const profileAbout = document.querySelector(".profile__data-about");
const profileNameEdit = document.querySelector(".popup__profile-name");
const profileAboutEdit = document.querySelector(".popup__profile-about");
const profileEditForm = document.querySelector('.popup__forms_section_profile')
const profileBtnExit = document.querySelector('.popup__btn-exit');

profileEditBtn.addEventListener('click', () => {
  openPopup(popupProfile); 
  profileNameEdit.value = profileName.textContent;
  profileAboutEdit.value = profileAbout.textContent;
})

function resetProfileData() {
  profileNameEdit.value = "";
  profileAboutEdit.value = "";
}

function profileEdit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameEdit.value;
  profileAbout.textContent = profileAboutEdit.value;
  closePopup(popupProfile)
  resetProfileData()
}

profileEditForm.addEventListener("submit", profileEdit);

profileBtnExit.addEventListener('click', () => {
  closePopup(popupProfile);
  resetProfileData();
})

//popup Card Edit
const popupCardAdd = document.querySelector('.card__btn-add')
const popupCard = document.querySelector(".popup_section_card");
const cardBtnExit = document.querySelector(".popup__btn-exit_section_card");
const cardNameEdit = document.querySelector(".popup__card-name");
const cardLinkEdit = document.querySelector(".popup__card-link");
const cardAddForm = document.querySelector('.popup__forms_section_card')
const fullCardPopup = document.querySelector('.fullcard');
const fullCardName = document.querySelector('.fullcard__name');
const fullCardImg = document.querySelector('.fullcard__img');
const fullCardExit = document.querySelector('.fullcard__btn-exit')

//добавление карточек

popupCardAdd.addEventListener('click', () => {
  openPopup(popupCard);
})

function cardAddReset () {
  cardNameEdit.value = "";
  cardLinkEdit.value = "";
}

function addCard(evt) {
  evt.preventDefault();
  const cardContainer = document.querySelector('.cards');
  const templateCard = document.querySelector('.template__card').content;
  const cardElement = templateCard.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__name').textContent = cardNameEdit.value;
  cardElement.querySelector('.card__image').setAttribute('src', cardLinkEdit.value)
  cardElement.querySelector('.card__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like_active');
  })
  cardElement.querySelector('.card__delete').addEventListener('click', () => {
    cardElement.closest('.card').remove();
  })
  cardElement.querySelector('.card__full-btn').addEventListener('click', () => {
    openPopup(fullCardPopup);
    fullCardName.textContent = cardElement.querySelector('.card__name').textContent;
    fullCardImg.setAttribute('src', cardElement.querySelector('.card__image').getAttribute('src'))
    fullCardExit.addEventListener('click', () => {closePopup(fullCardPopup)})
  })
  cardContainer.append(cardElement);

  closePopup(popupCard);
  cardAddReset(); 
}

cardAddForm.addEventListener('submit', addCard);

cardBtnExit.addEventListener('click', () => {
  closePopup(popupCard);
  cardAddReset();
})

// добавление карточек из массива
//обход массива

сards.forEach(element => {
  const cardContainer = document.querySelector('.cards');
  const templateCard = document.querySelector('.template__card').content;
  const cardElement = templateCard.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__name').textContent = element.name;
  cardElement.querySelector('.card__image').setAttribute('src', element.link)
  cardElement.querySelector('.card__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like_active');
  })
  cardElement.querySelector('.card__delete').addEventListener('click', () => {
    cardElement.closest('.card').remove();
  })
  cardElement.querySelector('.card__full-btn').addEventListener('click', () => {
    openPopup(fullCardPopup)
    fullCardName.textContent = cardElement.querySelector('.card__name').textContent;
    fullCardImg.setAttribute('src', cardElement.querySelector('.card__image').getAttribute('src'))
    fullCardExit.addEventListener('click', () => {closePopup(fullCardPopup)})
  })
  cardContainer.append(cardElement);
});
