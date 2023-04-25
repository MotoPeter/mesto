export default class UserInfo {
	constructor(selectorName, selectorOcupation) {
		this._userName = document.querySelector(selectorName);
		this._userOcupation = document.querySelector(selectorOcupation);
	}

	//объект с данными пользователя
	getUserInfo() {
		const profileUser = {
			userName: this._userName.textContent,
			userOcupation: this._userOcupation.textContent,
		};
		return profileUser;
	}

  //метод записи изменений данных пользователя
	setUserInfo(formValues) {
		//присваиваем текстовому полю элемента с именем профиля новое имя из ввода popup
		this._userName.textContent = formValues["user-name"];
		//присваиваем текстовому полю элемента с родом занятий новое значение из ввода popup
		this._userOcupation.textContent = formValues["user-ocupation"];
	}
}
