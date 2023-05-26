import Popup from "./popup.js";

//наследуем от попапа для работы методов открытия и закрытия
export default class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
		this._popupImg = this._popup.querySelector(".figure__img");
		this._placeFigureCaption = this._popup.querySelector(".figure__caption");
	}

	//функция открытия картинки
	openPlaceImage(name, src) {
		//добавляем атрибут src
		this._popupImg.setAttribute("src", src);
		//добавляем элементу текстовое значение
		this._placeFigureCaption.textContent = name;
		//добавляем атрибут alt
		this._popupImg.setAttribute("alt", `${name} .`);
		//открываем попап
		super.openPopup();
	}
}
