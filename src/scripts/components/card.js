//класс карточек место
export default class Card {
	constructor(
		{ item, openPlaceImage },
		placeTemplate,
		pressDelButton,
		userId,
		putLike,
		delLike
	) {
		this._item = item;
		this._cardOwnerId = item.owner._id;
		this._userId = userId;
		this._title = item.name;
		this._link = item.link;
		//this._sumLikes = item.likes.length;
		this._placeTemplate = placeTemplate;
		//колбэк открытия попапа карточки
		this._openPlaceImage = openPlaceImage;
		//колбэк удаления карточки через попап
		this._pressDelButton = pressDelButton;
		//установка лайка
		this._putLike = putLike;
		//удаление лайка
		this._delLike = delLike;
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

	//метод удаления карточки
	delPlace() {
		this._placeElement.remove();
	}

	//метод отображения лайка
	pressLikeButton() {
		//добавляем класс
		this._placeLikeButton.classList.add("place__like_active");
	}

	//метод удаления лайка
	deleteLike() {
		this._placeLikeButton.classList.remove("place__like_active");
	}

	//проверка лайка
	checkLike(res) {
		//элемент отображения кол-ва лайков
		const placeSumLikes = this._placeElement.querySelector(".place__like-sum");
		//массив для сбора id поставивших лайк
		this._arrUsersLike = [];
		//кол-во лайков - длинна массива
		this._sumLikes = res.likes.length;
		//показывает есть ли лайк пользователя
		this._putOrNot = false;
		if (this._sumLikes === 0) {
			//если кол-во лайков 0, поле отображения суммы пустое
			placeSumLikes.textContent = "";
		} else {
			//иначе в поле записываем кол-во лайков
			placeSumLikes.textContent = this._sumLikes;
			//из полученного массива лайков id пользователей добавляем в массив
			res.likes.forEach((user) => {
				this._arrUsersLike.push(user._id);
			});
			//если пользователь есть в массиве true
			this._putOrNot = this._arrUsersLike.includes(this._userId);
			if (this._putOrNot) {
				//закрашиваем лайк
				this.pressLikeButton();
			}
		}
	}

	_setEventListeners() {
		//при нажатии лайка вызываем функцию
		this._placeLikeButton.addEventListener("click", () => {
			//если пользоваетеля нет в массиве поставивших лайк
			if (!this._putOrNot) {
				//колбэк постановки лайка
				this._putLike();
			} else {
				//иначе колбэк удаления лайка
				this._delLike();
			}
		});
		//при нажатии вызываем функцию удаления
		if (this._buttonDelPlace) {
			this._buttonDelPlace.addEventListener("click", () => {
				this._pressDelButton(this);
			});
		}
		//при нажатии вызываем функцию открытия попапа картинки
		this._buttonImagePlace.addEventListener("click", () => {
			this._openPlaceImage(this._title, this._link);
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
		//метод проверки лака
		this.checkLike(this._item);
		//обращаемся к функции установки слушателей
		this._setEventListeners();
		//проверяем кнопку удаления
		this._checkId();
		//возвращаем заполненную разметку
		return this._placeElement;
	}

	//проверяем создателя карточки
	_checkId() {
		//если карточка чужая
		if (this._userId !== this._cardOwnerId) {
			//убираем кнопку удаления
			this._buttonDelPlace.remove();
		}
	}
}
