describe('API User Test - Petstore Swagger', () => {
  
  let userData

  beforeEach(() => {
    cy.fixture('user').then((data) => {
      userData = data
    });
  });

  context('Cenários Positivos', () => {
    
    it('Deve criar um novo pet com sucesso (POST)', () => {
      cy.createUserPet(userData.validUser).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.id).to.eq(userData.validUser.id)
        expect(response.headers['content-type']).to.include('application/json')
      })
    })

    it('Deve consultar um usuário pelo id (GET)', () => {
      cy.getUser(userData.validUser.id).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.id).to.eq(userData.validUser.id)
        expect(response.body.name).to.eq(userData.validUser.name)
        expect(response.headers['content-type']).to.include('application/json')
      })
    })

    it('Deve atualizar pet com sucesso (PUT)', () => {
      userData.validUser.name = 'Doguinho'
      cy.putPet(userData.validUser).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.id).to.eq(userData.validUser.id)
        expect(response.body.name).to.eq('Doguinho')
        expect(response.headers['content-type']).to.include('application/json')
      })
    })

    it('Deve deletar um usuário pelo id (DELETE)', () => {
      const idPet = userData.validUser.id
      const key = 'teste1234'
      cy.deleteUser( idPet, key ).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.code).to.eq(200)
      })
    })

    it('Deve realizar login com sucesso (GET + Auth)', () => {
      cy.loginUser('userteste', 'teste123').then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.message).to.contain('logged in user session')
        expect(response.headers).to.have.property('x-expires-after')
      })
    })
  })

  context('Cenários Negativos', () => {

    it('Deve retornar 404 ao buscar usuário inexistente', () => {
      const idPet = 'user_nao_existe_12345'
      const key = 'usuer1234'
      cy.deleteUser( idPet, key ).then((response) => {
        expect(response.status).to.eq(404)
        expect(response.body.message).to.eq('java.lang.NumberFormatException: For input string: \"user_nao_existe_12345\"')
      })
    })

    it('Deve validar erro de método não permitido (POST em endpoint GET-only)', () => {
      const BASE_URL = Cypress.env('BASE_URL_API')
      cy.request({
        method: 'POST',
        url: `${BASE_URL}/user/login`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(405)
      })
    })
  })

})