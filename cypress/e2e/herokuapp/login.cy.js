describe('Login Test - The Internet', () => {

  beforeEach(() => {
    cy.visit('https://the-internet.herokuapp.com/login');
  });

  it('Login succeeds with valid credentials', () => {
    cy.get('#username').clear().type('tomsmith');
    cy.get('#password').clear().type('SuperSecretPassword!');
    cy.get('button[type="submit"]').click();

    // Verifica mensaje de éxito
    cy.get('#flash').should('contain.text', 'You logged into a secure area!');
    cy.url().should('include', '/secure');
  });

  it('Login fails with invalid credentials', () => {
    cy.get('#username').clear().type('wronguser');
    cy.get('#password').clear().type('wrongpass');
    cy.get('button[type="submit"]').click();

    // Verifica mensaje de error
    cy.get('#flash').should('contain.text', 'Your username is invalid!');
    cy.url().should('include', '/login');
  });

});
