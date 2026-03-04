export class CheckoutPage {
  get firstNameInput() { return cy.get('[data-test="firstName"]') }
  get lastNameInput() { return cy.get('[data-test="lastName"]') }
  get postalCodeInput() { return cy.get('[data-test="postalCode"]') }
  get continueButton() { return cy.get('[data-test="continue"]') }
  get finishButton() { return cy.get('[data-test="finish"]') }
  get errorMessage() { return cy.get('[data-test="error"]') }
  get successHeader() { return cy.get('.complete-header') }

  preencherFormulario(nome, sobrenome, zip) {
    if (nome) this.firstNameInput.type(nome)
    if (sobrenome) this.lastNameInput.type(sobrenome)
    if (zip) this.postalCodeInput.type(zip)
    this.continueButton.click()
  }
}

export const checkoutPage = new CheckoutPage()