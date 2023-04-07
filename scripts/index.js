import { initialCards } from "./constants.js";
import { profileEditButton } from "./constants.js";
import { placeAddButton } from "./constants.js";
import { popupProfileEdit } from "./constants.js";
import { popupPlaceAdd } from "./constants.js";
import { profileName } from "./constants.js";
import { profileOcupation } from "./constants.js";
import { profileInputName } from "./constants.js";
import { profileInputOcupation } from "./constants.js";
import { placeInputLocation } from "./constants.js";
import { placeInputImg } from "./constants.js";
import { gridPlaces } from "./constants.js";
import { placeTemplate } from "./constants.js";
import { formPlaceAdd } from "./constants.js";
import { formProfileEdit } from "./constants.js";
import { closeButtons } from "./constants.js";
import { validationConfig } from "./constants.js";
import { Card } from "./card.js";
import { FormValidator } from "./formValidator.js";
import { popupImgOpening } from "./constants.js";
import { popupImg } from "./constants.js";
import { placeFigureCaption } from "./constants.js";

// функция вставки карточки в разметку. Второй параметр указывет на порядок размещения карточки (по умолчанию в конец списка)
function createPlace(item, order = "append") {
	//получаем разметку карточки
	const card = new Card(item, placeTemplate, openPlaceImage);
	//вызываем метод создания карточки
	const place = card.generatePlace();
	//вставляем в код
	if (order === "prepend") {
		gridPlaces.prepend(place);
		//если нет в конец
	} else {
		gridPlaces.append(place);
	}
}

//обходим массив карточек вызывая функцию добавления карточки
initialCards.forEach(createPlace);

(function () {
	//при submit
	addEventListener("submit", function (evt) {
		//отменяем стандартную отправку формы
		evt.preventDefault();
	});
})();

//ФУНКЦИЯ ОТКРЫТИЯ ПОПАПА
function openPopup(popup) {
	//добавляем класс что бы popup стал видимым
	popup.classList.add("popup_openend");
	//добавляем слушатель клавиатуры с вызовом функции закрытия по esc
	document.addEventListener("keydown", closePopupEsc);
	//добавляем слушатель клика
	document.addEventListener("click", closePopupClick);
}

//функция открытия картинки
export function openPlaceImage(title, link) {
	//открываем попап
	openPopup(popupImgOpening);
	//добавляем атрибут src
	popupImg.setAttribute("src", link);
	//добавляем элементу текстовое значение
	placeFigureCaption.textContent = title;
	//добавляем атрибут alt
	popupImg.setAttribute("alt", `${title} .`);
}

//ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПА
function closePopup(popup) {
	//удаляем класс и popup снова невидим
	popup.classList.remove("popup_openend");
	//удаляем слушатель
	document.removeEventListener("keydown", closePopupEsc);
	//удаляем слушатель click
	document.removeEventListener("click", closePopupClick);
}

//ЗАПИСИ в value ТЕКСТА ИЗ ПРОФИЛЯ
function recordProfileInputsValues() {
	//из элемента с именем выделяем текст
	const profileNameText = profileName.textContent;
	//меняем значение value на текст из элемента с именем профиля
	profileInputName.value = profileNameText;
	//из элемента род занятий выделяем текст
	const profileOcupationText = profileOcupation.textContent;
	//меняем значение value на текст из элемента род занятий
	profileInputOcupation.value = profileOcupationText;
}

//функция получения value из инпутов
function getValueInputs(inputFirst, inputSecond) {
	//находим элемент первого ввода в popup
	const valueInputFirst = inputFirst.value;
	//находим элемент второго ввода в popup
	const valueInputSecond = inputSecond.value;
	return [valueInputFirst, valueInputSecond];
}

//функция записи изменений в профиле
function saveChangesProfile() {
	//вызываем функцию получения value
	const [nameInputValue, OcupationInputValue] = getValueInputs(
		profileInputName,
		profileInputOcupation
	);
	//присваиваем текстовому полю элемента с именем профиля новое имя из ввода popup
	profileName.textContent = nameInputValue;
	//присваиваем текстовому полю элемента с родом занятий новое значение из ввода popup
	profileOcupation.textContent = OcupationInputValue;
	//вызываем функцию закрытия попапа
	closePopup(popupProfileEdit);
}

//функция добавления карточки
function savePlaceNew() {
	//вызываем функцию получения value
	const popupInput = getValueInputs(placeInputLocation, placeInputImg);
	//вызываем функцию создания карточки и передаем ей созданный массив
	createPlace({ name: popupInput[0], src: popupInput[1] }, "prepend");
	//вызываем функцию закрытия попапа
	closePopup(popupPlaceAdd);
}

//при нажатии кнопки редактирования профиля
profileEditButton.addEventListener("click", function () {
	//вызываем функцию открытия и обновления value инпутов
	openPopup(popupProfileEdit);
	//функция записи value текста из профиля
	recordProfileInputsValues();
	//метод сброса ошибок валидации
	formValidatorProfileEdit.disableValidationInputs();
	//делаем кнопку не активной
	formValidatorProfileEdit.offButton();
});

//при нажатии кнопки добавления места
placeAddButton.addEventListener("click", function () {
	//вызываем функцию открытия и обновления value инпутов
	openPopup(popupPlaceAdd);
	//сбрасываем значение формы
	formPlaceAdd.reset();
	//метод сброса ошибок валидации
	formValidatorPlaceAdd.disableValidationInputs();
	//делаем кнопку не активной
	formValidatorPlaceAdd.offButton();
});

//обходим кнопки закрытия
closeButtons.forEach((button) => {
	//находим ближайший к кнопке попап
	const popup = button.closest(".popup");
	//устанавливаем обработчик закрытия на крестик
	button.addEventListener("click", function () {
		//вызываем функцию закрытия попапа
		closePopup(popup);
	});
});

//при наступлении события
popupProfileEdit.addEventListener("submit", function (evt) {
	//вызываем функцию закрытия попапа и записи изменений
	saveChangesProfile();
});

//при наступлении события
popupPlaceAdd.addEventListener("submit", function (evt) {
	//вызываем функцию закрытия попапа и создания новой карточки
	savePlaceNew();
	evt.target.reset();
});

//функция закрытия попапа по клику
function closePopupClick(evt) {
	if (evt.target.classList.contains("popup_openend")) {
		closePopup(evt.target);
	}
}

//функция закрытия попапа по esc
function closePopupEsc(evt) {
	if (evt.key === "Escape") {
		const popup = document.querySelector(".popup_openend");
		closePopup(popup);
	}
}

//создаем элемент класса валидации формы изменений профиля
const formValidatorProfileEdit = new FormValidator(
	formProfileEdit,
	validationConfig
);
//запускаем метод класса валидации
formValidatorProfileEdit.enableValidation();

//создаем элемент класса валидации формы добавления места
const formValidatorPlaceAdd = new FormValidator(formPlaceAdd, validationConfig);
//запускаем метод класса валидации
formValidatorPlaceAdd.enableValidation();
