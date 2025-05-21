const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.cy.js",
    baseUrl: "https://front.serverest.dev",
    supportFile: "cypress/support/e2e.js",
  }
});
