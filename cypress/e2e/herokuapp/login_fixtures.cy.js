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

  it('Login fails with invalid credentials from fixture', () => {
    cy.fixture('invalidUsers').then((users) => {
      users.forEach(({ username, password }) => {
        // Para cada usuario inválido, hacemos la prueba
        cy.visit('https://the-internet.herokuapp.com/login'); // recargamos para limpiar estado

        cy.get('#username').clear().type(username);
        cy.get('#password').clear().type(password);
        cy.get('button[type="submit"]').click();

        // Verifica mensaje de error
        cy.get('#flash').should('contain.text', 'Your username is invalid!');
        cy.url().should('include', '/login');
      });
    });
  });

});
