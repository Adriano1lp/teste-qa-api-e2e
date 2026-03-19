import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"
import { checkoutPage } from "../page/checkoutPage"
import { loginPage } from "../page/loginPage"

Given("que eu estou logado na aplicação", () => {
  loginPage.acessarPagina()
  loginPage.autenticarComCredenciaisPadrao()
})

Given("que eu adiciono o produto {string} ao carrinho", (produto) => {
  checkoutPage.adicionarProdutoAoCarrinhoPorNome(produto)
})

Given("que eu tenho produtos no carrinho", () => {
  checkoutPage.adicionarPrimeiroProdutoAoCarrinho()
})

Given("sigo para o checkout", () => {
  checkoutPage.acessarCheckout()
})

When("preencho os dados de entrega com {string}, {string} e {string}", (nome, sobrenome, zip) => {
  checkoutPage.preencherFormulario(nome, sobrenome, zip)
})

When("finalizo a compra", () => {
  checkoutPage.finalizarCompra()
})

Then("devo ver a mensagem de confirmação {string}", (mensagem) => {
  checkoutPage.validarMensagemDeSucesso(mensagem)
})

Then("devo ver a mensagem de erro de checkout {string}", (erro) => {
  checkoutPage.validarMensagemDeErro(erro)
})