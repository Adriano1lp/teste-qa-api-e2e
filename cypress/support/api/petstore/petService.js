import { apiClient } from '../apiClient'

class PetService {
  createPet(payload) {
    return apiClient.request({
      method: 'POST',
      path: '/pet',
      body: payload
    })
  }

  getPetById(petId) {
    return apiClient.request({
      method: 'GET',
      path: `/pet/${petId}`
    })
  }

  updatePet(payload) {
    return apiClient.request({
      method: 'PUT',
      path: '/pet',
      body: payload
    })
  }

  deletePet(petId, apiKey) {
    return apiClient.request({
      method: 'DELETE',
      path: `/pet/${petId}`,
      headers: {
        api_key: apiKey
      }
    })
  }

  testMethodNotAllowed(method) {
    return apiClient.request({
      method: method,
      path: '/user/login'
    })
  }
}

export const petService = new PetService()
