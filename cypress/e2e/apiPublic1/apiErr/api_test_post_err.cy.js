describe('Intentional API Errors', () => {
  it('Fails because of missing failOnStatusCode: false', () => {
    // This test will FAIL because the response is 404 and Cypress by default fails on non-2xx
    cy.request('https://jsonplaceholder.typicode.com/posts/999999');
  });

  it('Fails on wrong status code assertion', () => {
    cy.request({
      url: 'https://jsonplaceholder.typicode.com/posts/1',
      failOnStatusCode: false
    }).then((res) => {
      // Intentionally wrong: expecting 404 on a valid endpoint
      expect(res.status).to.eq(404); // ❌ this will fail
    });
  });

  it('Fails on unexpected body content', () => {
    cy.request('https://jsonplaceholder.typicode.com/posts/1').then((res) => {
      // Intentionally checking wrong value
      expect(res.body.id).to.eq(999); // ❌ this will fail
    });
  });

  it('Fails because of a non-existent field', () => {
    cy.request('https://jsonplaceholder.typicode.com/posts/1').then((res) => {
      // This property does not exist in the response
      expect(res.body).to.have.property('not_a_real_field'); // ❌ this will fail
    });
  });
});
