//находим все формы в документе
const formList = Array.from(document.forms);
//конфиг со значениями, используемыми при валидации
const validationConfig = {
  inputSelector: ".popup__input",
	saveSelector: ".popup__save",
	errorInputClass: "popup__input_type_error",
	errorElementClass: "popup__input-error_active",
	saveConditionHoverClass: "popup__save_condition_hover",
	saveInactiveClass: "popup__save_inactive"
};

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
		setEventListeners(
			formElement,
			config.inputSelector,
			config.saveSelector,
			config.errorInputClass,
			config.errorElementClass,
			config.saveConditionHoverClass,
			config.saveInactiveClass
		);
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
function offButton(buttonElement, saveConditionHoverClass, saveInactiveClass) {
	//кнопка неактивна
	buttonElement.disabled = true;
	//добавляем класс
	buttonElement.classList.add(saveInactiveClass);
	//удаляем класс стилизации по наведению
	buttonElement.classList.remove(saveConditionHoverClass);
}

//функция включения кнопки
const onButton = (
	buttonElement,
	saveConditionHoverClass,
	saveInactiveClass
) => {
	//убираем класс
	buttonElement.classList.remove(saveInactiveClass);
	//кнопка активна
	buttonElement.disabled = false;
	//добавляем класс по focus
	buttonElement.classList.add(saveConditionHoverClass);
};

// Функция активации кнопки
const toggleButtonState = (
	inputList,
	buttonElement,
	saveConditionHoverClass,
	saveInactiveClass
) => {
	// Если есть хотя бы один невалидный инпут
	if (hasInvalidInput(inputList)) {
		//функция выключения кнопки
		offButton(buttonElement, saveConditionHoverClass, saveInactiveClass);
	} else {
		onButton(buttonElement, saveConditionHoverClass, saveInactiveClass);
	}
};

//функция слушателя
const setEventListeners = (
	formElement,
	inputSelector,
	saveSelector,
	errorInputClass,
	errorElementClass,
	saveConditionHoverClass,
	saveInactiveClass
) => {
	// Находим все инпуты внутри формы
	const inputList = Array.from(formElement.querySelectorAll(inputSelector));
	// Найдим в форме кнопку
	const buttonElement = formElement.querySelector(saveSelector);
	// перебираем инпуты
	inputList.forEach((inputElement) => {
		//для каждого ставим событие на ввод
		inputElement.addEventListener("input", function (evt) {
			//вызываем функцию проверки валидности
			isValid(formElement, inputElement, errorInputClass, errorElementClass);
			// вызываем функцию активации кнопки
			toggleButtonState(
				inputList,
				buttonElement,
				saveConditionHoverClass,
				saveInactiveClass
			);
		});
	});
};

///проверяем валидность
const isValid = (
	formElement,
	inputElement,
	errorInputClass,
	errorElementClass
) => {
	//если ввод валиден
	if (inputElement.validity.valid) {
		//передаем форму и ввод в функцию отключения показа ошибки
		hideInputError(
			formElement,
			inputElement,
			errorInputClass,
			errorElementClass
		);
	} else {
		//если инпут не валиден передаем форму, инпут и текст ошибки в функцию показа ошибки
		showInputError(
			formElement,
			inputElement,
			inputElement.validationMessage,
			errorInputClass,
			errorElementClass
		);
	}
};

//функция отображения ошибки. Принимает форму, ввод и текст ошибки
const showInputError = (
	formElement,
	inputElement,
	errorMessage,
	errorInputClass,
	errorElementClass
) => {
	// Находим span по классу
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	//добавляем инпуту класс, показывающий ошибку
	inputElement.classList.add(errorInputClass);
	//добавляем span текст ошибки
	errorElement.textContent = errorMessage;
	//делаем span активным
	errorElement.classList.add(errorElementClass);
};

//функция отключения показа ошибки
const hideInputError = (
	formElement,
	inputElement,
	errorInputClass,
	errorElementClass
) => {
	// Находим элемент ошибки
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	//удаляем классы
	inputElement.classList.remove(errorInputClass);
	errorElement.classList.remove(errorElementClass);
};

enableValidation(validationConfig);
