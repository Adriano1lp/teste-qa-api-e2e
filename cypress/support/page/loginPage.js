export class LoginPage {
  get userInput() { return cy.get('[data-test="username"]') }
  get passwordInput() { return cy.get('[data-test="password"]') }
  get loginButton() { return cy.get('[data-test="login-button"]') }
  get errorMessage() { return cy.get('[data-test="error"]') }
 

  realizarLogin(usuario, senha) {
    // Limpa os campos antes de digitar para evitar erros em retentativas
    if (usuario) this.userInput.clear().type(usuario)
    if (senha) this.passwordInput.clear().type(senha)
  }

}

export const loginPage = new LoginPage()
