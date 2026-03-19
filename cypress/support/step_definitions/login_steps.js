import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"
import { loginPage } from "../page/loginPage"

// Fluxo Inicial
Given("que eu acesso a página de login", () => {
  loginPage.acessarPagina()
})

// Ações
When("eu insiro o usuário {string} e a senha {string}", (usuario, senha) => {
  loginPage.realizarLogin(usuario, senha)
})

When("clico no botão de login", () => {
  loginPage.clicarNoBotaoLogin()
})

// Assertivas Positivas
Then("devo ser redirecionado para a página de produtos", () => {
  loginPage.validarRedirecionamentoParaProdutos()
})

Then("devo visualizar o título {string}", (titulo) => {
  loginPage.validarTituloDaPagina(titulo)
})

// Assertivas Negativas
Then("devo ver uma mensagem de erro contendo {string}", (mensagemEsperada) => {
  loginPage.validarMensagemDeErro(mensagemEsperada)
})