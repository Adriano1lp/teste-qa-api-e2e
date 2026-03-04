import { After } from "@badeball/cypress-cucumber-preprocessor";

After({ tags: "not @no_screenshot" }, function () {
  const fileName = `screenshot_${Date.now()}`;
  cy.screenshot(fileName, { capture: 'viewport' });
});