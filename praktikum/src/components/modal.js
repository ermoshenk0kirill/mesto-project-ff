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
function popupOpen(modalWindow) {
  modalWindow.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscClose);
  modalWindow.addEventListener("mousedown", handlOverlayClose);
}

//главная функция закрытия попапа
function closePopup(modalWindow) {
  modalWindow.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscClose);
  modalWindow.removeEventListener("mousedown", handlOverlayClose);
}

export { popupOpen, closePopup };