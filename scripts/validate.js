const formList = Array.from(document.forms);
console.log(formList);

formList.forEach((formElement) => {
  addEventListener("submit", function (evt) {
	//отменяем стандартную отправку формы
  evt.preventDefault()
  });
});

