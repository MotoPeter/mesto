export default class UserInfo {
	constructor(selectorName, selectorOcupation, selectorAvatar) {
		this._userName = document.querySelector(selectorName);
		this._userOcupation = document.querySelector(selectorOcupation);
		this._userAvatar = document.querySelector(selectorAvatar);
	}

	//объект с данными пользователя
	getUserInfo() {
		const profileUser = {
			userName: this._userName.textContent,
			userOcupation: this._userOcupation.textContent,
			userAvatar: this._userAvatar.src,
		};
		return profileUser;
	}

	//метод записи изменений данных пользователя
	setUserInfo(formValues) {
		//присваиваем текстовому полю элемента с именем профиля новое имя из ввода popup
		this._userName.textContent = formValues["name"];
		//присваиваем текстовому полю элемента с родом занятий новое значение из ввода popup
		this._userOcupation.textContent = formValues["about"];
		this._userAvatar.src = formValues["avatar"];
	}

	setUserAvatar(formValues) {
		this._userAvatar.src = formValues["avatar"];
	}
}
