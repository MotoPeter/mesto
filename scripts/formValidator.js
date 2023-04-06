//класс валидации. Для создания берем форму и конфиг
export class FormValidator {
	constructor(formElement, validationConfig) {
		this._formElement = formElement;
		this._inputSelector = validationConfig.inputSelector;
		this._saveSelector = validationConfig.saveSelector;
		this._errorInputClass = validationConfig.errorInputClass;
		this._errorElementClass = validationConfig.errorElementClass;
		this._saveConditionHoverClass = validationConfig.saveConditionHoverClass;
		this._saveInactiveClass = validationConfig.saveInactiveClass;
	}

	//метод отключения показа ошибки
	_hideInputError(inputElement) {
		// Находим элемент ошибки
		const errorElement = this._formElement.querySelector(
			`.${inputElement.id}-error`
		);
		//удаляем классы
		inputElement.classList.remove(this._errorInputClass);
		errorElement.classList.remove(this._errorElementClass);
	}

	//метод отображения ошибки. Принимает форму, ввод и текст ошибки
	_showInputError(inputElement, errorMessage) {
		// Находим span по классу
		const errorElement = this._formElement.querySelector(
			`.${inputElement.id}-error`
		);
		//добавляем инпуту класс, показывающий ошибку
		inputElement.classList.add(this._errorInputClass);
		//добавляем span текст ошибки
		errorElement.textContent = errorMessage;
		//делаем span активным
		errorElement.classList.add(this._errorElementClass);
	}

	//метод проверки валидность
	_isValid(inputElement) {
		//если ввод валиден
		if (inputElement.validity.valid) {
			//передаем форму и ввод в функцию отключения показа ошибки
			this._hideInputError(inputElement);
		} else {
			//если инпут не валиден передаем форму, инпут и текст ошибки в функцию показа ошибки
			this._showInputError(inputElement, inputElement.validationMessage);
		}
	}

	//метод проверки валидности формы
	_hasInvalidInput() {
		// перебираем массив методом some
		return this._inputList.some((inputElement) => {
			//возвращаем полученный результат
			return !inputElement.validity.valid;
		});
	}

	//функция выключения кнопки кнопки
	offButton() {
		//кнопка неактивна
		this._buttonElement.disabled = true;
		//добавляем класс
		this._buttonElement.classList.add(this._saveInactiveClass);
		//удаляем класс стилизации по наведению
		this._buttonElement.classList.remove(this._saveConditionHoverClass);
	}

	//функция включения кнопки
	_onButton() {
		//убираем класс
		this._buttonElement.classList.remove(this._saveInactiveClass);
		//кнопка активна
		this._buttonElement.disabled = false;
		//добавляем класс по focus
		this._buttonElement.classList.add(this._saveConditionHoverClass);
	}

	// Функция активации кнопки
	_toggleButtonState() {
		// Если есть хотя бы один невалидный инпут
		if (this._hasInvalidInput()) {
			//функция выключения кнопки
			this.offButton(
				this._buttonElement,
				this._saveConditionHoverClass,
				this._saveInactiveClass
			);
		} else {
			this._onButton(
				this._buttonElement,
				this._saveConditionHoverClass,
				this._saveInactiveClass
			);
		}
	}

	//функция сброса валидации
	resetValid() {
		this._inputList.forEach((input) => {
			this._hideInputError(input);
		});
	}

	//функция слушателя
	setEventListeners() {
		// Находим все инпуты внутри формы
		this._inputList = Array.from(
			this._formElement.querySelectorAll(this._inputSelector)
		);
		// Найдим в форме кнопку
		this._buttonElement = this._formElement.querySelector(this._saveSelector);
		// перебираем инпуты
		this._inputList.forEach((inputElement) => {
			//для каждого ставим событие на ввод
			inputElement.addEventListener("input", () => {
				//вызываем функцию проверки валидности
				this._isValid(inputElement);
				// вызываем функцию активации кнопки
				this._toggleButtonState();
			});
		});
	}
}
