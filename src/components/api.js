//Загрузка информации о пользователе с сервера

export const getUser = () => {
  return fetch("https://nomoreparties.co/v1/plus-cohort-14/users/me", {
    headers: {
      authorization: "f9e9e49f-0819-4dc4-9e7e-0ee189046934",
    },
  })
    
}

//Изменение данных о пользователе

export const postUser = (form) => {
  return fetch("https://nomoreparties.co/v1/plus-cohort-14/users/me", {
    method: "PATCH",
    headers: {
      authorization: "f9e9e49f-0819-4dc4-9e7e-0ee189046934",
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      name: form.elements.name__input.value,
      about: form.elements.about__input.value,
    }),
  });
}

//Загрузка карточек

export const getCards = () => {
  return fetch("https://nomoreparties.co/v1/plus-cohort-14/cards", {
    headers: {
      authorization: "f9e9e49f-0819-4dc4-9e7e-0ee189046934",
    },
  })
}


//Новая карточка

export const postNewCard = (formNewCard) => {
  return fetch("https://nomoreparties.co/v1/plus-cohort-14/cards", {
    method: "POST",
    headers: {
      authorization: "f9e9e49f-0819-4dc4-9e7e-0ee189046934",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: formNewCard.elements.name.value,
      link: formNewCard.elements.link.value,
    }),
  });
}

//удаление карточки 

export const deleteCard = (id) => {
    return fetch('https://nomoreparties.co/v1/plus-cohort-14/cards/' + id, {
    method: "DELETE",
    headers: {
      authorization: "f9e9e49f-0819-4dc4-9e7e-0ee189046934"
    }
})
}


//Лайк добавить

export const addLike = (id) => {
    return fetch('https://nomoreparties.co/v1/plus-cohort-14/cards/likes/' + id, {
    method: "PUT",
    headers: {
      authorization: "f9e9e49f-0819-4dc4-9e7e-0ee189046934",
      "Content-Type": "application/json"
    }

})
}

//Убрать лайк

export const removeLike = (id) => {
    return fetch('https://nomoreparties.co/v1/plus-cohort-14/cards/likes/' + id, {
    method: "DELETE",
    headers: {
      authorization: "f9e9e49f-0819-4dc4-9e7e-0ee189046934",
      "Content-Type": "application/json"
    }

})
}

// смена аватара 

export const editAvatar = (form) => {
    return fetch('https://nomoreparties.co/v1/plus-cohort-14/users/me/avatar/', {
        method: "PATCH",
        headers: {
            authorization: "f9e9e49f-0819-4dc4-9e7e-0ee189046934",
            "Content-Type": "application/json"
    },
    body: JSON.stringify ({
        avatar: form.link.value
    })
    
})
}