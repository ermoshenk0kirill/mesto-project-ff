import { createCard, likeCard } from "./components/card.js";
import { popupOpen, closePopup } from "./components/modal.js";
import {
  enableValidation,
  clearValidation,
  toggleButtonState,
} from "./components/validation.js";

import {profileInfo, newCards, reloadProfile, addNewCard, deleteCard} from "./components/api.js"

import "./pages/index.css";

const config = {
  formSelector: ".popup__form", // форма +
  inputSelector: ".popup__input", // поле ввода +
  submitButtonSelector: ".popup__button", // кнопка отправки
  inactiveButtonClass: "popup__button_disabled", // css класс неактивной кнопки
  inputErrorClass: "popup__input_type_error", //меняет линию инпута +
  errorClass: "popup__error_visible", // текстовая ошибка под инпутом
};

//---------------------------------------
const formEditCard = document.forms["edit-profile"]; // переменная отвечающая за форму редактирования профиля
const formCreateCard = document.forms["new-place"];

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

const imagePopup = imageCard.querySelector(".popup__image");
const imageTitle = imageCard.querySelector(".popup__caption");

// переменные для API

const titleImage = document.querySelector('.profile__image');
const titleName = document.querySelector('.profile__title');
const titleJob = document.querySelector('.profile__description');

let currentUserId;

//-----------------------------------------

Promise.all([profileInfo(), newCards()])
  .then(([res, cardsArray]) => {
    titleImage.src = res.avatar;
    titleName.textContent = res.name;
    titleJob.textContent = res.about;

    currentUserId = res._id;

    cardsArray.forEach(res => {
      cardList.append(createCard(
        cardTemplate,
        res.link,
        res.name,
        res.likes,
        deleteCard,
        likeCard,
        popupImageOpen,
        currentUserId,
        res.owner._id,
        res.id
      ));
    });
  }
)
  .catch((error) => {
    console.log(`Ошибка:${error}`);
  }
)

//--------------------------------------

//Функция открывания изображения
function popupImageOpen(linkValue, titleValue) {
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

  addNewCard(nameValue, linkValue)
    .then(data => {
      const newCard = createCard(
        cardTemplate,
        data.link,
        data.name,
        data.likes,
        deleteCard,
        likeCard,
        popupImageOpen,
        currentUserId,
        data.owner._id,
        data._id
      )
      cardList.prepend(newCard);
      closePopup(profileNewCard);
      formNewCard.reset();
    }
    )
  closePopup(evt.target.closest(".popup"));
  formNewCard.reset();
}

// обработчик сабмита формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  reloadProfile(nameInput.value, jobInput.value)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileJob.textContent = res.about;
  })
  closePopup(profileEditPopup);
}

//обработчик закрытия попапа по клику на оверлей
function handlOverlayClose(popup) {
  popup.addEventListener("mousedown", function (evt) {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

// обработчик закрытия попапа по крестику
buttonPopupCloses.forEach(function (buttonPopupCloses) {
  buttonPopupCloses.addEventListener("click", function () {
    const popupClose = buttonPopupCloses.closest(".popup");
    closePopup(popupClose);
  });
});

//обработчик события для открытия попапа редактирования профиля
editButton.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;

  clearValidation(formEditCard, config);

  const inputList = Array.from(profileForm.querySelectorAll(".popup__input"));
  const buttonElement = profileForm.querySelector(".popup__button");
  toggleButtonState(inputList, buttonElement, config);
  popupOpen(profileEditPopup);
});

//обработчик события на добавление новых постов по кнопке +
addNewPostButton.addEventListener("click", function () {
  formNewCard.reset();

  clearValidation(formCreateCard, config);

  const inputList = Array.from(formNewCard.querySelectorAll(".popup__input"));
  const buttonElement = formNewCard.querySelector(".popup__button"); 
  toggleButtonState(inputList, buttonElement, config); 

  popupOpen(profileNewCard);
});

formNewCard.addEventListener("submit", handlNewCard);

handlOverlayClose(profileEditPopup);
handlOverlayClose(profileNewCard);
handlOverlayClose(imageCard);
enableValidation(config);