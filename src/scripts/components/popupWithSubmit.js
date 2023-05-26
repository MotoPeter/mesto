import Popup from "./popup";

//класс попапа подтверждения удаления
export default class PopupWithSubmit extends Popup {
	//наследуем от popup для работы методов открытия и закрытия
	constructor(popupSelector, deleteCard) {
		super(popupSelector);
		//находим форму у попапа
		this._form = this._popup.querySelector(".popup__form");
		this._deleteCard = deleteCard;
	}

	//наследуем метод слушателя
	setEventListeners() {
		super.setEventListeners();
		//  //при сабмите формы
		this._form.addEventListener("submit", () => {
			super.closePopup();
			this._deleteCard(this._placeId, this._place);
		});
	}

	getId(item, place) {
		this._placeId = item._id;
		this._place = place;
		return this._placeId, this._place;
	}
}
