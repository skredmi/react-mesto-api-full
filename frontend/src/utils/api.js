export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getHeaders(){
    const token = localStorage.getItem('token');
    return {
      ...this.headers,
      'Authorization': `Bearer ${token}`,
    }
  }

  _handleOriginalResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this.getHeaders(),
    }).then(this._handleOriginalResponse);
  }

  getUserProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this.getHeaders(),
    }).then(this._handleOriginalResponse);
  }

  changeUserProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.getHeaders(),
      "Content-Type": "application/json",
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._handleOriginalResponse);
  }

  avatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.getHeaders(),
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._handleOriginalResponse);
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this.getHeaders(),
      "Content-Type": "application/json",
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._handleOriginalResponse);
  }

  changeLikeCardStatus (_id, isLiked) {
    return fetch(`${this._baseUrl}/cards/likes/${_id}`, {
      method: `${isLiked ? "PUT" : "DELETE"}`,
      headers: this.getHeaders(),
    }).then(this._handleOriginalResponse);
  }

  deleteCard(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    }).then(this._handleOriginalResponse);
  }
}

export const api = new Api({
  baseUrl: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});
