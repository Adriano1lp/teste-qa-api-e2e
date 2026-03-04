import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"
import { loginPage } from "../page/loginPage"

// Fluxo Inicial
Given("que eu acesso a página de login", () => {
  cy.visit(Cypress.env('BASE_URL_UI'))
})

// Ações
When("eu insiro o usuário {string} e a senha {string}", (usuario, senha) => {
  loginPage.realizarLogin(usuario, senha)
})

When("clico no botão de login", () => {
  loginPage.loginButton.click()
})

// Assertivas Positivas
Then("devo ser redirecionado para a página de produtos", () => {
  cy.url().should("include", "/inventory.html")
})

Then("devo visualizar o título {string}", (titulo) => {
  cy.get(".title").should("have.text", titulo)
})

// Assertivas Negativas
Then("devo ver uma mensagem de erro contendo {string}", (mensagemEsperada) => {
  cy.get('[data-test="error"]')
    .should("be.visible")
    .and("contain", mensagemEsperada)
})