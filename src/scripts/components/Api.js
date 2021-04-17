import { data } from "autoprefixer"

export default class Api {
    constructor(data) {
      this._url = data.url
      this._token = data.token
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: {
                authorization: this._token
            }
        })
        .then(res => res.ok
            ? res.json()
            : Promise.reject(`Ошибка ${res.status}`))
    } 

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: {
                authorization: this._token
            }
        })
        .then(res => res.ok
            ? res.json()
            : Promise.reject(`Ошибка ${res.status}`))
    }

    setUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then(res => res.ok
            ? res.json()
            : Promise.reject(`Ошибка ${res.status}`))
    }

    setUserAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
        .then(res => res.ok
            ? res.json()
            : Promise.reject(`Ошибка ${res.status}`))
    }
    

    addCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(res => res.ok
            ? res.json()
            : Promise.reject(`Ошибка ${res.status}`))
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
            }
        })
        .then(res => res.ok
            ? res.json()
            : Promise.reject(`Ошибка ${res.status}`))
    }

    setLike(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: {
                authorization: this._token
            },
        })
        .then(res => res.ok
            ? res.json()
            : Promise.reject(`Ошибка ${res.status}`))
    }

    deleteLike(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
            .then(res => res.ok
                ? res.json()
                : Promise.reject(`Ошибка ${res.status}`))
    }
}