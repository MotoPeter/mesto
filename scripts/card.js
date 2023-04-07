//класс карточек место
export class Card {
	constructor(item, placeTemplate, openPlaceImage) {
		this._title = item.name;
		this._link = item.src;
		this._placeTemplate = placeTemplate;
		this.openPlaceImage = openPlaceImage;
	}

	// функция клонирования разметки карточки
	_getPlaceTemplate() {
		//клонируем содержимое темплейта карточки
		const place = this._placeTemplate.content
			.querySelector(".place")
			.cloneNode(true);
		//возвращаем разметку карточки
		return place;
	}

	//функция лайка
	_pressLikeButton() {
		//добавляем(убираем) класс
		this._placeLikeButton.classList.toggle("place__like_active");
	}

	//функция удаления place
	_pressDelButton() {
		//удаляем карточку
		this._buttonDelPlace.closest(".place").remove();
	}

	_setEventListeners() {
		//при нажатии лайка вызываем функцию
		this._placeLikeButton.addEventListener("click", () => {
			this._pressLikeButton();
		});
		//при нажатии вызываем функцию удаления
		this._buttonDelPlace.addEventListener("click", () => {
			this._pressDelButton();
		});
		//при нажатии вызываем функцию открытия попапа картинки
		this._buttonImagePlace.addEventListener("click", () => {
			this.openPlaceImage(this._title, this._link);
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
		this._placeLikeButton = this._placeElement.querySelector(".place__like");
		//находим кнопку удаления
		this._buttonDelPlace = this._placeElement.querySelector(".place__trash");
		//кнопку на картинке (открытия попап)
		this._buttonImagePlace = this._placeElement.querySelector(
			".place__image-button"
		);
		//обращаемся к функции установки слушателей
		this._setEventListeners();
		//возвращаем заполненную разметку
		return this._placeElement;
	}
}
