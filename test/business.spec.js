import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);
const { should } = chai;
should();


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
});
