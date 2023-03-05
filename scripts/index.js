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

// функция создания карточки. Второй параметр указывет на порядок размещения карточки (по умолчанию в конец списка)
function createPlace(places, order = "append") {
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
	//находим кнопку лайка
	const likeButton = place.querySelector(".place__like");
	//при нажатии лайка вызываем функцию
	likeButton.addEventListener("click", pressLikeButton);
	//находим кнопку удаления
	const delButton = place.querySelector(".place__trash");
	//при нажатии вызываем функцию удаления
	delButton.addEventListener("click", pressDelButton);
	//кнопку на картинке (открытия попап)
	const placeImageButton = place.querySelector(".place__image-button");
	//при нажатии вызываем функцию открытия попапа картинки
	placeImageButton.addEventListener("click", openPopupImage);
	//добавляем в элемент gridPlaces карточку
	//если переданно значение prepend, ставим в начало списка
	if (order === "prepend") {
		gridPlaces.prepend(place);
		//если нет в конец
	} else {
		gridPlaces.append(place);
	}
}

//обходим массив карточек вызывая функцию создания карточки из массива
initialCards.forEach(createPlace);

//находим в DOM кнопку редактирования профиля (открытия попап)
const profileEditButton = document.querySelector(".profile__edit-button");
//находим в DOM кнопку добавления места (открытия попап)
const profileAddButton = document.querySelector(".profile__add-button");
//находим блок popup редактирования профиля
const popupValueUserEdit = document.querySelector(".popup_value_user-edit");
//находим блок popup добавления места
const popupValuePlaceAdd = document.querySelector(".popup_value_place-add");
//находим блок popup открытия изображения
const popupValueImg = document.querySelector(".popup_value_img");
//кнопка закрытия попапа редактирования профиля
const popupСloseUserEdit = document.querySelector(
	".popup__close_value_user-edit"
);
//кнопка закрытия попапа добавления места
const popupСlosePlaceAdd = document.querySelector(
	".popup__close_value_place-add"
);
//кнопка закрытия попапа картинки
const popupCloseValueImg = document.querySelector(".popup__close_value_img");
//находим элемент кнопка сохранить изменения профиля
const popupSave = document.querySelector(".popup__save");
//находим элемент с именем профиля
const profileNameElement = document.querySelector(".profile__name");
//находим элемент род занятий
const profileOcupationElement = document.querySelector(".profile__ocupation");
//находим элемент ввода имени в popup
const popupInputName = document.querySelector(".popup__input_data_name");
//находим элемент ввода рода занятий в popup
const popupInputOcupation = document.querySelector(
	".popup__input_data_ocupation"
);

//ФУНКЦИЯ ОТКРЫТИЯ ПОПАПА
function openPopup(popup) {
	//добавляем класс что бы popup стал видимым
	popup.classList.add("popup_openend");
}

//ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПА
function ClosePopap(popup) {
	//удаляем класс и popup снова невидим
	popup.classList.remove("popup_openend");
}

//ЗАПИСИ в value ТЕКСТА ИЗ ПРОФИЛЯ
function valuePopap() {
	//из элемента с именем выделяем текст
	let popupUserName = profileNameElement.textContent;
	//меняем значение value на текст из элемента с именем профиля
	popupInputName.value = popupUserName;
	//из элемента род занятий выделяем текст
	let popupUserOcupation = profileOcupationElement.textContent;
	//меняем значение value на текст из элемента род занятий
	popupInputOcupation.value = popupUserOcupation;
}

//функция получения value из инпутов
function receiveValue(inputFirst, inputSecond) {
	//находим элемент первого ввода в popup
	let valueInputFirst = document.querySelector(inputFirst).value;
	//находим элемент второго ввода в popup
	let valueInputSecond = document.querySelector(inputSecond).value;
	console.log(valueInputFirst, valueInputSecond);
	return [valueInputFirst, valueInputSecond];
}

//функция записи изменений в профиле
function saveChangesProfile() {
	//вызываем функцию получения value
	let popupInput = receiveValue(
		".popup__input_data_name",
		".popup__input_data_ocupation"
	);
	//присваиваем текстовому полю элемента с именем профиля новое имя из ввода popup
	profileNameElement.textContent = popupInput[0];
	//присваиваем текстовому полю элемента с родом занятий новое значение из ввода popup
	profileOcupationElement.textContent = popupInput[1];
	//вызываем функцию закрытия попапа
	ClosePopap(popupValueUserEdit);
}

//функция добавления карточки
function saveNewCard() {
	//вызываем функцию получения value
	let popupInput = receiveValue(
		".popup__input_data_location",
		".popup__input_data_link-foto"
	);
	console.log(popupInput);
	//вызываем функцию создания карточки и передаем ей созданный массив
	createPlace({ name: popupInput[0], src: popupInput[1] }, "prepend");
	//вызываем функцию закрытия попапа
	ClosePopap(popupValuePlaceAdd);
}

function openPopupImage(evt) {
	//определяем целевой элемент
	const imageButton = evt.target.closest(".place");
	//находим узел img и его атрибут src
	let srcImage = imageButton.querySelector(".place__image").src;
	//открываем попап
	openPopup(popupValueImg);
	//находим элемент картинки
	const popupImg = popupValueImg.querySelector(".figure__img");
	//добавляем ему атрибут src
	popupImg.setAttribute("src", srcImage);
	//находим элемент заголовка
	const titleImage = imageButton.querySelector(".place__title").textContent;
	//находим элемент подписи к картинке
	const figureCaption = popupValueImg.querySelector(".figure__caption");
	//добавляем элементу текстовое значение
	figureCaption.textContent = titleImage;
	//находим у картинки атрибут alt
	let altImage = imageButton.querySelector(".place__image").alt;
	//добавляем атрибут alt
	popupImg.setAttribute("alt", altImage);
}

//при нажатии кнопки редактирования профиля
profileEditButton.addEventListener("click", function () {
	//вызываем функцию открытия и обновления value инпутов
	openPopup(popupValueUserEdit);
	//функция записи value текста из профиля
	valuePopap();
});

//при нажатии кнопки добавления места
profileAddButton.addEventListener("click", function () {
	//вызываем функцию открытия и обновления value инпутов
	openPopup(popupValuePlaceAdd);
});

//при нажатии кнопки закрытия popup редактирования профиля
popupСloseUserEdit.addEventListener("click", function (evt) {
	ClosePopap(popupValueUserEdit);
});

//при нажатии кнопки закрытия popup добавления места
popupСlosePlaceAdd.addEventListener("click", function (evt) {
	ClosePopap(popupValuePlaceAdd);
});

//при нажатии кнопки закрытия popup картинки
popupCloseValueImg.addEventListener("click", function (evt) {
	ClosePopap(popupValueImg);
});

//при наступлении события
popupValueUserEdit.addEventListener("submit", function (evt) {
	//отменяем стандартную отправку формы
	evt.preventDefault();
	//вызываем функцию закрытия попапа и записи изменений
	saveChangesProfile();
});

//при наступлении события
popupValuePlaceAdd.addEventListener("submit", function (evt) {
	//отменяем стандартную отправку формы
	evt.preventDefault();
	//вызываем функцию закрытия попапа и создания новой карточки
	saveNewCard();
});

//функция лайка
function pressLikeButton(evt) {
	//определяем целевой элемент
	const likeButton = evt.target;
	//добавляем(убираем) класс
	likeButton.classList.toggle("place__like_active");
}

//функция удаления place
function pressDelButton(evt) {
	//определяем целевой элемент
	const buttonDelite = evt.target;
	//удаляем карточку
	buttonDelite.closest(".place").remove();
}
