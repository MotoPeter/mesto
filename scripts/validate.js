//находим все формы в документе
const formList = Array.from(document.forms);

const cancelStandardBehavior = () => {
	//при submit
	addEventListener("submit", function (evt) {
		//отменяем стандартную отправку формы
		evt.preventDefault();
	});
};
//функция запуска валидации
const enableValidation = (config) => {
	//перебираем массив форм
	formList.forEach((formElement) => {
		//вызываем функцию слушателя инпутов
		setEventListeners(formElement, config.inputSelector, config.saveSelector);
	});
};

//функция проверки валидности формы
const hasInvalidInput = (inputList) => {
	// перебираем массив методом some
	return inputList.some((inputElement) => {
		//возвращаем полученный результат
		return !inputElement.validity.valid;
	});
};

//функция выключения кнопки кнопки
function offButton(buttonElement) {
	//кнопка неактивна
	buttonElement.disabled = true;
	//добавляем класс
	buttonElement.classList.add("popup__save_inactive");
	//удаляем класс стилизации по наведению
	buttonElement.classList.remove("popup__save_condition_hover");
}

//функция включения кнопки
const onButton = (buttonElement) => {
	//убираем класс
	buttonElement.classList.remove("popup__save_inactive");
	//кнопка активна
	buttonElement.disabled = false;
	//добавляем класс по focus
	buttonElement.classList.add("popup__save_condition_hover");
};

// Функция активации кнопки
const toggleButtonState = (inputList, buttonElement) => {
	// Если есть хотя бы один невалидный инпут
	if (hasInvalidInput(inputList)) {
		//функция выключения кнопки
		offButton(buttonElement);
	} else {
		onButton(buttonElement);
	}
};

//функция слушателя
const setEventListeners = (formElement, inputSelector, saveSelector) => {
	// Находим все инпуты внутри формы
	const inputList = Array.from(formElement.querySelectorAll(inputSelector));
	// Найдим в форме кнопку
	const buttonElement = formElement.querySelector(saveSelector);
	// перебираем инпуты
	inputList.forEach((inputElement) => {
		//для каждого ставим событие на ввод
		inputElement.addEventListener("input", function (evt) {
			//вызываем функцию проверки валидности
			isValid(formElement, inputElement);
			// вызываем функцию активации кнопки
			toggleButtonState(inputList, buttonElement);
		});
	});
};

///проверяем валидность
const isValid = (formElement, inputElement) => {
	//если ввод валиден
	if (inputElement.validity.valid) {
		//передаем форму и ввод в функцию отключения показа ошибки
		hideInputError(formElement, inputElement);
	} else {
		//если инпут не валиден передаем форму, инпут и текст ошибки в функцию показа ошибки
		showInputError(formElement, inputElement, inputElement.validationMessage);
	}
};

//функция отображения ошибки. Принимает форму, ввод и текст ошибки
const showInputError = (formElement, inputElement, errorMessage) => {
	// Находим span по классу
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	//добавляем инпуту класс, показывающий ошибку
	inputElement.classList.add("popup__input_type_error");
	//добавляем span текст ошибки
	errorElement.textContent = errorMessage;
	//делаем span активным
	errorElement.classList.add("popup__input-error_active");
};

//функция отключения показа ошибки
const hideInputError = (formElement, inputElement) => {
	// Находим элемент ошибки
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	//удаляем классы
	inputElement.classList.remove("popup__input_type_error");
	errorElement.classList.remove("popup__input-error_active");
};

enableValidation({
	inputSelector: ".popup__input",
	saveSelector: ".popup__save",
});
