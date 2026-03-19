# Cypress Automation Framework | UI & API

Framework de automação de testes **E2E e de Integração** construído com Cypress 15, Cucumber (BDD/Gherkin) e Allure Report. O projeto adota uma arquitetura em camadas com separação clara de responsabilidades — Page Objects para UI, Service Layer para API, Factories para dados dinâmicos e módulo de asserções reutilizável — e suporte nativo a múltiplos ambientes de execução.

---

## Sumário

1. [Tecnologias](#tecnologias)
2. [Estrutura do Projeto](#estrutura-do-projeto)
3. [Arquitetura](#arquitetura)
4. [Pré-requisitos e Instalação](#pré-requisitos-e-instalação)
5. [Comandos Disponíveis](#comandos-disponíveis)
6. [Execução por Ambiente](#execução-por-ambiente)
7. [Variáveis de Ambiente](#variáveis-de-ambiente)
8. [Relatório Allure](#relatório-allure)
9. [Integração CI/CD](#integração-cicd)

---

## Tecnologias

| Tecnologia | Versão | Finalidade |
|---|---|---|
| [Cypress](https://www.cypress.io/) | ^15.11 | Framework principal de automação |
| [@badeball/cypress-cucumber-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor) | ^24.0 | Suporte a BDD com Gherkin |
| [@bahmutov/cypress-esbuild-preprocessor](https://github.com/bahmutov/cypress-esbuild-preprocessor) | ^2.2 | Compilação ultra-rápida via esbuild |
| [@shelex/cypress-allure-plugin](https://github.com/Shelex/cypress-allure-plugin) | ^2.41 | Integração Allure com Cypress |
| [allure-commandline](https://github.com/allure-framework/allure2) | ^2.37 | Geração e abertura de relatórios |
| [cypress-plugin-api](https://github.com/filiphric/cypress-plugin-api) | ^2.11 | Visualização de requests API no runner |

---

## Estrutura do Projeto

```
cypress/
├── e2e/
│   ├── api/
│   │   └── teste_tarefa1.cy.js        # Spec de integração API (Petstore)
│   ├── hooks/
│   │   └── globalHooks.js             # Hooks BDD globais (After/Before)
│   └── ui/
│       ├── teste_tarefa2_login.feature    # Feature: fluxo de login
│       └── teste_tarefa2_checkout.feature # Feature: fluxo de checkout
│
├── fixtures/
│   ├── pet-template.json             # Template base para factory de pets
│   └── user.json                     # (legado) massa de dados estática
│
├── reports/
│   └── cucumber-results.json         # Relatório gerado pelo Cucumber preprocessor
│
├── support/
│   ├── api/
│   │   ├── apiClient.js              # Cliente HTTP genérico (cy.apiRequest wrapper)
│   │   └── petstore/
│   │       └── petService.js         # Service layer: operações da Petstore API
│   │
│   ├── assertions/
│   │   └── apiAssertions.js          # Asserções reutilizáveis para respostas API
│   │
│   ├── factories/
│   │   └── petFactory.js             # Factory de dados dinâmicos para pets
│   │
│   ├── page/
│   │   ├── loginPage.js              # Page Object: página de login
│   │   └── checkoutPage.js           # Page Object: fluxo de checkout
│   │
│   ├── step_definitions/
│   │   ├── login_steps.js            # Steps BDD: login
│   │   └── checkout_steps.js         # Steps BDD: checkout
│   │
│   ├── commands.js                   # Custom Commands globais (cy.apiRequest)
│   └── e2e.js                        # Ponto de entrada: importa plugins e commands
│
cypress.config.js                     # Configuração Cypress + resolução de ambientes
package.json                          # Scripts e dependências
```

---

## Arquitetura

### Camadas e Responsabilidades

#### 1. Page Objects (`cypress/support/page/`)
Encapsulam **toda** interação com a UI. Os seletores são definidos como getters privados e nunca acessados diretamente nos steps. Cada ação e asserção tem um método nomeado.


#### 2. Service Layer (`cypress/support/api/`)
Isola chamadas HTTP da lógica de teste. Cada domínio tem seu próprio service (ex: `PetService`). O `apiClient` é o único ponto de contato com `cy.apiRequest`, resolvendo URL base dinamicamente pelo ambiente ativo.

```
apiClient.js          ← resolve BASE_URL por ambiente, headers padrão
  └── PetService.js  ← createPet, getPetById, updatePet, deletePet, testMethodNotAllowed
```

#### 3. Factories (`cypress/support/factories/`)
Geram dados dinâmicos únicos a cada execução usando `Date.now()` + `Cypress._.random()`, garantindo isolamento entre testes sem depender de IDs fixos.

```javascript
const pet = buildDynamicPet(template, { status: 'sold' })
// → id único, name único, photoUrl, tags dinâmicos
```

#### 4. Assertions (`cypress/support/assertions/`)
Funções de asserção reutilizáveis que combinam validações de status, headers e corpo de resposta em uma única chamada.

```javascript
expectJsonResponse(response, 200)       // status + content-type
expectPetResponse(response.body, pet)   // campos id, name, status, tags, etc.
```

#### 5. Custom Commands (`cypress/support/commands.js`)
Apenas comandos verdadeiramente globais e reutilizáveis entre suítes. `cy.apiRequest` é a única abstração, centraliza headers padrão (`accept: application/json`) e resolução de URL.

---

## Pré-requisitos e Instalação

| Requisito | Versão mínima |
|---|---|
| Node.js | v18 |
| Java JRE | v8+ (necessário para Allure CLI) |

```bash
# Instalar dependências
npm install
```

---

## Comandos Disponíveis

### Execução de Testes

| Comando | Descrição |
|---|---|
| `npm run cy:open` | Abre o Cypress Test Runner interativo |
| `npm run cy:run` | Executa todos os testes em modo headless (Chrome) |
| `npm run cy:run:e2e` | Executa apenas os testes de UI |
| `npm run cy:run:api` | Executa apenas os testes de API |
| `npm run cy:run:api:qa` | Executa testes de API no ambiente **QA** |
| `npm run cy:run:api:hml` | Executa testes de API no ambiente **HML** |
| `npm run cy:run:api:prod` | Executa testes de API no ambiente **PROD** |

### Relatório Allure

| Comando | Descrição |
|---|---|
| `npm run allure:clear` | Remove os diretórios `allure-results` e `allure-report` |
| `npm run allure:generate` | Processa `allure-results` e gera o relatório HTML |
| `npm run allure:open` | Abre o relatório gerado no browser |

### Fluxo completo com relatório

```bash
# Limpar, executar todos os testes e gerar + abrir relatório
npm run allure:clear && npm run cy:run && npm run allure:generate && npm run allure:open

# Apenas API com relatório
npm run allure:clear && npm run cy:run:api && npm run allure:generate && npm run allure:open
```

---

## Execução por Ambiente

O framework resolve automaticamente as URLs de API e UI com base no `targetEnv` informado. O padrão é `qa`.

```bash
# Ambiente QA (padrão)
npm run cy:run:api:qa

# Ambiente de Homologação
npm run cy:run:api:hml

# Produção
npm run cy:run:api:prod

# Sobrescrita pontual de URL (qualquer ambiente)
npm.cmd run cy:run -- --env targetEnv=qa,apiBaseUrl=https://minha-api-custom.com/v2
```

---

## Variáveis de Ambiente

Configuradas em `cypress.config.js` e sobrescrevíveis via `--env` na linha de comando ou por variáveis de ambiente do sistema operacional/CI.

| Variável Cypress (`--env`) | Variável de SO | Descrição |
|---|---|---|
| `targetEnv` | `CYPRESS_TARGET_ENV` | Ambiente alvo: `local`, `qa`, `hml`, `prod` |
| `apiBaseUrl` | `CYPRESS_API_BASE_URL` | URL base da API (sobrescreve o matrix) |
| `uiBaseUrl` | `CYPRESS_UI_BASE_URL` | URL base da UI (sobrescreve o matrix) |
| `apiKey` | `CYPRESS_API_KEY` | Chave de autenticação da API |
| `uiUser` | — | Usuário padrão para login nos testes de UI |
| `uiPassword` | — | Senha padrão para login nos testes de UI |

**Exemplos de sobrescrita:**

```bash
# Via flag --env
npm.cmd run cy:run -- --env targetEnv=hml,apiKey=minha-chave-secreta

# Via variável de ambiente do SO (Windows PowerShell)
$env:CYPRESS_TARGET_ENV = "hml"
$env:CYPRESS_API_KEY = "minha-chave-secreta"
npm.cmd run cy:run:api
```

---

## Relatório Allure

O Allure é configurado para capturar automaticamente:
- Detalhes de cada request/response de API (`allureAttachRequests: true`)
- Screenshots em caso de falha (`screenshotOnRunFailure: true`)
- Vídeos de execução

Os resultados brutos ficam em `allure-results/` e o relatório HTML final em `allure-report/`.

---

## Integração CI/CD

Exemplo de configuração para pipelines (GitHub Actions, GitLab CI, etc.):

```yaml
# Exemplo GitHub Actions
- name: Executar testes API - QA
  env:
    CYPRESS_TARGET_ENV: qa
    CYPRESS_API_BASE_URL: ${{ secrets.API_BASE_URL_QA }}
    CYPRESS_API_KEY: ${{ secrets.API_KEY_QA }}
  run: npm run cy:run:api

- name: Gerar relatório Allure
  run: npm run allure:generate

- name: Publicar artefato
  uses: actions/upload-artifact@v4
  with:
    name: allure-report
    path: allure-report/
```

> **Nota:** No Windows com PowerShell, utilize `npm.cmd` em vez de `npm` caso a política de execução de scripts esteja desabilitada.