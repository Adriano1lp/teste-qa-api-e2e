import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"
import { checkoutPage } from "../page/checkoutPage"
import { loginPage } from "../page/loginPage"

Given("que eu estou logado na aplicação", () => {
  cy.visit(Cypress.env('BASE_URL_UI'))
  loginPage.realizarLogin("standard_user", "secret_sauce")
  loginPage.loginButton.click()
})

Given("que eu adiciono o produto {string} ao carrinho", (produto) => {
  cy.contains('.inventory_item', produto).find('button').click()
})

Given("que eu tenho produtos no carrinho", () => {
  cy.get('[data-test^="add-to-cart"]').first().click()
})

Given("sigo para o checkout", () => {
  cy.get('.shopping_cart_link').click()
  cy.get('[data-test="checkout"]').click()
})

When("preencho os dados de entrega com {string}, {string} e {string}", (nome, sobrenome, zip) => {
  checkoutPage.preencherFormulario(nome, sobrenome, zip)
})

When("finalizo a compra", () => {
  checkoutPage.finishButton.click()
})

Then("devo ver a mensagem de confirmação {string}", (mensagem) => {
  checkoutPage.successHeader.should('have.text', mensagem)
})

Then("devo ver a mensagem de erro de checkout {string}", (erro) => {
  checkoutPage.errorMessage.should('be.visible').and('contain', erro)
})