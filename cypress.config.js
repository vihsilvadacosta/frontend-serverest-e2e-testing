const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.cy.js",
    baseUrl: "https://front.serverest.dev",
    supportFile: "cypress/support/e2e.js",

    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },

    env: {
      allureResultsPath: 'allure-results' 
    }
  }
});
