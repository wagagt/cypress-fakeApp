describe('Login Test with Custom Command', () => {

  beforeEach(() => {
    cy.visit('https://the-internet.herokuapp.com/login');
  });

  it('Login succeeds with valid credentials using custom command', () => {
    cy.login('tomsmith', 'SuperSecretPassword!');

    // Verifica mensaje de éxito
    cy.get('#flash').should('contain.text', 'You logged into a secure area!');
    cy.url().should('include', '/secure');
  });

});
