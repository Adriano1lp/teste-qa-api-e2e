const BASE_URL = Cypress.env('BASE_URL_API')

Cypress.Commands.add('createUserPet', (payload) => {
  return cy.api({
    method: 'POST',
    url: `${BASE_URL}/pet`,
    body: payload,
    failOnStatusCode: false 
  })
})

Cypress.Commands.add('getUser', (userId) => {
  return cy.api({
    method: 'GET',
    url: `${BASE_URL}/pet/${userId}`,
    failOnStatusCode: false 
  })
})

Cypress.Commands.add('deleteUser', (idPet, key) => {
  return cy.api({
    method: 'DELETE',
    url: `${BASE_URL}/pet/${idPet}`,
    headers: {api_key: key},
    failOnStatusCode: false
  })
})

Cypress.Commands.add('loginUser', (user, password) => {
  return cy.api({
    method: 'GET',
    url: `${BASE_URL}/user/login`,
    qs: {
        username: user,
        password: password
    },
    failOnStatusCode: false
  })
})

Cypress.Commands.add('putPet', (payload) => {
  return cy.api({
    method: 'PUT',
    url: `${BASE_URL}/pet`,
    body: payload,
    failOnStatusCode: false
  })
})