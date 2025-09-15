
describe('Interceptar llamada a JSONPlaceholder', () => {
  it('Muestra un nombre nuevo junto al nombre real de la API entre paréntesis', () => {
    const nombreNuevo = 'Cypress Tester';

    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/users/1', (req) => {
      // Deja que la petición continúe al servidor y espera la respuesta.
      req.continue((res) => {
        // 1. Captura el nombre real que viene en la respuesta de la API.
        const nombreReal = res.body.name;

        // 2. Crea el nuevo string con el formato: "Nombre Nuevo (Nombre Real)".
        const nombreModificado = `${nombreNuevo} (${nombreReal})`;

        // 3. Modifica el cuerpo de la respuesta antes de que llegue a la aplicación.
        res.body.name = nombreModificado;
      });
    }).as('getUser');

    cy.visit('http://localhost:8081/perfil');

    cy.wait('@getUser').then((interception) => {
      const nombreFinal = interception.response.body.name;
      cy.log(`El nombre mostrado en la UI será: "${nombreFinal}"`);

      // 4. Verifica que la UI muestre el nombre completamente modificado.
      cy.contains(nombreFinal).should('be.visible');
    });
  });
});
// ...existing code...