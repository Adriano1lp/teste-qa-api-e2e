export class CheckoutPage {
  get firstNameInput() { return cy.get('[data-test="firstName"]') }
  get lastNameInput() { return cy.get('[data-test="lastName"]') }
  get postalCodeInput() { return cy.get('[data-test="postalCode"]') }
  get continueButton() { return cy.get('[data-test="continue"]') }
  get finishButton() { return cy.get('[data-test="finish"]') }
  get errorMessage() { return cy.get('[data-test="error"]') }
  get successHeader() { return cy.get('.complete-header') }
  get cartLink() { return cy.get('.shopping_cart_link') }
  get checkoutButton() { return cy.get('[data-test="checkout"]') }
  get addToCartButtons() { return cy.get('[data-test^="add-to-cart"]') }

  preencherFormulario(nome, sobrenome, zip) {
    if (nome) this.firstNameInput.clear().type(nome)
    if (sobrenome) this.lastNameInput.clear().type(sobrenome)
    if (zip) this.postalCodeInput.clear().type(zip)
    this.continueButton.should('be.visible').click()
  }

  adicionarProdutoAoCarrinhoPorNome(nomeProduto) {
    cy.contains('.inventory_item', nomeProduto)
      .should('be.visible')
      .find('button')
      .should('be.visible')
      .click()
  }

  adicionarPrimeiroProdutoAoCarrinho() {
    this.addToCartButtons.should('have.length.greaterThan', 0).first().click()
  }

  acessarCheckout() {
    this.cartLink.should('be.visible').click()
    this.checkoutButton.should('be.visible').click()
  }

  finalizarCompra() {
    this.finishButton.should('be.visible').click()
  }

  validarMensagemDeSucesso(mensagemEsperada) {
    this.successHeader.should('be.visible').and('have.text', mensagemEsperada)
  }

  validarMensagemDeErro(mensagemEsperada) {
    this.errorMessage.should('be.visible').and('contain', mensagemEsperada)
  }
}

export const checkoutPage = new CheckoutPage()