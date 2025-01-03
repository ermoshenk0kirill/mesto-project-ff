//функция создания карточ
function createCard(
  cardTemplate,
  linkValue,
  titleValue,
  likes,
  deleteButtonCalback,
  likeCalback,
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
  }
  
  likeButton.addEventListener("click", () => {
    likeCalback(cardId, likeButton, likeCount);
  });

  if (currentUserId !== ownerId) {
    deleteButton.remove();
  }
  else {
    deleteButton.addEventListener("click", () => {
      deleteButtonCalback(cardId, cardElement);
    });
  }

  return cardElement;
}

export { createCard };