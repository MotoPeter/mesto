export default class Popup {
	//передаем в конструктор селектор попапа
	constructor(popupSelector) {
		//находим попап по селектору
		this._popup = document.querySelector(popupSelector);
		//находим кнопку закрытия - крестик
		this._popupCloseButton = this._popup.querySelector(".popup__close");
		//привзываем закрытие esc к значению this
		this._handleEscClose = this._handleEscClose.bind(this);
	}

	//метод открытия попапа
	openPopup() {
		//добавляем класс что бы popup стал видимым
		this._popup.classList.add("popup_openend");
		//добавляем слушатель клавиатуры с вызовом функции закрытия по esc
		document.addEventListener("keydown", this._handleEscClose);
	}

	//метод слушателей
	setEventListeners() {
		//при клике на крестик
		this._popupCloseButton.addEventListener("click", () => {
			this.closePopup();
		});
		//при клике на документ
		this._popup.addEventListener("click", (evt) => {
			//если область клика содержит дочерний элемент - открытый попап
			if (evt.target.classList.contains("popup_openend")) {
				this.closePopup();
			}
		});
	}

	//метод закрытия попапа
	closePopup() {
		//удаляем класс и popup снова невидим
		this._popup.classList.remove("popup_openend");
		//удаляем слушатель клавиатуры
		document.removeEventListener("keydown", this._handleEscClose);
	}

	//функция закрытия попапа по esc
	_handleEscClose(evt) {
		if (evt.key === "Escape") {
			this.closePopup();
		}
	}
}
