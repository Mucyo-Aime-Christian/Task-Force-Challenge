import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);
const { expect } = chai;
const { it, describe } = mocha;

describe('API testing', () => {
  it('it should not run non-existing routes', async () => {
    const res = await chai.request(app).get('/*');
    expect(res.status).to.be.equal(404);
    expect(res.body).to.have.property(
      'message',
      'Route Not Found',
    );
  });
});
