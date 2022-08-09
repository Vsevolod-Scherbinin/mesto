export default class Api {
  constructor(host, token) {
    this._host = host;
    this._token = token;
    this._profileInfoHost = `${this._host}/users/me`;
    this._cardsHost = `${this._host}/cards`;
    this._headers = {
      authorization: this._token,
      'Content-Type': 'application/json'
    }
  }

  _getResOrError(res){
    if (res.ok){
      return res.json();
    }
    throw new Error('Ошибка при загрузке данных');
  }

  getUserInfo() {
    return fetch(this._profileInfoHost, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._getResOrError);
  }

  editProfile(editedName, editedAbout) {
    return fetch(this._profileInfoHost, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: editedName,
        about: editedAbout
      })
    })
      .then(this._getResOrError);
  }

  editAvatar(newAvatarURL) {
    return fetch(`${this._profileInfoHost}/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: newAvatarURL
      })
    })
      .then(this._getResOrError);
  }

  getCards() {
    return fetch(this._cardsHost, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._getResOrError);
  }

  addCard(card) {
    return fetch(this._cardsHost, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(card)
    })
      .then(this._getResOrError);
  }

  deleteCard(card) {
    return fetch(`${this._cardsHost}/${card._id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._getResOrError);
  }

  putLike(card) {
    return fetch(`${this._cardsHost}/${card._id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(this._getResOrError);
  }

  deleteLike(card) {
    return fetch(`${this._cardsHost}/${card._id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._getResOrError);
  }
}
