const { defineConfig } = require("cypress")
const allureWriter = require('@shelex/cypress-allure-plugin/writer')
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor")
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin

module.exports = defineConfig({
  e2e: {
    video: true,
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: false,
    specPattern: [
      "cypress/e2e/**/*.feature",
      "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}"
    ],
    async setupNodeEvents(on, config) {
      allureWriter(on, config)
      await addCucumberPreprocessorPlugin(on, config)
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      )
      return config
    },
  },
  env: {
    allure: true,
    allureResultsPath: "allure-results",
    allureAttachRequests: true,
    BASE_URL_API: 'https://petstore.swagger.io/v2',
    BASE_URL_UI: 'https://www.saucedemo.com/'
  }
})