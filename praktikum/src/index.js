// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки
// импорт массива карточек и css файла
import {
  initialCards,
  createCard,
  deleteCard,
  likeCard,
} from "./components/cards.js";
import { popupOpen, closeButton } from "./components/modal.js";

import "./pages/index.css";

// @todo: Вывести карточки на страницу
const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");

// ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ
const editButton = document.querySelector(".profile__edit-button"); //кнопка редактирования
const addNewPostButton = document.querySelector(".profile__add-button"); //кнопка +
const buttonPopupClose = document.querySelectorAll(".popup__close"); //кнопка закрытия попапа

const profileEditPopup = document.querySelector(".popup_type_edit"); // окно редактирования профиля
const profileNewCard = document.querySelector(".popup_type_new-card"); // окно добавления карточки
const imageCard = document.querySelector(".popup_type_image"); // окно изображения
// Объявление переменных для попапа изображения
const imagePopup = imageCard.querySelector(".popup__image");
const imageTitle = imageCard.querySelector(".popup__caption");

// переменная формы для создания новой карточки
const formNewCard = document.forms["new-place"];
const nameNewCard = document.querySelector(".popup__input_type_card-name");
const linkNewCard = document.querySelector(".popup__input_type_url");

//SUBMIT
// Находим форму в DOM
const formElement = document.querySelector(".popup__form"); // Воспользуйтесь методом querySelector()
const nameInput = document.querySelector(".popup__input_type_name"); // Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector(".popup__input_type_description"); // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); 
  
  const resName = nameInput.value;
  const resJob = jobInput.value; // Получите значение полей jobInput и nameInput из свойства value

  const profileTitle = document.querySelector(".profile__title");
  const profileJob = document.querySelector(".profile__description"); // Выберите элементы, куда должны быть вставлены значения полей

  profileTitle.textContent = resName;
  profileJob.textContent = resJob; // Вставьте новые значения с помощью textContent

  const popupButton = evt.target.closest(".popup");
  closeButton(popupButton);
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);

// обраюотчик закрытия попапа по крестику
buttonPopupClose.forEach(function (buttonPopupClose) {
  buttonPopupClose.addEventListener("click", function () {
    const popupClose = buttonPopupClose.closest(".popup");
    closeButton(popupClose);
  });
});

//обработчик закрытия попапа по кнопке esc
document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    const popupClose = document.querySelector(".popup_opened");
    closeButton(popupClose);
  }
});

//обработчик закрытия попапа по клику на оверлей
document.addEventListener("mousedown", function (evt) {
  const openedPopup = document.querySelector(".popup_opened");
  if (evt.target === openedPopup) {
    closeButton(openedPopup);
  }
});

// Добавляем обработчик события для открытия попапа редактирования профиля
editButton.addEventListener("click", function () {
  popupOpen(profileEditPopup);
});
//обработчик события на добавление новых постов по кнопке +
addNewPostButton.addEventListener("click", function () {
  popupOpen(profileNewCard);
});

//функция добавления карточек
function addCards() {
  initialCards.forEach(function (cardValue) {
    const newCard = createCard(
      cardTemplate,
      cardValue.link,
      cardValue.name,
      deleteCard,
      likeCard
    );
    cardList.append(newCard);
  });
}

addCards();

//Функция открывания изображения
export function popupImageOpen(linkValue, titleValue) {
  imagePopup.src = linkValue;
  imagePopup.alt = titleValue;
  imageTitle.textContent = titleValue;
  popupOpen(imageCard);
}

//функция создания новой карточки
function handlNewCard(evt) {
  evt.preventDefault();

  const nameValue = nameNewCard.value;
  const linkValue = linkNewCard.value;

  const newCard = createCard(
    cardTemplate,
    linkValue,
    nameValue,
    deleteCard,
    likeCard
  );
  cardList.prepend(newCard);

  closeButton(evt.target.closest(".popup"));

  formNewCard.reset();
}

formNewCard.addEventListener("submit", handlNewCard);