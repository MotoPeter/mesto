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

//создаем массив карточек, который будет использоваться при загрузке
const initialCards = [
  { name: 'Алтай',
    src: './images/altay.jpg'
  },
  { name: 'Байкал',
    src: './images/baykal.JPG'
  },
  { name: 'Домбай',
    src: './images/dombay.JPG'
  },
  { name: 'Колыма',
    src: './images/kolima.JPG'
  },
  { name: 'Красноярская ГЭС',
    src: './images/krasnoyarskayGES.JPG'
  },
  { name: 'Онежское озеро',
    src: './images/onega.jpg'
  }
];

//находим в DOM элемент размещения карточек
const gridPlaces = document.querySelector('.grid-places');

//делаем функцию создания карточки из массива
 function createPlace(place) {
  //находим в DOM элемнет шаблона карточки
  const newPlace = document.getElementById('placeTempLate').content.cloneNode(true);
  //находим элемент заголовка карточки
  const placeTitle = newPlace.querySelector('.place__title');
  //добавляем в элемент заголовка значение name карточки из массива
  placeTitle.textContent = place.name;
  //находим элемент картинки
  const placeImage = newPlace.querySelector('.place__image');
  //добавляем атрибут в картинку
  placeImage.setAttribute('src', place.src);
  //добавляем атрибут alt в картинку
  placeImage.setAttribute('alt', (place.name + '.'));
  //добавляем в элемент gridPlaces карточку
  gridPlaces.append(newPlace);
};

//обходим массив карточек вызывая функцию создания карточки из массива
initialCards.forEach(createPlace);