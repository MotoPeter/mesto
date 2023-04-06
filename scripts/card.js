//import { popupImgOpening } from "./constants.js";
//import { popupImg } from "./constants.js";
//import { placeFigureCaption } from "./constants.js";
//import {openPlaceImage} from './index.js'

//класс карточек место
export class Card {
	constructor(item, placeTemplate, openPlaceImage) {
		this._title = item.name;
		this._link = item.src;
		this._placeTemplate = placeTemplate;
		this._openPlaceImage = openPlaceImage;
	}

	// функция клонирования разметки карточки
	_getPlaceTemplate() {
		//клонируем содержимое темплейта карточки
		const place = this._placeTemplate.content.cloneNode(true);
		//возвращаем разметку карточки
		return place;
	}

	//функция лайка
	_pressLikeButton() {
		//добавляем(убираем) класс
		this.placeLikeButton.classList.toggle("place__like_active");
	}

	//функция удаления place
	_pressDelButton() {
		//удаляем карточку
		this.buttonDelPlace.closest(".place").remove();
	}

	////функция открытия картинки
	//_openPlaceImage(item) {
	//	//находим узел img и его атрибут src
	//	const placeSrcImage = this._link;
	//	//открываем попап
	//	openPopup(popupImgOpening);
	//	//добавляем атрибут src
	//	popupImg.setAttribute("src", placeSrcImage);
	//	//находим элемент заголовка
	//	const placeTitleImage = this._title;
	//	//добавляем элементу текстовое значение
	//	placeFigureCaption.textContent = placeTitleImage;
	//	//находим у картинки атрибут alt
	//	const placeAltImage = this._title + ".";
	//	//добавляем атрибут alt
	//	popupImg.setAttribute("alt", placeAltImage);
	//}

	_setEventListeners() {
		//при нажатии лайка вызываем функцию
		this.placeLikeButton.addEventListener("click", () => {
			this._pressLikeButton();
		});
		//при нажатии вызываем функцию удаления
		this.buttonDelPlace.addEventListener("click", () => {
			this._pressDelButton();
		});
		//при нажатии вызываем функцию открытия попапа картинки
		this.buttonImagePlace.addEventListener("click", () => {
			this._openPlaceImage(this._placeElement);
		});
	}

	//создаем карточку места
	generatePlace() {
		//получаем разметку карточки
		this._placeElement = this._getPlaceTemplate();
		//находим элемент заголовка карточки
		const placeTitle = this._placeElement.querySelector(".place__title");
		//добавляем в элемент заголовка значение name карточки из массива
		placeTitle.textContent = this._title;
		//находим элемент картинки
		const placeImage = this._placeElement.querySelector(".place__image");
		//добавляем атрибут в картинку
		placeImage.setAttribute("src", this._link);
		//добавляем атрибут alt в картинку
		placeImage.setAttribute("alt", this._title + ".");
		//находим кнопку лайка
		this.placeLikeButton = this._placeElement.querySelector(".place__like");
		//находим кнопку удаления
		this.buttonDelPlace = this._placeElement.querySelector(".place__trash");
		//кнопку на картинке (открытия попап)
		this.buttonImagePlace = this._placeElement.querySelector(
			".place__image-button"
		);
		//обращаемся к функции установки слушателей
		this._setEventListeners();
		//возвращаем заполненную разметку
		return this._placeElement;
	}
}
