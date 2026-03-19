import { apiClient } from '../../support/api/apiClient'
import { petService } from '../../support/api/petstore/petService'
import { expectJsonResponse, expectPetResponse } from '../../support/assertions/apiAssertions'
import { buildDynamicPet } from '../../support/factories/petFactory'

describe(`Petstore API | Gestão de pets`, () => {
  let petTemplate
  let createdPetIds
  let scenarioContext

  const createPetForCleanUp = (petId) => {
    createdPetIds.push(petId)
    return petId
  }

  const createPetForScenario = (overrides = {}) => {
    const pet = buildDynamicPet(petTemplate, overrides)

    scenarioContext.currentPet = pet

    return petService.createPet(pet).then((response) => {
      expectJsonResponse(response, 200)
      expectPetResponse(response.body, pet)
      createPetForCleanUp(response.body.id)

      return pet
    })
  }

  beforeEach(() => {
    createdPetIds = []
    scenarioContext = {
      apiKey: Cypress.env('apiKey')
    }

    cy.fixture('pet-template').then((template) => {
      petTemplate = template
    })
  })

  afterEach(() => {
    cy.wrap(createdPetIds, { log: false }).each((petId) => {
      petService.deletePet(petId, scenarioContext.apiKey)
    })
  })

  context('Cenários positivos', () => {
    it('Deve criar um novo pet com sucesso (POST)', () => {
      const dynamicPet = buildDynamicPet(petTemplate)

      scenarioContext.currentPet = dynamicPet

      petService.createPet(dynamicPet)
        .then((createResponse) => {
          expectJsonResponse(createResponse, 200)
          expectPetResponse(createResponse.body, dynamicPet)
          createPetForCleanUp(createResponse.body.id)

          return petService.getPetById(dynamicPet.id)
        })
        .then((getResponse) => {
          expectJsonResponse(getResponse, 200)
          expectPetResponse(getResponse.body, dynamicPet)
        })
    })

    it('Deve atualizar um pet existente com sucesso (PUT)', () => {
      const updatedName = `pet-atualizado-${Date.now()}`

      createPetForScenario().then((pet) => {
        scenarioContext.updatedPet = {
          ...pet,
          name: updatedName,
          status: 'pending'
        }

        return petService.updatePet(scenarioContext.updatedPet)
      }).then((updateResponse) => {
        expectJsonResponse(updateResponse, 200)
        expectPetResponse(updateResponse.body, scenarioContext.updatedPet)
      })
    })

    it('Deve deletar um pet pelo id (DELETE)', () => {
      createPetForScenario().then((pet) => {
        createdPetIds = createdPetIds.filter((petId) => petId !== pet.id)

        return petService.deletePet(pet.id, scenarioContext.apiKey)
      }).then((deleteResponse) => {
        expectJsonResponse(deleteResponse, 200)
        expect(deleteResponse.body.code).to.eq(200)

        return petService.getPetById(scenarioContext.currentPet.id)
      }).then((getResponse) => {
        expectJsonResponse(getResponse, 404)
        expect(getResponse.body.message).to.eq('Pet not found')
      })
    })
  })

  context('Cenários negativos', () => {
    it('Deve retornar 404 ao buscar pet inexistente', () => {
      const nonExistentPetId = Date.now() + Cypress._.random(1000, 9999)

      petService.getPetById(nonExistentPetId).then((response) => {
        expectJsonResponse(response, 404)
        expect(response.body.message).to.eq('Pet not found')
      })
    })

    it('Deve validar erro de método não permitido (POST em endpoint GET-only)', () => {
      petService.testMethodNotAllowed('POST').then((response) => {
        expectJsonResponse(response, 405)
      })
    })
  })
})