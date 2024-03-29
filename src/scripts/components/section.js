//создаем и экспортируем класс добавления элементов в разметку
export default class Section {
	//передаем в конструктор массив элементов
	//колбек
	//селектор контейнера для добавления элемента в разметку
	constructor({ renderer }, selector) {
		this._renderer = renderer;
		this._container = document.querySelector(selector);
	}
	//перебираем массив карточек
	renderAllElements(items) {
		items.forEach((item) => {
			this._renderer(item);
		});
	}

	//принимает карточку и вставляет в контейнер
	addItem(card) {
		this._container.prepend(card);
	}
}
