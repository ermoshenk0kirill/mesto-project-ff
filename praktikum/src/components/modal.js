function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

function handlOverlayClose(evt) {
  const popupClose = evt.target.closest(".popup");
  if (evt.target === popupClose) {
    closePopup(popupClose);
  }
}

// Функция для открытия попапа
function popupOpen(evt) {
  evt.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscClose);
  evt.addEventListener("mousedown", handlOverlayClose);
}

//главная функция закрытия попапа
function closePopup(evt) {
  evt.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscClose);
  evt.removeEventListener("mousedown", handlOverlayClose);
}

export { popupOpen, closePopup };