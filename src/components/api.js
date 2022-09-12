//Загрузка информации о пользователе с сервера

const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-14', 
    headers: {
            authorization: "f9e9e49f-0819-4dc4-9e7e-0ee189046934",
            "Content-Type": "application/json"
          }
    }

export function checkResponce(res) {
    if(res.ok) {return res.json()};
    return Promise.reject(`Ошибка ${res.status}`)}

export const getUser = () => {
  return fetch(config.baseUrl + '/users/me', {
    headers: config.headers
  })
  .then(checkResponce)   
}

//Изменение данных о пользователе

export const postUser = (form) => {
  return fetch(config.baseUrl + '/users/me', {
    method: "PATCH",
    headers: config.headers,

    body: JSON.stringify({
      name: form.elements.name__input.value,
      about: form.elements.about__input.value,
    }),
  })
  .then(checkResponce) 
}

//Загрузка карточек

export const getCards = () => {
  return fetch(config.baseUrl + '/cards', {
    headers: config.headers
  })
  .then(checkResponce) 
}


//Новая карточка

export const postNewCard = (formNewCard) => {
  return fetch(config.baseUrl + '/cards', {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: formNewCard.elements.name.value,
      link: formNewCard.elements.link.value,
    }),
  })
  .then(checkResponce) 
}

//удаление карточки 

export const deleteCard = (id) => {
    return fetch(config.baseUrl + '/cards/' + id, {
    method: "DELETE",
    headers: config.headers
})
.then(checkResponce) 
}


//Лайк добавить

export const addLike = (id) => {
    return fetch(config.baseUrl + '/cards/likes/' + id, {
    method: "PUT",
    headers: config.headers

})
.then(checkResponce) 
}

//Убрать лайк

export const removeLike = (id) => {
    return fetch(config.baseUrl + '/cards/likes/' + id, {
    method: "DELETE",
    headers: config.headers

})
.then(checkResponce) 
}

// смена аватара 

export const editAvatar = (form) => {
    return fetch(config.baseUrl + '/users/me/avatar/', {
        method: "PATCH",
        headers: config.headers,
    body: JSON.stringify ({
        avatar: form.link.value
    })
    
})
.then(checkResponce) 
}