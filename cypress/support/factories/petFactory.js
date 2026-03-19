export const buildDynamicPet = (template, overrides = {}) => {
  const uniqueSeed = Date.now() + Cypress._.random(100, 999)

  return Cypress._.merge({}, template, {
    id: uniqueSeed,
    name: `pet-${uniqueSeed}`,
    photoUrls: [`https://picsum.photos/seed/${uniqueSeed}/300/300`],
    tags: [
      {
        id: Cypress._.random(1, 9999),
        name: `tag-${uniqueSeed}`
      }
    ],
    status: 'available'
  }, overrides)
}
