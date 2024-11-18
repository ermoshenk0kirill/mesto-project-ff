//функция создания карточ
function createCard(
  cardTemplate,
  linkValue,
  titleValue,
  likes,
  deleteCard,
  likeCard,
  popupImageOpen,
  currentUserId,
  ownerId,
  cardId
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = linkValue;
  cardImage.alt = titleValue;
  cardElement.querySelector(".card__title").textContent = titleValue;

  cardImage.addEventListener("click", () =>
    popupImageOpen(linkValue, titleValue)
  );

  const likeCount = cardElement.querySelector(".card__like-counter");
  likeCount.textContent = likes.length;

  const deleteButton = cardElement.querySelector(".card__delete-button");

  if (currentUserId !== ownerId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", () => {
      deleteCard(cardId)
        .then(() => {
          cardElement.remove();
        })
        .catch((error) => {
          console.log(`Error: ${error.status}`);
        });
    });
  }

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => likeCard(likeButton));

  return cardElement;
}

//функция лайка
function likeCard(evt) {
  evt.classList.toggle("card__like-button_is-active");
}
export { createCard, likeCard };