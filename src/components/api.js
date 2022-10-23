export default class Api {
  constructor ({url, headers}) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getCardsFromServer() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then((res) => this._checkResponse(res))
  }

  postNewCardToServer(name, link) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => this._checkResponse(res))
  }

  deleteCardFromServer(cardID) {
    return fetch(`${this._url}/cards/${cardID}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkResponse(res))
  }

  getUserInfoFromServer() {
    return fetch(`${this._url}/users/me`, {
      method: "get",
      headers: this._headers,
    }).then((res) => this._checkResponse(res))
  }

  postUserInfoToServer(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => this._checkResponse(res));
  }

  changeUserAvatarOnServer(link) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => this._checkResponse(res))
  }

  putLikeOnCard(cardID) {
    return fetch(`${this._url}/cards/likes/${cardID}`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._checkResponse(res))
  }

  deleteLikeFromCard(cardID) {
    return fetch(`${this._url}/cards/likes/${cardID}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkResponse(res))
  }
}




