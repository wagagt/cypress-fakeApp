describe('Login con comando personalizado', () => {
  it('debería iniciar sesión correctamente', () => {
    // Visita la página de login
    cy.visit('http://192.168.0.14/login'); // Asegurate que esta URL esté activa

    // ✅ Llama al comando personalizado
    cy.sicatLogin();
    cy.pause();

    // ✅ Validaciones después del login
    cy.url().should('include', '/dashboard'); // Ajustá según tu app
    cy.contains('Dashboard').should('be.visible');
  });
});
