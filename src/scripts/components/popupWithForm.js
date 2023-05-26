import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
	constructor({ popupSelector, handleFormSubmit }) {
		super(popupSelector);
		this._popupForm = this._popup.querySelector(".popup__form");
		this._handleFormSubmit = handleFormSubmit;
		this._inputList = this._popupForm.querySelectorAll(".popup__input");
		this._buttonSubmit = this._popupForm.querySelector(".popup__save");
	}

	//при наступлении события
	setEventListeners() {
		super.setEventListeners();
		this._popupForm.addEventListener("submit", () => {
			//вызываем функцию закрытия попапа и записи изменений
			this._handleFormSubmit(this._getValueInputs());
		});
	}

	//функция получения value из инпутов
	_getValueInputs() {
		const formValues = {};
		this._inputList.forEach((inputData) => {
			formValues[inputData.name] = inputData.value;
		});
		return formValues;
	}

	//метод закрытия попапа и сброса значений формы
	closePopup() {
		super.closePopup();
		this._popupForm.reset();
	}

	//changeButtonText(text) {
	//	this._buttonSubmit.textContent = text;
	//}
}
