Cypress.Commands.add('apiRequest', ({
  method,
  path,
  url,
  headers = {},
  failOnStatusCode = false,
  ...options
}) => {
  const apiBaseUrl = Cypress.env('apiBaseUrl') || Cypress.env('BASE_URL_API')
  const requestUrl = url || `${apiBaseUrl}${path}`

  return cy.api({
    method,
    url: requestUrl,
    headers: {
      accept: 'application/json',
      ...headers
    },
    failOnStatusCode,
    ...options
  })
})