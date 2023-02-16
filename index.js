//находим в DOM кнопку редактирования профиля
const profileEditButton = document.querySelector('.profile__edit-button');
//находим блок popup
const editPopup = document.querySelector('.popup');
//при нажатии кнопки редактирования профиля
profileEditButton.addEventListener('click', function() {
  //добавляем класс что бы popup стал видимым
  editPopup.classList.add('popup_openend')
  //вызываем функцию для обновления value инпутов
  saveTextPopup();
})

//находим кнопку закрытия popup
const popupСlose = document.querySelector('.popup__close');
//при нажатии кнопки закрытия popup
popupСlose.addEventListener('click', function() {
  //удаляем класс и popup снова невидим
  editPopup.classList.remove('popup_openend')
})



//находим элемент с именем профиля
let profileNameElement = document.querySelector('.profile__name');

//находим элемент ввода имени в popup
let popupInputName = document.querySelector('.popup__input-name');

//находим элемент род занятий
let profileOcupationElement = document.querySelector('.profile__ocupation');

//находим элемент ввода рода занятий в popup
let popupInputOcupation = document.querySelector('.popup__input-ocupation');

//создаем функцию для записи в value инпутов текста из профиля
function saveTextPopup() {
  //из элемента с именем выделяем текст
  let popupUserName = profileNameElement.textContent;
  //меняем значение value на текст из элемента с именем профиля
  popupInputName.value = popupUserName;
  //из элемента род занятий выделяем текст
  let popupUserOcupation = profileOcupationElement.textContent;
  //меняем значение value на текст из элемента род занятий
  popupInputOcupation.value = popupUserOcupation;
}

//находим элемент кнопка сохранить
const popupSave = document.querySelector('.popup__save');

//при нажатии кнопки сохранить
popupSave.addEventListener('click', function(evt) {
  //отменяем стандартную отправку формы
  evt.preventDefault();
  //вызываем функцию закрытия попапа и записи изменений
  saveChangesProfile();
})

//функция записи изменений в профиле
function saveChangesProfile() {
  //удаляем у popup класс для его закрытия
  editPopup.classList.remove('popup_openend')
  //записываем новое имя из value элемента ввода имени popup
  let popupNameNew = popupInputName.value;
  //присваиваем текстовому полю элемента с именем профиля новое имя из ввода popup
  profileNameElement.textContent = popupNameNew;
  //записываем новое род занятий из value элемента ввода данных popup
  let popupOcupationNew = popupInputOcupation.value;
  //присваиваем текстовому полю элемента с родом занятий новое значение из ввода popup
  profileOcupationElement.textContent = popupOcupationNew;
}

//ловим событие в инпуте редактирования имени нажатия на клавишу
  document.querySelector('.popup__input-name').addEventListener('keydown', function(e) {
    //если нажали ентер
    if (e.keyCode === 13) {
      //вызываем функцию записи изменений профиля
      saveChangesProfile()
    }  
});

document.querySelector('.popup__input-ocupation').addEventListener('keydown', function(e) {
  //если нажали ентер
  if (e.keyCode === 13) {
    //вызываем функцию записи изменений профиля
    saveChangesProfile()
  }  
});
