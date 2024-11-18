const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-26',
  headers: {
    authorization: '91ee8c08-4ac8-4e30-9fb3-04ea6057fbec',
    'Content-Type': 'application/json'
  }
}

export const profileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
    .then(res => res.json())
    .catch((error) => {
      console.log(`Error: ${error.status}`);
    })
}

export const newCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers
  })
    .then(res => res.json())
    .catch((error) => {
      console.log(`Error: ${error.status}`);
    })
}

export const reloadProfile = (name, job) => {
return fetch(`${config.baseUrl}/users/me`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    name: name,
    about: job
  })
})
  .then(res => res.json())
  .catch((error) => {
    console.log(`Error: ${error.status}`);
  })}

export const addNewCard = (placeName, placeLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: placeName,
      link: placeLink
    })
  })
  .then(res => res.json())
  .catch((error) => {
    console.log(`Error: ${error.status}`);
  })
}

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
}