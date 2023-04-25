//создаем массив карточек, который будет использоваться при загрузке
const altay = new URL("../../images/altay.jpg", import.meta.url);
const baykal = new URL("../../images/baykal.JPG", import.meta.url);
const dombay = new URL("../../images/dombay.JPG", import.meta.url);
const kolyma = new URL("../../images/kolima.JPG", import.meta.url);
const krasnoyarskayGES = new URL("../../images/krasnoyarskayGES.JPG", import.meta.url);
const onega = new URL("../../images/onega.jpg", import.meta.url);

export const initialCards = [
	{ name: "Алтай", src: altay },
	{ name: "Байкал", src: baykal },
	{ name: "Домбай", src: dombay },
	{ name: "Колыма", src: kolyma },
	{ name: "Красноярская ГЭС", src: krasnoyarskayGES },
	{ name: "Онежское озеро", src: onega },
];

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
//конфиг со значениями, используемыми при валидации
export const validationConfig = {
	inputSelector: ".popup__input",
	saveSelector: ".popup__save",
	errorInputClass: "popup__input_type_error",
	errorElementClass: "popup__input-error_active",
	saveConditionHoverClass: "popup__save_condition_hover",
	saveInactiveClass: "popup__save_inactive",
};
