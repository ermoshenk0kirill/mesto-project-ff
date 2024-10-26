//функция создания карточ
function createCard(
  cardTemplate,
  linkValue,
  titleValue,
  deleteCard,
  likeCard,
  popupImageOpen
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = linkValue;
  cardImage.alt = titleValue;
  cardElement.querySelector(".card__title").textContent = titleValue;

  cardImage.addEventListener("click", () =>
    popupImageOpen(linkValue, titleValue)
  );

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => deleteCard(cardElement));

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => likeCard(likeButton));

  return cardElement;
}

//функция лайка
function likeCard(evt) {
  evt.classList.toggle("card__like-button_is-active");
}

//функция удаления карточки
function deleteCard(evt) {
  evt.remove();
}

export { createCard, deleteCard, likeCard };
