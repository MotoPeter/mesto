//находим в DOM кнопку редактирования профиля
const profileEditButton = document.querySelector(".profile__edit-button");
//находим блок popup
const editPopup = document.querySelector(".popup");
//находим элемент с именем профиля
let profileNameElement = document.querySelector(".profile__name");
//находим элемент ввода имени в popup
let popupInputName = document.querySelector(".popup__input_data_name");
//находим элемент род занятий
let profileOcupationElement = document.querySelector(".profile__ocupation");
//находим элемент ввода рода занятий в popup
let popupInputOcupation = document.querySelector(".popup__input_data_ocupation");
//находим элемент кнопка сохранить
const popupSave = document.querySelector(".popup__save");
//находим кнопку закрытия popup
const popupСlose = document.querySelector(".popup__close");

//ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПА
function ClosePopap() {
	//удаляем класс и popup снова невидим
	editPopup.classList.remove("popup_openend");
}

//ФУНКЦИЯ ОТКРЫТИЯ ПОПАПА И ЗАПИСИ value ТЕКСТА ИЗ ПРОФИЛЯ
function openPopup() {
	//добавляем класс что бы popup стал видимым
	editPopup.classList.add("popup_openend");
	//из элемента с именем выделяем текст
	let popupUserName = profileNameElement.textContent;
	//меняем значение value на текст из элемента с именем профиля
	popupInputName.value = popupUserName;
	//из элемента род занятий выделяем текст
	let popupUserOcupation = profileOcupationElement.textContent;
	//меняем значение value на текст из элемента род занятий
	popupInputOcupation.value = popupUserOcupation;
}

//функция записи изменений в профиле
function saveChangesProfile() {
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
	openPopup();
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
