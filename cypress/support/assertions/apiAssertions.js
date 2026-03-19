export const expectJsonResponse = (response, expectedStatus) => {
  expect(response.status).to.eq(expectedStatus)
  expect(response.headers['content-type']).to.include('application/json')
}

export const expectPetResponse = (responseBody, expectedPet) => {
  expect(responseBody).to.include({
    id: expectedPet.id,
    name: expectedPet.name,
    status: expectedPet.status
  })

  expect(responseBody.category).to.deep.include(expectedPet.category)
  expect(responseBody.photoUrls).to.deep.equal(expectedPet.photoUrls)
  expect(responseBody.tags[0]).to.deep.include(expectedPet.tags[0])
}
