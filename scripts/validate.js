//находим все формы на странице и преобразуем в массив
//const formList = Array.from(document.forms);

//функция запуска валидации
const enableValidation = (formElement) => {
	////перебираем массив форм
	//formList.forEach((formElement) => {
		//при submit
		addEventListener("submit", function (evt) {
			//отменяем стандартную отправку формы
			evt.preventDefault();
		});
		//вызываем функцию слушателя инпутов
		setEventListeners(formElement);
};

//функция проверки валидности формы
const hasInvalidInput = (inputList) => {
  // перебираем массив методом some
  return inputList.some((inputElement) => {
    //возвращаем полученный результат
    return !inputElement.validity.valid;
  })
}; 

// Функция активации кнопки
const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    //кнопка неактивна
    buttonElement.disabled = true
    //добавляем класс
    buttonElement.classList.add('popup__save_inactive');
    buttonElement.classList.remove('popup__save_condition_hover');
  } else {
    //кнопка активна
    buttonElement.classList.remove('popup__save_inactive');
    //кнопка неактивна
    buttonElement.disabled = false;
    buttonElement.classList.add('popup__save_condition_hover');

  }
};

//функция слушателя
const setEventListeners = (formElement) => {
	// Находим все инпуты внутри формы,
	const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  // Найдим в форме кнопку
  const buttonElement = formElement.querySelector('.popup__save');
	// делаем кнопку не активной
  toggleButtonState(inputList, buttonElement);
  // перебираем инпуты
	inputList.forEach((input) => {
    //проверяем на валидность
    isValid(formElement, input)
    console.log(input.validity.valid)
		//для каждого ставим событие на ввод
		input.addEventListener("input", function (evt) {
      //вызываем функцию проверки валидности
			isValid(formElement, input);
      // вызываем функцию активации кнопки
      toggleButtonState(inputList, buttonElement);
		});
	});
};

///проверяем валидность
const isValid = (form, input) => {
	//если ввод валиден
	if (input.validity.valid) {
		//передаем форму и ввод в функцию отключения показа ошибки
		hideInputError(form, input);    ;
	} else {
		//если инпут не валиден передаем форму, инпут и текст ошибки в функцию показа ошибки
		showInputError(form, input, input.validationMessage);
	}
};



//функция отображения ошибки. Принимает форму, ввод и текст ошибки
const showInputError = (formElement, inputElement, errorMessage) => {
  // Находим span по классу
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  //добавляем инпуту класс, показывающий ошибку
  inputElement.classList.add('popup__input_type_error');
  //добавляем span текст ошибки
  errorElement.textContent = errorMessage;
  //делаем span активным
  errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};


