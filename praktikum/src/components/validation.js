// функция показа ошибки
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (errorElement) {
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.inputSelector);
    errorElement.classList.add(config.errorClass);
  }
};

// функция скрытия ошибки
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (errorElement) {
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(config.inputSelector);
    errorElement.classList.remove(config.errorClass);
  }
};

// функция валидации и показа ошибки
const isValid = (formElement, inputElement, config) => {
  const regex = /[^\wа-яёА-ЯЁ\-\s]/gi;
  let errorMessage = "";

  if (inputElement.type === "url") {
    if (!inputElement.validity.valid) {
      showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        config
      );
    } else {
      hideInputError(formElement, inputElement, config);
    }
  } else {
    if (!inputElement.validity.valid) {
      errorMessage = inputElement.validationMessage;
      showInputError(formElement, inputElement, errorMessage, config);
    } else if (regex.test(inputElement.value)) {
      errorMessage = inputElement.dataset.errorMessage;
      showInputError(formElement, inputElement, errorMessage, config);
    } else {
      hideInputError(formElement, inputElement, config);
    }
  }
};

// функция проверки состояния кнопки
const setEventListener = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

// функция сброса валидации
function clearValidation(formElement, config) {
  const inputElements = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  inputElements.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
  });
}

// функция валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListener(formElement, config);
  });
};

// функция блокировки кнопки
const hasInvalidInput = (inputList, config) => {
  return inputList.some((inputElement) => {
    return (
      !inputElement.validity.valid ||
      inputElement.classList.contains(config.inputErrorClass)
    );
  });
};

// логика блокировки кнопки
const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList, config)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

export { enableValidation, clearValidation, toggleButtonState };
