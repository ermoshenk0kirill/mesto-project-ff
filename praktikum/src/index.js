// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки
// импорт массива карточек и css файла
import { initialCards } from "./components/cards.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { popupOpen, closePopup } from "./components/modal.js";

import "./pages/index.css";

// @todo: Вывести карточки на страницу
const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");

// ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ
const editButton = document.querySelector(".profile__edit-button"); //кнопка редактирования
const addNewPostButton = document.querySelector(".profile__add-button"); //кнопка +
const buttonPopupCloses = document.querySelectorAll(".popup__close"); //кнопка закрытия попапа

const profileEditPopup = document.querySelector(".popup_type_edit"); // окно редактирования профиля
const profileNewCard = document.querySelector(".popup_type_new-card"); // окно добавления карточки
const imageCard = document.querySelector(".popup_type_image"); // окно изображения

// переменная формы для создания новой карточки
const formNewCard = document.forms["new-place"];
const nameNewCard = document.querySelector(".popup__input_type_card-name");
const linkNewCard = document.querySelector(".popup__input_type_url");

//SUBMIT
// Находим форму в DOM
const profileForm = profileEditPopup.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const profileTitle = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

//Функция открывания изображения
function popupImageOpen(linkValue, titleValue) {
  const imagePopup = imageCard.querySelector(".popup__image");
  const imageTitle = imageCard.querySelector(".popup__caption");

  imagePopup.src = linkValue;
  imagePopup.alt = titleValue;
  imageTitle.textContent = titleValue;
  popupOpen(imageCard);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const resName = nameInput.value;
  const resJob = jobInput.value; // Получите значение полей jobInput и nameInput из свойства value

  profileTitle.textContent = resName;
  profileJob.textContent = resJob; // Вставьте новые значения с помощью textContent

  closePopup(profileEditPopup);
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

// обработчик закрытия попапа по крестику
buttonPopupCloses.forEach(function (buttonPopupCloses) {
  buttonPopupCloses.addEventListener("click", function () {
    const popupClose = buttonPopupCloses.closest(".popup");
    closePopup(popupClose);
  });
});

//обработчик закрытия попапа по клику на оверлей
document.addEventListener("mousedown", function (evt) {
  const openedPopup = document.querySelector(".popup_opened");
  if (evt.target === openedPopup) {
    closePopup(openedPopup);
  }
});

//обработчик события для открытия попапа редактирования профиля
editButton.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;
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
      likeCard,
      popupImageOpen
    );
    cardList.append(newCard);
  });
}

addCards();

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
    likeCard,
    popupImageOpen
  );
  cardList.prepend(newCard);

  closePopup(evt.target.closest(".popup"));

  formNewCard.reset();
}

formNewCard.addEventListener("submit", handlNewCard);