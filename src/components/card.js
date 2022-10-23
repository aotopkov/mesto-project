export default class Card {

  constructor (
    {name, link, likes, owner}, 
    templateSelector, 
    {handleCardClick, deleteCardClick, likeCardClick}) {
      this._name = name;
      this._link = link;
      this._likes = likes;
      this._owner = owner;
      this._templateSelector = templateSelector;
      this._isLiked = false;

      this._handleCardClick = handleCardClick;
      this._deleteCardClick = deleteCardClick;
      this._likeCardClick = likeCardClick;

      this._cardElement = 
      document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
      this._cardImage = this._cardElement.querySelector(".card__image");
      this._likesCounterElement = this._cardElement.querySelector(".card__like-counter");
      this._deleteCardButton = this._cardElement.querySelector(".card__delete");
      this._likeButton = this._cardElement.querySelector(".card__like");
  }

  generate () {
    this._createCardElement();
    this._setEventListeners();
    return this._cardElement;
  }

  getIsLiked() {
    return this._isLiked;
  }

  deleteCard() {
    this._cardElement.remove();
  }

  updateLikeButton({likes}) {
    this._updateLikesCounter(likes);
    this._likeButtonState();
  }

  _createCardElement() {
    this._cardImage.setAttribute("src", this._link);
    this._cardImage.setAttribute("alt", this._name);
    this._cardElement.querySelector(".card__name").textContent = this._name;

    this._likesCounterState();

    this._likeButtonState();

    if (!this._isCardCreatedByUser()){
      this._deleteCardButton.remove();
    }
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", this._handleCardClick);
    this._likeButton.addEventListener("click", this._likeCardClick);
    if (this._isCardCreatedByUser()){
      this._deleteCardButton.addEventListener("click", this._deleteCardClick);
    }
  }

  _likeButtonState() {
    if (this._isCardLikedByUser()) {
      this._likeButton.classList.add("card__like_active");
    } else {
      this._likeButton.classList.remove("card__like_active");
    }
  }

  _likesCounterState() {
    this._likesCounterElement.textContent = this._likes.length;
  }

  _updateLikesCounter (likes) {
    this._likes = likes;
    this._likesCounterState();
  }

  _isCardLikedByUser() {
    this._isLiked = 
      this._likes.find((likeOwner) => likeOwner._id === sessionStorage.getItem('userID')) !== undefined ? true : false;
    return this._isLiked;
  }

  _isCardCreatedByUser() {
    return this._owner._id === sessionStorage.getItem('userID');
  }
}