describe('Formulario de perfil - Validación y edición', () => {
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

  it('Formulario visible con datos precargados', () => {
    cy.get('#perfil-form').should('be.visible');
    cy.get('#nombre').should('have.value', 'Juan Pérez');
    cy.get('#email').should('have.value', 'juan@example.com');
  });

  it('Permite editar y enviar el formulario', () => {
    cy.get('#nombre').clear().type('Nombre Editado');
    cy.get('#email').clear().type('nuevo@correo.com');
    cy.get('#perfil-form').submit(); // Simulación
  });
});
