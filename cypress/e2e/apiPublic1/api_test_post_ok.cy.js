describe('API test for list of posts', () => {
  let response;

  // Run once before all tests
  before(() => {
    // Make the request and store the response
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

  // Run once before all tests
  before(() => {
    // Request a non-existent post
    cy.request({
      url: 'https://jsonplaceholder.typicode.com/posts/999999',
      failOnStatusCode: false // ❗ Prevent Cypress from failing automatically on non-2xx/3xx status codes
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

