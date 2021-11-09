const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const { expect, request } = chai
chai.use(chaiHttp);

global.request = chai.request(app);

describe('api', () => {
  it('/', async () => {
    const response = await global.request.get('/');
    expect(response.status).to.equal(200);
    expect(
      Object.keys(response.body)
    ).to.have.members(['standings', 'schedule']);
  });
});
