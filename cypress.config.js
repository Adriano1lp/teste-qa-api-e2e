const { defineConfig } = require("cypress")
const allureWriter = require('@shelex/cypress-allure-plugin/writer')
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor")
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin

const environmentMatrix = {
  local: {
    apiBaseUrl: process.env.CYPRESS_API_BASE_URL_LOCAL || process.env.API_BASE_URL_LOCAL || 'https://petstore.swagger.io/v2',
    uiBaseUrl: process.env.CYPRESS_UI_BASE_URL_LOCAL || process.env.UI_BASE_URL_LOCAL || 'https://www.saucedemo.com/'
  },
  qa: {
    apiBaseUrl: process.env.CYPRESS_API_BASE_URL_QA || process.env.API_BASE_URL_QA || 'https://petstore.swagger.io/v2',
    uiBaseUrl: process.env.CYPRESS_UI_BASE_URL_QA || process.env.UI_BASE_URL_QA || 'https://www.saucedemo.com/'
  },
  hml: {
    apiBaseUrl: process.env.CYPRESS_API_BASE_URL_HML || process.env.API_BASE_URL_HML || 'https://petstore.swagger.io/v2',
    uiBaseUrl: process.env.CYPRESS_UI_BASE_URL_HML || process.env.UI_BASE_URL_HML || 'https://www.saucedemo.com/'
  },
  prod: {
    apiBaseUrl: process.env.CYPRESS_API_BASE_URL_PROD || process.env.API_BASE_URL_PROD || 'https://petstore.swagger.io/v2',
    uiBaseUrl: process.env.CYPRESS_UI_BASE_URL_PROD || process.env.UI_BASE_URL_PROD || 'https://www.saucedemo.com/'
  }
}

function resolveTargetEnvironment(runtimeEnv = {}) {
  const requestedEnvironment = runtimeEnv.targetEnv || process.env.CYPRESS_TARGET_ENV || 'qa'
  const selectedEnvironment = environmentMatrix[requestedEnvironment] || environmentMatrix.qa

  return {
    targetEnv: requestedEnvironment,
    apiBaseUrl: runtimeEnv.apiBaseUrl || process.env.CYPRESS_API_BASE_URL || process.env.API_BASE_URL || selectedEnvironment.apiBaseUrl,
    uiBaseUrl: runtimeEnv.uiBaseUrl || process.env.CYPRESS_UI_BASE_URL || process.env.UI_BASE_URL || selectedEnvironment.uiBaseUrl,
    apiKey: runtimeEnv.apiKey || process.env.CYPRESS_API_KEY || process.env.API_KEY || 'test-api-key',
    availableEnvironments: Object.keys(environmentMatrix)
  }
}

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

      const resolvedEnvironment = resolveTargetEnvironment(config.env)

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      )

      config.baseUrl = resolvedEnvironment.uiBaseUrl
      config.env = {
        ...config.env,
        ...resolvedEnvironment,
        BASE_URL_API: resolvedEnvironment.apiBaseUrl,
        BASE_URL_UI: resolvedEnvironment.uiBaseUrl
      }

      return config
    },
  },
  env: {
    allure: true,
    allureResultsPath: "allure-results",
    allureAttachRequests: true,
    targetEnv: 'qa'
  }
})