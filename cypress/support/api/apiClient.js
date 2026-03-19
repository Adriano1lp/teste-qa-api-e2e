export class ApiClient {
  request({ method, path, ...options }) {
    return cy.apiRequest({
      method,
      path,
      ...options
    })
  }
}

export const apiClient = new ApiClient()
