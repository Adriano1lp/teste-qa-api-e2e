# language: pt
Funcionalidade: Login e Navegação
  Como um usuário da Petstore
  Quero me autenticar no sistema
  Para acessar o formulário de inventário

  Contexto:
    Dado que eu acesso a página de login

  @positivo
  Cenário: Login com sucesso e navegação
    Quando eu insiro o usuário "standard_user" e a senha "secret_sauce"
    E clico no botão de login
    Então devo ser redirecionado para a página de produtos
    E devo visualizar o título "Products"

  @negativo
  Esquema do Cenário: Tentativas de login inválidas
    Quando eu insiro o usuário "<usuario>" e a senha "<senha>"
    E clico no botão de login
    Então devo ver uma mensagem de erro contendo "<mensagem>"

    Exemplos:
      | usuario          | senha          | mensagem                                              |
      | usuario_inexiste | secret_sauce   | Username and password do not match any user in this service |
      | standard_user    | senha_errada   | Username and password do not match any user in this service |
      |                  |                | Username is required                                  |