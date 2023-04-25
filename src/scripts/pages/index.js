import "../../pages/index.css";

import { initialCards } from "../utils/constants.js";
import { profileEditButton } from "../utils/constants.js";
import { placeAddButton } from "../utils/constants.js";
import { profileInputName } from "../utils/constants.js";
import { profileInputOcupation } from "../utils/constants.js";
import { placeTemplate } from "../utils/constants.js";
import { formPlaceAdd } from "../utils/constants.js";
import { formProfileEdit } from "../utils/constants.js";
import { validationConfig } from "../utils/constants.js";
import Card from "../components/card.js";
import FormValidator from "../components/formValidator.js";
import Section from "../components/section.js";
import Popup from "../components/popup.js";
import PopupWithImage from "../components/popupWithImage.js";
import PopupWithForm from "../components/popupWithForm.js";
import UserInfo from "../components/userInfo.js";

//отменяем стандартную отправку формы
(function () {
	//при submit
	addEventListener("submit", function (evt) {
		//отменяем стандартную отправку формы
		evt.preventDefault();
	});
})();

//функция создания и вставки карточки в разметку
function drawMarcup(initialCards) {
	//создаем элемент класса отрисовки карточек
	const cardList = new Section(
		{
			//передаем начальный массив
			items: initialCards,
			//колбэк инструкция по связыванию с card
			renderer: (item) => {
				//создаем элемент класса карточек
				const card = new Card(
					{
						item,
						openPlaceImage: (title, link) =>
							popupWithImage.openPlaceImage(title, link),
					},
					placeTemplate
				);
				//вызываем метод создания карточки
				const place = card.generatePlace();
				//вставляем в контейнер
				cardList.addItem(place);
			},
		},
		//селектор контейнера для вставки карточек
		".grid-places"
	);
	//запускаем метод перебора карточек
	cardList.renderAllElements();
}

//отрисовываем первоначальный массив карточек
drawMarcup(initialCards.reverse());

//создаем элемент попапа открытия изображения
const popupWithImage = new PopupWithImage(".popup_value_img");
//метод слушателей клика
popupWithImage.setEventListeners();

//элемент класса попап - новая карточка
const popupPlaceAdd = new Popup(".popup_value_place-add");
//слушатели
popupPlaceAdd.setEventListeners();
//попап редактирования профиля
const popupEditProfile = new Popup(".popup_value_user-edit");

//при нажатии кнопки добавления места
placeAddButton.addEventListener("click", function () {
	//метод открытия попапа
	popupPlaceAdd.openPopup();
	//метод сброса ошибок валидации
	formValidatorPlaceAdd.disableValidationInputs();
	//делаем кнопку не активной
	formValidatorPlaceAdd.offButton();
});

//функция добавления новой карточки
function savePlaceNew(formValues) {
	////раскладываем по элементам значения ключей объекта
	const src = formValues["link-foto"];
	const name = formValues["place-name"];
	//добавляем объкт с полученными значениями в массив карточек
	initialCards.push({ name, src });
	////создаем новую карточку и вставляем в разметку (последний элемент массива)
	drawMarcup([initialCards.at(-1)]);
	//закрываем попап со сбросом формы
	popupFormPlaceAdd.closePopup();
}

//создаем элемент
const userInfo = new UserInfo(".profile__name", ".profile__ocupation");

//ЗАПИСИ в value ТЕКСТА ИЗ ПРОФИЛЯ
function recordProfileInputsValues() {
	//метод записи данных профиля пользователя
	const profileUser = userInfo.getUserInfo();
	//меняем значение value на текст из элемента с именем профиля
	profileInputName.value = profileUser.userName;
	//меняем значение value на текст из элемента род занятий
	profileInputOcupation.value = profileUser.userOcupation;
}

//функция записи изменений в профиле
function saveChangesProfile(formValues) {
	//метод записи изменений
	userInfo.setUserInfo(formValues);
	//закрываем попап
	popupFormEditProfile.closePopup();
}

//при нажатии кнопки редактирования профиля
profileEditButton.addEventListener("click", () => {
	//вызываем метод открытия попапа
	popupEditProfile.openPopup();
	//вызываем метод слушателей
	popupEditProfile.setEventListeners();
	//функция записи value текста из профиля
	recordProfileInputsValues();
	//метод сброса ошибок валидации
	formValidatorProfileEdit.disableValidationInputs();
	//делаем кнопку не активной
	formValidatorProfileEdit.offButton();
});

//эдемент класса попап-форма новая карточка
const popupFormPlaceAdd = new PopupWithForm({
	//селектор попапа
	popupSelector: ".popup_value_place-add",
	//колбэк
	handleFormSubmit: (formValues) => {
		//функция добавления новой карточки
		savePlaceNew(formValues);
	},
});

//слушатель для формы новой карточки
popupFormPlaceAdd.setEventListeners();

//элемент форма попапа редактирования профиля
const popupFormEditProfile = new PopupWithForm({
	popupSelector: ".popup_value_user-edit",
	handleFormSubmit: (formValues) => {
		//функция записи изменений
		saveChangesProfile(formValues);
	},
});

//слушатель формы редактирования профиля
popupFormEditProfile.setEventListeners();

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
