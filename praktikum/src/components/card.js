//функция создания карточ
function createCard(
  cardTemplate,
  linkValue,
  titleValue,
  likes,
  deleteCard,
  likeCard,
  unlikeCard,
  popupImageOpen,
  currentUserId,
  ownerId,
  cardId
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".card__like-counter");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = linkValue;
  cardImage.alt = titleValue;
  cardElement.querySelector(".card__title").textContent = titleValue;
  likeCount.textContent = likes.length;

  cardImage.addEventListener("click", () =>
    popupImageOpen(linkValue, titleValue)
  );

  const cardData = { likes, ownerId, cardId };
  const isLiked = cardData.likes.some((like) => like._id === currentUserId);
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  } else {
    likeButton.classList.remove("card__like-button_is-active");
  }
  likeButton.addEventListener("click", () => {
    if (likeButton.classList.contains("card__like-button_is-active")) {
      unlikeCard(cardId).then((data) => {
        likeButton.classList.remove("card__like-button_is-active");
        likeCount.textContent = data.likes.length;
      });
    } else {
      likeCard(cardId).then((data) => {
        likeButton.classList.add("card__like-button_is-active");
        likeCount.textContent = data.likes.length;
      });
    }
  });

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
  return cardElement;
}
export { createCard };