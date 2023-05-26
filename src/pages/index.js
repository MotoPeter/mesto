import "./index.css";

//import { initialCards } from "../scripts/utils/constants.js";
import { profileEditButton } from "../scripts/utils/constants.js";
import { placeAddButton } from "../scripts/utils/constants.js";
import { profileInputName } from "../scripts/utils/constants.js";
import { profileInputOcupation } from "../scripts/utils/constants.js";
import { placeTemplate } from "../scripts/utils/constants.js";
import { formPlaceAdd } from "../scripts/utils/constants.js";
import { formProfileEdit } from "../scripts/utils/constants.js";
import { formAvatarEdit } from "../scripts/utils/constants.js";
import { validationConfig } from "../scripts/utils/constants.js";
import { avatarEditButton } from "../scripts/utils/constants.js";
import Card from "../scripts/components/card.js";
import FormValidator from "../scripts/components/formValidator.js";
import Section from "../scripts/components/section.js";
import Popup from "../scripts/components/popup.js";
import PopupWithImage from "../scripts/components/popupWithImage.js";
import PopupWithForm from "../scripts/components/popupWithForm.js";
import UserInfo from "../scripts/components/userInfo.js";
import Api from "../scripts/components/api.js";
import PopupWithSubmit from "../scripts/components/popupWithSubmit";

//отменяем стандартную отправку формы
(function () {
	//при submit
	addEventListener("submit", function (evt) {
		//отменяем стандартную отправку формы
		evt.preventDefault();
	});
})();

//токен для авторизации
const token = "6ea24768-e3b3-4cce-a68a-3bff993d63e5";
//переменная для сохранения id пользователя
let userId;
//создаем элемент api
const api = new Api("https://nomoreparties.co/v1/cohort-66", {
	authorization: token,
	"Content-Type": "application/json",
});

//отображаем полученные с сервера карточки и данные пользователя
Promise.all([api.getInitialCards(), api.getUserInfo()])
	.then(([initialCards, userInfo]) => {
		userId = userInfo._id;
		cardList.renderAllElements(initialCards.reverse());
		showChangesProfile(userInfo);
	})
	.catch((err) => {
		console.log(err);
	});

//функция создания карточки
const generateCard = (item) => {
	//создаем элемент класса card
	const card = new Card(
		{
			//передаем массив из названия и ссылки
			item,
			//колбэк открытия попапа картинки
			openPlaceImage: (title, link) =>
				popupWithImage.openPlaceImage(title, link),
		},
		//шаблон еарточки
		placeTemplate,
		//колбэк удадения карточки
		() => {
			//открытие попапа удаления
			popupDeletePlace.openPopup();
			//передаем id и карточку
			popupDeletePlace.getId(item, place);
		},
		//id пользователя, создавшего карточку
		userId,
		//установка лайка
		() => {
			//запрос на сервер
			api
				.putLike(item)
				.then((res) => {
					//метод проверки лайка
					card.checkLike(res);
				})
				.catch((err) => {
					console.log(err);
				});
		},
		//удаление лайка
		() => {
			//запрос на сервер
			api
				.delLike(item)
				.then((res) => {
					//проверка лайка
					card.checkLike(res);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	);
	//вызываем метод создания карточки
	const place = card.generatePlace();
	//возвращаем готовую карточку
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

//создаем элемент попапа открытия изображения
const popupWithImage = new PopupWithImage(".popup_value_img");
popupWithImage.setEventListeners();

//элемент класса попап - новая карточка
const popupPlaceAdd = new Popup(".popup_value_place-add");
popupPlaceAdd.setEventListeners();

//попап редактирования профиля
const popupEditProfile = new Popup(".popup_value_user-edit");

//попап удаления карточки
const popupDeletePlace = new PopupWithSubmit(
	".popup_value_delete-place",
	(placeId, place) => {
		api
			.deleteCard(placeId)
			.then(() => {
				place.remove();
			})
			.catch((err) => {
				console.log(err);
			});
	}
);

popupDeletePlace.setEventListeners();

//попап редактирования аватара
const popupEditAvatar = new Popup(".popup_value_avatar");
popupEditAvatar.setEventListeners();

//при нажатии кнопки редактирования аватара
avatarEditButton.addEventListener("click", () => {
	//вызываем метод открытия попапа
	popupEditAvatar.openPopup();
	//вызываем метод слушателей
	popupEditAvatar.setEventListeners();
	//метод сброса ошибок валидации
	formValidatorProfileEdit.disableValidationInputs();
	//делаем кнопку не активной
	formValidatorProfileEdit.offButton();
});

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
	//отправляем данные на сервер
	popupFormPlaceAdd.changeButtonText("Сохранение...");
	api
		.addNewCard(formValues)
		.then((formValues) => {
			//создаем новую карточку и вставляем в разметку
			const newCard = generateCard(formValues);
			cardList.addItem(newCard);
		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => {
			popupFormPlaceAdd.changeButtonText("Создать");
		});
	//закрываем попап со сбросом формы
	popupFormPlaceAdd.closePopup();
}

//создаем элемент
const userInfo = new UserInfo(
	".profile__name",
	".profile__ocupation",
	".profile__avatar"
);

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
	//console.log(formValues);
	//метод записи изменений
	userInfo.setUserInfo(formValues);
	popupFormEditProfile.changeButtonText("Сохранение...");
	//отправка изменений на сервер
	api
		.editProfile(formValues)
		.catch((err) => {
			console.log(err);
		})
		.finally(() => {
			popupFormEditProfile.changeButtonText("Сохранить");
		});
	//закрываем попап
	popupFormEditProfile.closePopup();
}

//функция записи изменений аватара
function saveChangesAvatar(formValues) {
	//console.log(formValues);
	//метод записи изменений
	userInfo.setUserAvatar(formValues);
	popupEditAvatar.changeButtonText("Сохранение...");
	//отправка изменений на сервер
	api
		.editAvatar(formValues)
		.catch((err) => {
			console.log(err);
		})
		.finally(() => {
			popupEditAvatar.changeButtonText("Сохранить");
		});
	popupEditAvatar;
	//закрываем попап
	popupFormEditAvatar.closePopup();
}

//функция отображения данных пользователя от сервера
function showChangesProfile(formValues) {
	//метод записи изменений
	userInfo.showUserInfo(formValues);
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

//элемент форма попапа редактирования аватара
const popupFormEditAvatar = new PopupWithForm({
	popupSelector: ".popup_value_avatar",
	handleFormSubmit: (formValues) => {
		//функция записи изменений
		saveChangesAvatar(formValues);
	},
});
//слушатель формы редактирования аватара
popupFormEditAvatar.setEventListeners();

//создаем элемент класса валидации формы изменений профиля
const formValidatorProfileEdit = new FormValidator(
	formProfileEdit,
	validationConfig
);
//запускаем метод класса валидации
formValidatorProfileEdit.enableValidation();

//создаем элемент класса валидации формы изменения аватара
const formValidatorAvatarEdit = new FormValidator(
	formAvatarEdit,
	validationConfig
);
//запускаем метод класса валидации
formValidatorAvatarEdit.enableValidation();

//создаем элемент класса валидации формы добавления места
const formValidatorPlaceAdd = new FormValidator(formPlaceAdd, validationConfig);
//запускаем метод класса валидации
formValidatorPlaceAdd.enableValidation();
