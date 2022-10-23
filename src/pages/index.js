import "./index.css";
import Api from "../components/Api";
import UserInfo from "../components/UserInfo";
import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
import {
  buttonOpenEditProfile,
  buttonOpenChangeAvatar,
  buttonOpenAddCard,
  inputUserName,
  inputUserDescription,
  inputPlaceName,
  inputPlaceLink,
  settings, 
  userInfoSelectors,
  config
} from "../utils/utils";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import Section from "../components/Section";
import PopupCardDelete from "../components/PopupCardDelete";

const api = new Api(config);
const userInfo = new UserInfo(userInfoSelectors);
const popupFullImage = new PopupWithImage('fullcard')
const formEditProfileValidate = new FormValidator(settings, 'popup_section_profile')
const formEditAvatarValidate = new FormValidator(settings, 'popup__avatar-edit')
const formAddCardValidate = new FormValidator(settings, 'popup_section_card')

let section = null;

function renderPage() {

  Promise.all([api.getUserInfoFromServer(), api.getCardsFromServer()])
    .then(([user, cards]) => {
      sessionStorage.setItem('userID', user._id);
      userInfo.setUserInfo(user);
      renderCards(cards);
    })
    .catch((err) => {
      console.log(err);
    });
}

function renderCards(cardsArray) {
  section = new Section(
    function(card) {
      section.addItem(createCard(card));
    }, '.cards')
  section.renderElements(cardsArray);
}

function createCard(cardInfo) {
  const card = new Card(cardInfo, '.template__card', {
    handleCardClick: function() {
      popupFullImage.openPopup(cardInfo.name, cardInfo.link)
    },
    deleteCardClick: function() {
      const handleCardDelete = new PopupCardDelete(
        'popup__card-delete', function() {
          handleCardDelete.changeSubmitBtnText()
          api.deleteCardFromServer(cardInfo._id)
        .then(() => {
          card.deleteCard();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          handleCardDelete.closePopup()
          handleCardDelete.returnSubmitBtnText()
        })
      })

      handleCardDelete.openPopup()
      handleCardDelete.setEventListener()
    },

    likeCardClick: function() {
      if (card.getIsLiked()) {
        api.deleteLikeFromCard(cardInfo._id)
          .then((res) => {
            card.updateLikeButton(res);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api.putLikeOnCard(cardInfo._id)
          .then((res) => {
            card.updateLikeButton(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } 
  });

  return card.generate();
}

window.addEventListener("DOMContentLoaded", renderPage);

//Попап открытия картинок
popupFullImage.setEventListener()

//Валидация форм
formEditProfileValidate.enableValidation()
formEditAvatarValidate.enableValidation()
formAddCardValidate.enableValidation()

//Редактирование профиля
const popupEditProfile = new PopupWithForm(
  "popup_section_profile",
  function (inputList) {
    popupEditProfile.changeSubmitBtnText()
    api.postUserInfoToServer(inputList.name, inputList.about)
      .then(() => {
        userInfo.setUserInfo(inputList)
        popupEditProfile.closePopup();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEditProfile.returnSubmitBtnText()
      });
  }
);
popupEditProfile.setEventListener()

buttonOpenEditProfile.addEventListener("click", function () {
  const info = userInfo.getUserInfo();
  inputUserName.value = info.name;
  inputUserDescription.value = info.about;
  formEditProfileValidate.resetError()
  popupEditProfile.openPopup();
});

// Смена аватара
const popupChangeAvatar = new PopupWithForm('popup__avatar-edit', function(data) {
  popupChangeAvatar.changeSubmitBtnText()
  api
    .changeUserAvatarOnServer(data.link)
    .then(() => {
      popupChangeAvatar.closePopup();
      userInfo.setUserAvatar(data.link)
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupChangeAvatar.returnSubmitBtnText()
    });
  })
  popupChangeAvatar.setEventListener()

buttonOpenChangeAvatar.addEventListener("click", () => {
  formEditAvatarValidate.resetError();
  popupChangeAvatar.openPopup();
});

//Добавление карточки
const popupAddCard = new PopupWithForm('popup_section_card', 
  function() {
    popupAddCard.changeSubmitBtnText()
    api.postNewCardToServer(inputPlaceName.value, inputPlaceLink.value)
    .then((cardInfo) => {
      popupAddCard.closePopup();
      section.addItem(createCard (cardInfo));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAddCard.returnSubmitBtnText()
    });
  })
  popupAddCard.setEventListener()

buttonOpenAddCard.addEventListener("click", function () {
  formAddCardValidate.resetError()
  popupAddCard.openPopup();
});




