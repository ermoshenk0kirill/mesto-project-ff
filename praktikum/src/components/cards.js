import { popupImageOpen } from "../index.js";

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

//функция создания карточ
function createCard(cardTemplate, linkValue, titleValue, deleteCard, likeCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = linkValue;
  cardElement.querySelector(".card__image").alt = titleValue;
  cardElement.querySelector(".card__title").textContent = titleValue;

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", likeCard);
  cardElement
    .querySelector(".card__image")
    .addEventListener("click", function () {
      popupImageOpen(linkValue, titleValue);
    });

  return cardElement;
}

//функция лайка
function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

//функция удаления карточки
function deleteCard(evt) {
  const cardToDelete = evt.target.closest(".card");
  cardToDelete.remove();
}

export { initialCards, createCard, deleteCard, likeCard };