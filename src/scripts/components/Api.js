import { data } from "autoprefixer"

export default class Api {
    constructor(data) {
      this._url = data.url
      this._token = data.token
      this._headers = {
          authorization: this._token,
          'Content-type': 'application/json'
      }
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        else {
            return Promise.reject(`Ошибка ${res.status}`);
        }
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: {
                authorization: this._token
            }
        })
        .then(this._checkResponse)
    } 

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: {
                authorization: this._token
            }
        })
        .then(this._checkResponse)
    }

    setUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then(this._checkResponse)
    }

    setUserAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
        .then(this._checkResponse)
    }
    

    addCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(this._checkResponse)
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
            }
        })
        .then(this._checkResponse)
    }

    setLike(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: {
                authorization: this._token
            },
        })
        .then(this._checkResponse)
    }

    deleteLike(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
        .then(this._checkResponse)
    }
}