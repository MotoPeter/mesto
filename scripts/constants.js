//создаем массив карточек, который будет использоваться при загрузке
export const initialCards = [
	{ name: "Алтай", src: "./images/altay.jpg" },
	{ name: "Байкал", src: "./images/baykal.JPG" },
	{ name: "Домбай", src: "./images/dombay.JPG" },
	{ name: "Колыма", src: "./images/kolima.JPG" },
	{ name: "Красноярская ГЭС", src: "./images/krasnoyarskayGES.JPG" },
	{ name: "Онежское озеро", src: "./images/onega.jpg" },
];

//находим в DOM кнопку редактирования профиля (открытия попап)
export const profileEditButton = document.querySelector(
	".profile__edit-button"
);
//находим в DOM кнопку добавления места (открытия попап)
export const placeAddButton = document.querySelector(".profile__add-button");
//находим блок popup редактирования профиля
export const popupProfileEdit = document.querySelector(
	".popup_value_user-edit"
);
//находим блок popup добавления места
export const popupPlaceAdd = document.querySelector(".popup_value_place-add");
//находим блок popup открытия изображения
export const popupImgOpening = document.querySelector(".popup_value_img");
//находим элемент с именем профиля
export const profileName = document.querySelector(".profile__name");
//находим элемент род занятий
export const profileOcupation = document.querySelector(".profile__ocupation");
//находим элемент ввода имени в popup
export const profileInputName = document.querySelector(
	".popup__input_data_name"
);
//находим элемент ввода рода занятий в popup
export const profileInputOcupation = document.querySelector(
	".popup__input_data_ocupation"
);
export const placeInputLocation = document.querySelector(
	".popup__input_data_location"
);
export const placeInputImg = document.querySelector(
	".popup__input_data_link-foto"
);
//находим элемент картинки
export const popupImg = popupImgOpening.querySelector(".figure__img");
//находим элемент подписи к картинке
export const placeFigureCaption =
	popupImgOpening.querySelector(".figure__caption");
//находим в DOM элемент размещения карточек
export const gridPlaces = document.querySelector(".grid-places");
//находим в DOM элемент шаблона карточки
export const placeTemplate = document.getElementById("placeTemplate");
// находим форму в попапе добавления карточки
export const formPlaceAdd = popupPlaceAdd.querySelector(".popup__form");
//форма редактирования профиля
export const formProfileEdit = popupProfileEdit.querySelector(".popup__form");
//находим кнопки закрытия всех попапов
export const closeButtons = document.querySelectorAll(".popup__close");
//конфиг со значениями, используемыми при валидации
export const validationConfig = {
	inputSelector: ".popup__input",
	saveSelector: ".popup__save",
	errorInputClass: "popup__input_type_error",
	errorElementClass: "popup__input-error_active",
	saveConditionHoverClass: "popup__save_condition_hover",
	saveInactiveClass: "popup__save_inactive",
};
