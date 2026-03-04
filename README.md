# Cypress Automation Framework | UI & API

Este repositório contém um framework robusto de automação de testes de API e End-to-End (E2E) utilizando **Cypress** e **Cucumber**. O projeto foi desenhado seguindo padrões de Clean Code e Page Objects, focado em validar fluxos de interface (UI) e integrações de API.

## Tecnologias e Plugins
* **Cypress:** Framework principal de automação.
* **Cucumber (BDD):** Escrita de cenários em linguagem Gherkin.
* **Allure Report:** Relatórios técnicos detalhados com capturas de tela e vídeos.
* **Esbuild:** Preprocessor para execução ultra-rápida dos arquivos de teste.

---

## Instalação e Configuração

### 1. Pré-requisitos
* Node.js (v18 ou superior recomendado)
* Java JRE (necessário para o Allure command-line funcionar)

### 2. Instalar dependências
```bash
npm install
```
### 3. Execução
```bash
npm run allure:clear && npm run cy:run && npm run allure:generate && npm run allure:open
```