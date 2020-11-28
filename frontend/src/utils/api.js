export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getHeaders() {
    const token = localStorage.getItem("token");

    return {
      ...this.headers,
      'Authorization': `Bearer ${token}`,
      "Content-Type": "application/json"
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
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._handleOriginalResponse);
  }

  changeLikeCardStatus (id, isLiked) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: `${isLiked ? "PUT" : "DELETE"}`,
      headers: this.getHeaders(),
    }).then(this._handleOriginalResponse);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    }).then(this._handleOriginalResponse);
  }
}

export const api = new Api({
  baseUrl: 'https://api.skred.students.nomoredomains.monster',
  headers: {
    "Content-Type": "application/json"
  }
});
