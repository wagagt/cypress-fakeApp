describe('Performance and Reliability Example', () => {
  it('Loads the page and checks title and H1', () => {
    // Visit a real website
    cy.visit('https://example.com');

    // Check page title (Cypress autoespera que esté disponible)
    cy.title().should('include', 'Example');

    // Check main heading (DOM access, sin esperas manuales)
    cy.get('h1').should('contain.text', 'Example Domain');

    // ✅ Take a screenshot after all checks passed
    cy.screenshot('example-domain-loaded');
  });
});

describe('💥 Test with intentional failure and video recording', () => {
  it('Should fail because title is incorrect', () => {
    cy.visit('https://example.com');

    // This will fail: title does NOT include "Cypress"
    cy.title().should('include', 'Cypress');
  });
});
