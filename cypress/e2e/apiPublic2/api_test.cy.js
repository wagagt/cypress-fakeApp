describe('Separate API test with JSONPlaceholder', () => {
  let response;

  before(() => {
    cy.request('https://jsonplaceholder.typicode.com/posts/1').then((res) => {
      response = res;
    });
  });
// test commit
  it('returns status 200', () => {
    expect(response.status).to.eq(200);
  });

  it('has content-type JSON', () => {
    expect(response.headers['content-type']).to.include('application/json');
  });

  it('has all the necessary keys', () => {
    expect(response.body).to.have.all.keys('userId', 'id', 'title', 'body');
  });

  it('includes the correct userId and id', () => {
    expect(response.body).to.include({ userId: 1, id: 1 });
  });

  it('data types are correct', () => {
    expect(response.body.id).to.be.a('number');
    expect(response.body.userId).to.be.a('number');
    expect(response.body.title).to.be.a('string');
    expect(response.body.body).to.be.a('string');
  });

  it('does not contain unnecessary fields', () => {
    expect(response.body).to.not.have.property('password');
  });
});
