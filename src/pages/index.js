import "./index.css";

import { initialCards } from "../scripts/utils/constants.js";
import { profileEditButton } from "../scripts/utils/constants.js";
import { placeAddButton } from "../scripts/utils/constants.js";
import { profileInputName } from "../scripts/utils/constants.js";
import { profileInputOcupation } from "../scripts/utils/constants.js";
import { placeTemplate } from "../scripts/utils/constants.js";
import { formPlaceAdd } from "../scripts/utils/constants.js";
import { formProfileEdit } from "../scripts/utils/constants.js";
import { validationConfig } from "../scripts/utils/constants.js";
import Card from "../scripts/components/card.js";
import FormValidator from "../scripts/components/formValidator.js";
import Section from "../scripts/components/section.js";
import Popup from "../scripts/components/popup.js";
import PopupWithImage from "../scripts/components/popupWithImage.js";
import PopupWithForm from "../scripts/components/popupWithForm.js";
import UserInfo from "../scripts/components/userInfo.js";

//отменяем стандартную отправку формы
(function () {
	//при submit
	addEventListener("submit", function (evt) {
		//отменяем стандартную отправку формы
		evt.preventDefault();
	});
})();

const generateCard = (item) => {
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
	return place;
};

//создаем элемент класса отрисовки карточек
const cardList = new Section(
	{
		//колбэк инструкция по связыванию с card
		renderer: (item) => {
			const place = generateCard(item);
			//вставляем в контейнер
			cardList.addItem(place);
		},
	},
	//селектор контейнера для вставки карточек
	".grid-places"
);

//запускаем метод перебора карточек
cardList.renderAllElements(initialCards.reverse());

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
	const newCard = generateCard({ name, src });
	////создаем новую карточку и вставляем в разметку
	cardList.addItem(newCard);
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
