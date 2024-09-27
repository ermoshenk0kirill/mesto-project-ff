// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");

function createCard(linkValue, titleValue) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = linkValue;
  cardElement.querySelector(".card__image").alt = titleValue;
  cardElement.querySelector(".card__title").textContent = titleValue;

  cardElement.querySelector(".card__delete-button").addEventListener("click", function () {
      deleteCard(cardElement);
    });

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function addCards() {
  initialCards.forEach(function (cardValue) {
    const newCard = createCard(cardValue.link, cardValue.name);
    cardList.append(newCard);
  });
}

addCards();