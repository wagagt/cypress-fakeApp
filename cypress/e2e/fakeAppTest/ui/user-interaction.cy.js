describe('Interacción de usuario - tabla y mensaje dinámico', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/users/1', {
      delay: 1000,
      statusCode: 200,
      body: {
        id: 1,
        name: 'Cypress Tester',
        email: 'tester@cypress.io'
      }
    }).as('getUser');

    cy.visit('/perfil.html');
    cy.wait('@getUser');
  });

  it('Tabla de actividades aparece con 2 filas', () => {
    cy.get('#tabla-actividades').should('be.visible');
    cy.get('#tabla-actividades tbody tr').should('have.length', 2);
  });

  it('Mensaje dinámico aparece al hacer clic en el botón', () => {
    cy.get('#mostrar-mensaje').click();
    cy.get('#mensaje')
      .should('be.visible')
      .and('contain', 'Bienvenido de nuevo, Juan');
  });
});
