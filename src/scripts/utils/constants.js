//находим в DOM кнопку редактирования профиля (открытия попап)
export const profileEditButton = document.querySelector(
	".profile__edit-button"
);
//находим в DOM кнопку добавления места (открытия попап)
export const placeAddButton = document.querySelector(".profile__add-button");
//находим элемент ввода имени в popup
export const profileInputName = document.querySelector(
	".popup__input_data_name"
);
//находим элемент ввода рода занятий в popup
export const profileInputOcupation = document.querySelector(
	".popup__input_data_ocupation"
);
//находим в DOM элемент шаблона карточки
export const placeTemplate = document.getElementById("placeTemplate");
// находим форму в попапе добавления карточки
export const formPlaceAdd = document
	.querySelector(".popup_value_place-add")
	.querySelector(".popup__form");
//форма редактирования профиля
export const formProfileEdit = document
	.querySelector(".popup_value_user-edit")
	.querySelector(".popup__form");
//форма редактирования аватара
export const formAvatarEdit = document
	.querySelector(".popup_value_avatar")
	.querySelector(".popup__form");
//конфиг со значениями, используемыми при валидации
export const validationConfig = {
	inputSelector: ".popup__input",
	saveSelector: ".popup__save",
	errorInputClass: "popup__input_type_error",
	errorElementClass: "popup__input-error_active",
	saveConditionHoverClass: "popup__save_condition_hover",
	saveInactiveClass: "popup__save_inactive",
};
//
export const avatarEditButton = document.querySelector(
	".profile__avatar-button"
);
