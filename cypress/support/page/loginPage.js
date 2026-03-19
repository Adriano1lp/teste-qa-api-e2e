export class LoginPage {
  get title() { return cy.get('.title') }
  get userInput() { return cy.get('[data-test="username"]') }
  get passwordInput() { return cy.get('[data-test="password"]') }
  get loginButton() { return cy.get('[data-test="login-button"]') }
  get errorMessage() { return cy.get('[data-test="error"]') }

  acessarPagina(url = Cypress.env('uiBaseUrl') || Cypress.env('BASE_URL_UI')) {
    cy.visit(url)
  }

  realizarLogin(usuario, senha) {
    if (usuario) this.userInput.clear().type(usuario)
    if (senha) this.passwordInput.clear().type(senha)
  }

  realizarLoginComCredenciaisPadrao() {
    const usuarioPadrao = Cypress.env('uiUser') || 'standard_user'
    const senhaPadrao = Cypress.env('uiPassword') || 'secret_sauce'

    this.realizarLogin(usuarioPadrao, senhaPadrao)
  }

  autenticar(usuario, senha) {
    this.realizarLogin(usuario, senha)
    this.clicarNoBotaoLogin()
  }

  autenticarComCredenciaisPadrao() {
    this.realizarLoginComCredenciaisPadrao()
    this.clicarNoBotaoLogin()
  }

  clicarNoBotaoLogin() {
    this.loginButton.should('be.visible').click()
  }

  validarRedirecionamentoParaProdutos() {
    cy.url().should('include', '/inventory.html')
  }

  validarTituloDaPagina(tituloEsperado) {
    this.title.should('be.visible').and('have.text', tituloEsperado)
  }

  validarMensagemDeErro(mensagemEsperada) {
    this.errorMessage.should('be.visible').and('contain', mensagemEsperada)
  }
}

export const loginPage = new LoginPage()
