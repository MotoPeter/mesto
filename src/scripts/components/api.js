//создаем класс api для обмена информацией с сервером
export default class Api {
  //в конструктор url и заголовок в виде массива - токен авторизации и тип данных
	constructor(url, headers) {
		this._url = url;
		this._headers = headers;
	}

	//проверка статуса ответа
	_checkResponse(res) {
    //если статус 200, возвращаем промис с данными
		if (res.ok) {
			return res.json();
		}
    //если ошибка, возвращаем прмис со статусом ошибки
		return Promise.reject(`Ошибка: ${res.status}`);
	}

	//загрузка карточек с сервера
	getInitialCards() {
    //запрос на сервер на получение карточек
		return fetch(`${this._url}/cards`, {
			headers: this._headers,
      //получив промис проверяем статус 
		}).then((res) => this._checkResponse(res));
	}

	//получение данных пользователя с сервера
	getUserInfo() {
		return fetch(`${this._url}/users/me`, {
			headers: this._headers,
		}).then((res) => this._checkResponse(res));
	}

	//редактирование профиля на вход массив с именем и профессией
	editProfile(formValues) {
		return fetch(`${this._url}/users/me`, {
      //метод для частичного обновления
			method: "PATCH",
			headers: this._headers,
      //преобразуем в строку
			body: JSON.stringify({
				name: formValues["name"],
				about: formValues["about"],
			}),
      //полученный промис отправляем на проверку статуса
		}).then((res) => this._checkResponse(res));
	}

	//отправка на сервер новой карточки
	addNewCard(formValues) {
		return fetch(`${this._url}/cards`, {
      //метод для отправки данных
			method: "POST",
			headers: this._headers,
			body: JSON.stringify({
				name: formValues["name"],
				link: formValues["link"],
			}),
		}).then((res) => this._checkResponse(res));
	}

	//редактирование аватара
	editAvatar(formValues) {
		return fetch(`${this._url}/users/me/avatar`, {
			method: "PATCH",
			headers: this._headers,
			body: JSON.stringify({
				avatar: formValues["avatar"],
			}),
		}).then((res) => this._checkResponse(res));
	}

  deleteCard(placeId) {
    return fetch(`${this._url}/cards/${placeId}`, {
      //метод для отправки данных
			method: "DELETE",
			headers: this._headers,
		}).then((res) => this._checkResponse(res));
  }

  // Ставим лайк
  putLike(place) {
    return fetch(`${this._url}/cards/${place._id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(res => this._checkResponse(res));
  }

  // Убираем лайк
  delLike(place) {
    return fetch(`${this._url}/cards/${place._id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => this._checkResponse(res));
  }
}


