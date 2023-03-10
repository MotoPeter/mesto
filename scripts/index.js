//создаем массив карточек, который будет использоваться при загрузке
const initialCards = [
	{ name: "Алтай", src: "./images/altay.jpg" },
	{ name: "Байкал", src: "./images/baykal.JPG" },
	{ name: "Домбай", src: "./images/dombay.JPG" },
	{ name: "Колыма", src: "./images/kolima.JPG" },
	{ name: "Красноярская ГЭС", src: "./images/krasnoyarskayGES.JPG" },
	{ name: "Онежское озеро", src: "./images/onega.jpg" },
];

//находим в DOM кнопку редактирования профиля (открытия попап)
const profileEditButton = document.querySelector(".profile__edit-button");
//находим в DOM кнопку добавления места (открытия попап)
const placeAddButton = document.querySelector(".profile__add-button");
//находим блок popup редактирования профиля
const popupProfileEdit = document.querySelector(".popup_value_user-edit");
//находим блок popup добавления места
const popupPlaceAdd = document.querySelector(".popup_value_place-add");
//находим блок popup открытия изображения
const popupImgOpening = document.querySelector(".popup_value_img");
//кнопка закрытия попапа редактирования профиля
const profileCloseButton = document.querySelector(
	".popup__close_value_user-edit"
);
//кнопка закрытия попапа добавления места
const placeCloseButton = document.querySelector(
	".popup__close_value_place-add"
);
//кнопка закрытия попапа картинки
const imgCloseButton = document.querySelector(".popup__close_value_img");
//находим элемент с именем профиля
const profileName = document.querySelector(".profile__name");
//находим элемент род занятий
const profileOcupation = document.querySelector(".profile__ocupation");
//находим элемент ввода имени в popup
const profileInputName = document.querySelector(".popup__input_data_name");
//находим элемент ввода рода занятий в popup
const profileInputOcupation = document.querySelector(
	".popup__input_data_ocupation"
);
const placeInputLocation = document.querySelector(
	".popup__input_data_location"
);
const placeInputImg = document.querySelector(".popup__input_data_link-foto");
//находим элемент картинки
const popupImg = popupImgOpening.querySelector(".figure__img");
//находим элемент подписи к картинке
const placeFigureCaption = popupImgOpening.querySelector(".figure__caption");

//находим в DOM элемент размещения карточек
const gridPlaces = document.querySelector(".grid-places");

// функция создания карточки
function getCard(item) {
	//находим в DOM элемнет шаблона карточки
	const place = document
		.getElementById("placeTempLate")
		.content.cloneNode(true);
	//находим элемент заголовка карточки
	const placeTitle = place.querySelector(".place__title");
	//добавляем в элемент заголовка значение name карточки из массива
	placeTitle.textContent = item.name;
	//находим элемент картинки
	const placeImage = place.querySelector(".place__image");
	//добавляем атрибут в картинку
	placeImage.setAttribute("src", item.src);
	//добавляем атрибут alt в картинку
	placeImage.setAttribute("alt", item.name + ".");
	//находим кнопку лайка
	const placeLikebutton = place.querySelector(".place__like");
	//при нажатии лайка вызываем функцию
	placeLikebutton.addEventListener("click", pressLikeButton);
	//находим кнопку удаления
	const buttonDelPlace = place.querySelector(".place__trash");
	//при нажатии вызываем функцию удаления
	buttonDelPlace.addEventListener("click", pressDelButton);
	//кнопку на картинке (открытия попап)
	const buttonImagePlace = place.querySelector(".place__image-button");
	//при нажатии вызываем функцию открытия попапа картинки
	buttonImagePlace.addEventListener("click", () => openPlaceImage(item));
	//возвращаем код созданной карточки
	return place;
}

// функция вставки карточки в разметку. Второй параметр указывет на порядок размещения карточки (по умолчанию в конец списка)
function createPlace(item, order = "append") {
	//получаем разметку карточки
	const place = getCard(item);
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

//ФУНКЦИЯ ОТКРЫТИЯ ПОПАПА
function openPopup(popup) {
	//добавляем класс что бы popup стал видимым
	popup.classList.add("popup_openend");
}

//ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПА
function closePopap(popup) {
	//удаляем класс и popup снова невидим
	popup.classList.remove("popup_openend");
}

//ЗАПИСИ в value ТЕКСТА ИЗ ПРОФИЛЯ
function recordValueInput() {
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
function gettingValueInput(inputFirst, inputSecond) {
	//находим элемент первого ввода в popup
	const valueInputFirst = inputFirst.value;
	//находим элемент второго ввода в popup
	const valueInputSecond = inputSecond.value;
	return [valueInputFirst, valueInputSecond];
}

//функция записи изменений в профиле
function saveChangesProfile() {
	//вызываем функцию получения value
	const valueInput = gettingValueInput(profileInputName, profileInputOcupation);
	//присваиваем текстовому полю элемента с именем профиля новое имя из ввода popup
	profileName.textContent = valueInput[0];
	//присваиваем текстовому полю элемента с родом занятий новое значение из ввода popup
	profileOcupation.textContent = valueInput[1];
	//вызываем функцию закрытия попапа
	closePopap(popupProfileEdit);
}

//функция добавления карточки
function savePlaceNew() {
	//вызываем функцию получения value
	const popupInput = gettingValueInput(placeInputLocation, placeInputImg);
	//вызываем функцию создания карточки и передаем ей созданный массив
	createPlace({ name: popupInput[0], src: popupInput[1] }, "prepend");
	//вызываем функцию закрытия попапа
	closePopap(popupPlaceAdd);
}

function openPlaceImage(item) {
  console.log(item)
	//находим узел img и его атрибут src
	const placeSrcImage = item.src;
	//открываем попап
	openPopup(popupImgOpening);
	//добавляем атрибут src
	popupImg.setAttribute("src", placeSrcImage);
	//находим элемент заголовка
	const placeTitleImage = item.name;
	//добавляем элементу текстовое значение
	placeFigureCaption.textContent = placeTitleImage;
	//находим у картинки атрибут alt
	const placeAltImage = item.name + '.';
	//добавляем атрибут alt
	popupImg.setAttribute("alt", placeAltImage);
}

//при нажатии кнопки редактирования профиля
profileEditButton.addEventListener("click", function () {
	//вызываем функцию открытия и обновления value инпутов
	openPopup(popupProfileEdit);
	//функция записи value текста из профиля
	recordValueInput();
});

//при нажатии кнопки добавления места
placeAddButton.addEventListener("click", function () {
	//вызываем функцию открытия и обновления value инпутов
	openPopup(popupPlaceAdd);
});

//при нажатии кнопки закрытия popup редактирования профиля
profileCloseButton.addEventListener("click", function (evt) {
	closePopap(popupProfileEdit);
});

//при нажатии кнопки закрытия popup добавления места
placeCloseButton.addEventListener("click", function (evt) {
	closePopap(popupPlaceAdd);
});

//при нажатии кнопки закрытия popup картинки
imgCloseButton.addEventListener("click", function (evt) {
	closePopap(popupImgOpening);
});

//при наступлении события
popupProfileEdit.addEventListener("submit", function (evt) {
	//отменяем стандартную отправку формы
	evt.preventDefault();
	//вызываем функцию закрытия попапа и записи изменений
	saveChangesProfile();
});

//при наступлении события
popupPlaceAdd.addEventListener("submit", function (evt) {
	//отменяем стандартную отправку формы
	evt.preventDefault();
	//вызываем функцию закрытия попапа и создания новой карточки
	savePlaceNew();
	evt.target.reset();
});

//функция лайка
function pressLikeButton(evt) {
	//определяем целевой элемент
	const placeLikebutton = evt.target;
	//добавляем(убираем) класс
	placeLikebutton.classList.toggle("place__like_active");
}

//функция удаления place
function pressDelButton(evt) {
	//определяем целевой элемент
	const placeDelite = evt.target;
	//удаляем карточку
	placeDelite.closest(".place").remove();
}
