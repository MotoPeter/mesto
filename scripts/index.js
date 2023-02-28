//создаем массив карточек, который будет использоваться при загрузке
const initialCards = [
	{ name: "Алтай", src: "./images/altay.jpg" },
	{ name: "Байкал", src: "./images/baykal.JPG" },
	{ name: "Домбай", src: "./images/dombay.JPG" },
	{ name: "Колыма", src: "./images/kolima.JPG" },
	{ name: "Красноярская ГЭС", src: "./images/krasnoyarskayGES.JPG" },
	{ name: "Онежское озеро", src: "./images/onega.jpg" },
];

//находим в DOM элемент размещения карточек
const gridPlaces = document.querySelector(".grid-places");
//делаем функцию создания карточки из массива
function createPlace(places) {
	//находим в DOM элемнет шаблона карточки
	const place = document
		.getElementById("placeTempLate")
		.content.cloneNode(true);
	//находим элемент заголовка карточки
	const placeTitle = place.querySelector(".place__title");
	//добавляем в элемент заголовка значение name карточки из массива
	placeTitle.textContent = places.name;
	//находим элемент картинки
	const placeImage = place.querySelector(".place__image");
	//добавляем атрибут в картинку
	placeImage.setAttribute("src", places.src);
	//добавляем атрибут alt в картинку
	placeImage.setAttribute("alt", places.name + ".");
	//добавляем в элемент gridPlaces карточку
	gridPlaces.append(place);
}

//обходим массив карточек вызывая функцию создания карточки из массива
initialCards.forEach(createPlace);

//находим в DOM кнопку редактирования профиля (открытия попап)
const profileEditButton = document.querySelector(".profile__edit-button");
//находим в DOM кнопку добавления места (открытия попап)
const profileAddButton = document.querySelector(".profile__add-button");
//находим блок popup
const editPopup = document.querySelector(".popup");
//находим элемент заголовка попап
const popupTitle = document.querySelector(".popup__title");
//находим элемент popup form
const popupForm = document.querySelector(".popup__form");
//элемент первого поля ввода
const popupInputFirst = document.querySelector(".popup__input-first");
//элемент второго поля ввода
const popupInputSecond = document.querySelector(".popup__input-second");
//находим кнопку закрытия popup
const popupСlose = document.querySelector(".popup__close");
//находим элемент кнопка сохранить
const popupSave = document.querySelector(".popup__save");
//находим элемент с именем профиля
let profileNameElement = document.querySelector(".profile__name");
//находим элемент род занятий
let profileOcupationElement = document.querySelector(".profile__ocupation");

//создаем массив для попапа редактирования профиля
const userEdit = {
	title: "Редактировать профиль",
	formName: "user-edit",
	inputNameFirst: "user-name",
	placeholderFirst: "имя",
	classFirst: "popup__input_data_name",
	inputNameSecond: "user-ocupation",
	placeholderSecond: "род занятий",
	classSecond: "popup__input_data_ocupation",
	typeSecond: "text",
	textButton: "Сохранить",
};

//создаем массив для попапа добавления места
const addPlace = {
	title: "Новое место",
	formName: "place-add",
	inputNameFirst: "place-name",
	placeholderFirst: "Название",
	classFirst: "popup__input_data_location",
	inputNameSecond: "linc-foto",
	placeholderSecond: "Ссылка на картинку",
	classSecond: "popup__input_data_link-foto",
	typeSecond: "url",
	textButton: "Создать",
};

//ФУНКЦИЯ ОТКРЫТИЯ ПОПАПА
function openPopup(popup) {
	//добавляем класс что бы popup стал видимым
	editPopup.classList.add("popup_openend");
	popupTitle.textContent = popup.title;
	popupForm.setAttribute("name", popup.formName);
	popupInputFirst.setAttribute("name", popup.inputNameFirst);
	popupInputFirst.setAttribute("placeholder", popup.placeholderFirst);
	popupInputFirst.classList.add(popup.classFirst);
	popupInputSecond.setAttribute("name", popup.inputNameSecond);
	popupInputSecond.setAttribute("placeholder", popup.placeholderSecond);
	popupInputSecond.classList.add(popup.classSecond);
	popupInputSecond.setAttribute("type", popup.typeSecond);
	popupSave.textContent = popup.textButton;
}

//ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПА
function ClosePopap() {
	//удаляем класс и popup снова невидим
	editPopup.classList.remove("popup_openend");
	//удаляем классы привязки инпутов попапа к кнопе
	popupInputFirst.classList.remove(
		"popup__input_data_location",
		"popup__input_data_name"
	);
	popupInputSecond.classList.remove(
		"popup__input_data_link-foto",
		"popup__input_data_ocupation"
	);
}

//ЗАПИСИ value ТЕКСТА ИЗ ПРОФИЛЯ
function valuePopap() {
	//из элемента с именем выделяем текст
	let popupUserName = profileNameElement.textContent;
	//меняем значение value на текст из элемента с именем профиля
	popupInputFirst.value = popupUserName;
	//из элемента род занятий выделяем текст
	let popupUserOcupation = profileOcupationElement.textContent;
	//меняем значение value на текст из элемента род занятий
	popupInputSecond.value = popupUserOcupation;
}

//Удаление value из инпутов
function delValuePopap() {
	//меняем значение value на текст из элемента с именем профиля
	popupInputFirst.value = "";
	//меняем значение value на текст из элемента род занятий
	popupInputSecond.value = "";
}

//функция записи изменений в профиле
function saveChangesProfile() {
	//находим элемент ввода имени в popup
	let popupInputName = document.querySelector(".popup__input_data_name");
	//находим элемент ввода рода занятий в popup
	let popupInputOcupation = document.querySelector(
		".popup__input_data_ocupation"
	);
	//записываем новое имя из value элемента ввода имени popup
	let popupNameNew = popupInputName.value;
	//присваиваем текстовому полю элемента с именем профиля новое имя из ввода popup
	profileNameElement.textContent = popupNameNew;
	//записываем новое род занятий из value элемента ввода данных popup
	let popupOcupationNew = popupInputOcupation.value;
	//присваиваем текстовому полю элемента с родом занятий новое значение из ввода popup
	profileOcupationElement.textContent = popupOcupationNew;
	//вызываем функцию закрытия попапа
	ClosePopap();
}

//при нажатии кнопки редактирования профиля
profileEditButton.addEventListener("click", function () {
	//вызываем функцию открытия и обновления value инпутов
	openPopup(userEdit);
	//функция записи value текста из профиля
	valuePopap();
});

//при нажатии кнопки добавления места
profileAddButton.addEventListener("click", function () {
	//вызываем функцию открытия и обновления value инпутов
	openPopup(addPlace);
	//функция удаления value из инпутов
	delValuePopap();
});

//при нажатии кнопки закрытия popup
popupСlose.addEventListener("click", function () {
	ClosePopap();
});

//при наступлении события
editPopup.addEventListener("submit", function (evt) {
	//отменяем стандартную отправку формы
	evt.preventDefault();
	//вызываем функцию закрытия попапа и записи изменений
	saveChangesProfile();
});
