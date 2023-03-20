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
		setEventListeners(
			formElement,
			config.inputSelector,
			config.saveSelector,
			config.saveInactiveClass,
			config.saveConditionHoverClass, config.inputErrorClass, config.ElementErrorClass
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
function offButton(buttonElement,	saveInactiveClass, saveConditionHoverClass) {
	//кнопка неактивна
	buttonElement.disabled = true;
	//добавляем класс
	buttonElement.classList.add(saveInactiveClass);
	//удаляем класс стилизации по наведению
	buttonElement.classList.remove(saveConditionHoverClass);
};

//функция включения кнопки
const onButton = (
	buttonElement,
	saveInactiveClass,
	saveConditionHoverClass
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
	saveInactiveClass,
	saveConditionHoverClass
) => {
	// Если есть хотя бы один невалидный инпут
	if (hasInvalidInput(inputList)) {
		//функция выключения кнопки
		offButton(buttonElement, saveInactiveClass, saveConditionHoverClass);
		////кнопка неактивна
		//buttonElement.disabled = true;
		////добавляем класс
		//buttonElement.classList.add(saveInactiveClass);
		////удаляем класс стилизации по наведению
		//buttonElement.classList.remove(saveConditionHoverClass);
	} else {
    onButton(buttonElement, saveInactiveClass, saveConditionHoverClass);
		////убираем класс
		//buttonElement.classList.remove(saveInactiveClass);
		////кнопка активна
		//buttonElement.disabled = false;
		////добавляем класс по focus
		//buttonElement.classList.add(saveConditionHoverClass);
	}
};

//функция слушателя
const setEventListeners = (
	formElement,
	inputSelector,
	saveSelector,
	saveInactiveClass,
	saveConditionHoverClass, inputErrorClass, ElementErrorClass
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
			isValid(formElement, inputElement, inputErrorClass, ElementErrorClass);
			// вызываем функцию активации кнопки
			toggleButtonState(
				inputList,
				buttonElement,
				saveInactiveClass,
				saveConditionHoverClass
			);
		});
	});
};

///проверяем валидность
const isValid = (formElement, inputElement, inputErrorClass, ElementErrorClass) => {
	//если ввод валиден
	if (inputElement.validity.valid) {
		//передаем форму и ввод в функцию отключения показа ошибки
		hideInputError(formElement, inputElement, inputErrorClass, ElementErrorClass);
	} else {
		//если инпут не валиден передаем форму, инпут и текст ошибки в функцию показа ошибки
		showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, ElementErrorClass);
	}
};

//функция отображения ошибки. Принимает форму, ввод и текст ошибки
const showInputError = (formElement, inputElement, errorMessage,inputErrorClass, ElementErrorClass) => {
	// Находим span по классу
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	//добавляем инпуту класс, показывающий ошибку
	inputElement.classList.add(inputErrorClass);
	//добавляем span текст ошибки
	errorElement.textContent = errorMessage;
	//делаем span активным
	errorElement.classList.add(ElementErrorClass);
};

//функция отключения показа ошибки
const hideInputError = (formElement, inputElement, inputErrorClass, ElementErrorClass) => {
	// Находим элемент ошибки
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	//удаляем классы
	inputElement.classList.remove(inputErrorClass);
	errorElement.classList.remove(ElementErrorClass);
};

enableValidation({
	inputSelector: ".popup__input",
	saveSelector: ".popup__save",
	saveInactiveClass: "popup__save_inactive",
	saveConditionHoverClass: "popup__save_condition_hover",
  inputErrorClass: "popup__input_type_error",
  ElementErrorClass: "popup__input-error_active",
});
