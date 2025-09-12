describe('Inicio de sesión', () => {
  it('debería fallar con contraseña incorrecta', () => {
    cy.visit('http://192.168.0.14/login');

    cy.get('#inputEmail').clear().type('user@test.com');
    cy.get('#inputPassword').clear().type('incorrecta');
    //cy.get('button[type="submit"]').click();
    cy.contains('button', 'Iniciar sesión').click();

    cy.contains('Credenciales incorrectas').should('be.visible');
  });

  it('debería iniciar sesión con credenciales válidas', () => {
    cy.visit('http://192.168.0.14/login');

    cy.get('#inputEmail').clear().type('wagagt@gmail.com');
    cy.get('#inputPassword').clear().type('12345678');
    //cy.get('button[type="submit"]').click();
    cy.contains('button', 'Iniciar sesión').click();


    cy.url().should('include', '/dashboard');
    cy.contains('Dashboard').should('be.visible');
  });
});
