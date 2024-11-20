import { createCard } from "./components/card.js"; //likeCard
import { popupOpen, closePopup } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";

import {
  profileInfo,
  newCards,
  reloadProfile,
  addNewCard,
  deleteCard,
  likeCard,
  unlikeCard,
  updateAvatar,
} from "./components/api.js";

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
const formNewCard = document.forms["new-place"];

const formAvatar = document.forms["new-avatar"];

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

const profileAvatarPopup = document.querySelector(".popup_type_avatar");
const avatarEditButton = document.querySelector(".profile__edit-icon");
const avatarForm = profileAvatarPopup.querySelector(".popup__form");

const nameNewCard = document.querySelector(".popup__input_type_card-name");
const linkNewCard = document.querySelector(".popup__input_type_url");

// SUBMIT
// Находим форму в DOM
const profileForm = profileEditPopup.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const profileTitle = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

const imagePopup = imageCard.querySelector(".popup__image");
const imageTitle = imageCard.querySelector(".popup__caption");

// переменные для API

const titleImage = document.querySelector(".profile__image");
const titleName = document.querySelector(".profile__title");
const titleJob = document.querySelector(".profile__description");

let currentUserId;

Promise.all([profileInfo(), newCards()])
  .then(([res, cardsArray]) => {
    titleImage.src = res.avatar;
    titleName.textContent = res.name;
    titleJob.textContent = res.about;

    currentUserId = res._id;

    cardsArray.forEach((res) => {
      cardList.append(
        createCard(
          cardTemplate,
          res.link,
          res.name,
          res.likes,
          deleteCard,
          likeCard,
          unlikeCard,
          popupImageOpen,
          currentUserId,
          res.owner._id,
          res._id
        )
      );
    });
  })
  .catch((error) => console.log(`Error: ${error.message}`));

function renderLoading(isLoading, button) {
  button.textContent = isLoading ? "Сохранение..." : "Сохранить";
}

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

  const loadingButton = evt.target.querySelector(".popup__button");
  renderLoading(true, loadingButton);
  addNewCard(nameValue, linkValue)
    .then((data) => {
      const newCard = createCard(
        cardTemplate,
        data.link,
        data.name,
        data.likes,
        deleteCard,
        likeCard,
        unlikeCard,
        popupImageOpen,
        currentUserId,
        data.owner._id,
        data._id
      );
      cardList.prepend(newCard);
      closePopup(profileNewCard);
    })
    .catch((error) => console.log(`Error: ${error.message}`))
    .finally(() => renderLoading(false, loadingButton));
  closePopup(evt.target.closest(".popup"));
  formNewCard.reset();
}

// обработчик сабмита формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const button = profileForm.querySelector(".popup__button");
  renderLoading(true, button);
  reloadProfile(nameInput.value, jobInput.value)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileJob.textContent = res.about;
    })
    .catch((error) => console.log(`Error: ${error}`))
    .finally(() => renderLoading(false, button));
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
  popupOpen(profileEditPopup);
});

//обработчик события на добавление новых постов по кнопке +
addNewPostButton.addEventListener("click", function () {
  formNewCard.reset();

  clearValidation(formNewCard, config);
  popupOpen(profileNewCard);
});

avatarEditButton.addEventListener("click", function () {
  formAvatar.reset();
  clearValidation(formAvatar, config);
  popupOpen(profileAvatarPopup);
});

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  const avatarLinkInput = avatarForm.querySelector(".popup__input");
  const avatarLink = avatarLinkInput.value;
  const button = avatarForm.querySelector(".popup__button");
  renderLoading(true, button);
  updateAvatar(avatarLink)
    .then((res) => {
      titleImage.src = res.avatar;
      closePopup(profileAvatarPopup);
      avatarForm.reset();
    })
    .catch((error) => console.log(`Error: ${error}`))
    .finally(() => {
      renderLoading(false, button);
    });
}

avatarForm.addEventListener("submit", handleAvatarFormSubmit);

formNewCard.addEventListener("submit", handlNewCard);

handlOverlayClose(profileEditPopup);
handlOverlayClose(profileNewCard);
handlOverlayClose(profileAvatarPopup);
handlOverlayClose(imageCard);
enableValidation(config);