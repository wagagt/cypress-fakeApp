describe('Carga de datos - perfil.html', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/users/1', {
      delay: 2000,
      statusCode: 200,
      body: {
        id: 1,
        name: 'Cypress Tester',
        email: 'tester@cypress.io'
      }
    }).as('getUser');

    cy.visit('/perfil.html');
  });

  it('Muestra loader y luego datos del usuario', () => {
    cy.get('#loader').should('be.visible');
    cy.wait('@getUser');
    cy.get('#loader').should('not.exist');
    cy.get('#user').should('contain', 'Cypress Tester');
  });
});


// ✅ API tests

describe('API test for list of posts', () => {
  let response;

  before(() => {
    cy.request('https://jsonplaceholder.typicode.com/posts').then((res) => {
      response = res;
    });
  });

  it('returns status 200', () => {
    expect(response.status).to.eq(200);
  });

  it('returns an array', () => {
    expect(response.body).to.be.an('array');
  });

  it('contains 100 posts', () => {
    expect(response.body).to.have.length(100);
  });

  it('each post has expected keys', () => {
    response.body.forEach(post => {
      expect(post).to.have.all.keys('userId', 'id', 'title', 'body');
    });
  });

  it('first post has id 1', () => {
    expect(response.body[0].id).to.eq(1);
  });

  it('all userIds are between 1 and 10', () => {
    const userIds = response.body.map(post => post.userId);
    userIds.forEach(id => {
      expect(id).to.be.within(1, 10);
    });
  });
});


describe('API test for 404 error', () => {
  let response;

  before(() => {
    cy.request({
      url: 'https://jsonplaceholder.typicode.com/posts/999999',
      failOnStatusCode: false
    }).then((res) => {
      response = res;
    });
  });

  it('returns status 404', () => {
    expect(response.status).to.eq(404);
  });

  it('returns an empty body', () => {
    expect(response.body).to.be.empty;
  });

  it('does not include typical post properties', () => {
    expect(response.body).to.not.have.property('id');
    expect(response.body).to.not.have.property('title');
  });
});
