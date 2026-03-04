# language: pt
Funcionalidade: Checkout de Compras
  Como um usuário autenticado
  Quero adicionar produtos ao carrinho e finalizar a compra
  Para garantir que o fluxo de vendas está funcionando

  Contexto:
    Dado que eu estou logado na aplicação

  @positivo
  Cenário: Finalizar compra com sucesso
    Dado que eu adiciono o produto "Sauce Labs Backpack" ao carrinho
    E sigo para o checkout
    Quando preencho os dados de entrega com "João", "Silva" e "12345"
    E finalizo a compra
    Então devo ver a mensagem de confirmação "Thank you for your order!"

  @negativo
  Esquema do Cenário: Validar erros no formulário de checkout
    Dado que eu tenho produtos no carrinho
    E sigo para o checkout
    Quando preencho os dados de entrega com "<nome>", "<sobrenome>" e "<zip>"
    Então devo ver a mensagem de erro de checkout "<mensagem>"

    Exemplos:
      | nome | sobrenome | zip   | mensagem                       |
      |      | Silva     | 12345 | Error: First Name is required  |
      | João |           | 12345 | Error: Last Name is required   |
      | João | Silva     |       | Error: Postal Code is required |