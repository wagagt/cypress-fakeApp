Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignora errores de jQuery u otros que no afectan tus tests
  return false;
});


describe('Griffith Foods - Navegación y validaciones', () => {
    it('Visita la página principal', () => {
        cy.visit('https://griffithfoods.com');
    });

    it('Hace clic en el link About Us', () => {
        cy.viewport(1280, 720); // Fuerza vista desktop
        cy.visit('https://griffithfoods.com');

        cy.visit('https://griffithfoods.com');

        // Selección precisa usando el ID del elemento
        cy.get('#menu-item-51 > a')
            .should('be.visible')
            .click();

        cy.url().should('include', '/about-us');
    });
    
    it('Busca texto en una página (falla intencional)', () => {
        cy.visit('https://griffithfoods.com');
        cy.contains('No existe este texto'); // Esto fallará a propósito
    });
});
