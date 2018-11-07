import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);
const { should } = chai;
should();

const baseUrl = '/api/v1';
describe('TEST ALL ENDPOINT', () => {
  describe('Initial testing', () => {
    it('should return Hello world', (done) => {
      chai
        .request(app)
        .get('/')
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('data');
          res.body.data.message.should.equal('Hello World');
          done();
        });
    });
  });

  describe('POST', () => {
    const newBusiness = {
      businessName: 'devSquare',
      description: 'Hire a new developer hire',
      address: '321 avenue business location',
      contactNumber: '08182089681',
      categories: 'software development'
    };
    it('should return status 201 and create business', (done) => {
      chai
        .request(app)
        .post(`${baseUrl}/business/create`)
        .send(newBusiness)
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('data');
          res.body.data.message.should.equal('New Business is successfully created');
          done();
        });
    });
  });
});
