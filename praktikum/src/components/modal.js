// Функция для открытия попапа
function popupOpen(evt) {
  evt.classList.add("popup_opened");
}

//главная функция закрытия попапа
function closeButton(evt) {
  evt.classList.remove("popup_opened");
}

export { popupOpen, closeButton };
