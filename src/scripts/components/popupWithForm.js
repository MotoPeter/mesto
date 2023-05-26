import Popup from "./popup.js";


export default class PopupWithForm extends Popup {
	constructor({ popupSelector, handleFormSubmit }) {
		super(popupSelector);
		this._popupForm = this._popup.querySelector(".popup__form");
		this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
	}

	//при наступлении события
	setEventListeners() {
    super.setEventListeners()
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
}
