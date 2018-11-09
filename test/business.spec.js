import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';
import clientToken from './token.config';

chai.use(chaiHttp);
const { should } = chai;
should();

const { baseUrl, token } = clientToken;

describe('TEST ALL ENDPOINT', () => {
  before('Create new business to seed database', (done) => {
    chai.request(app)
      .post(`${baseUrl}/business/register`)
      .set('Authorization', `${token.user}`)
      .send({
        businessName: 'anothertestbuiz',
        description: 'new description',
        address: '',
        categories: 'software development',
        contactNumber: '0909090334',
        createdAt: '2018-11-07',
        updatedAt: '2018-11-07'
      })
      .end((error) => {
        if (error) {
          console.log('An error occured while creating seeduser data');
        } else {
          console.log('User created successfully');
        }
        done();
      });
  });
  describe('POST', () => {
    const newBusiness = {
      businessName: 'new biz',
      description: 'Hire a new developer hire',
      address: '321 avenue business location',
      contactNumber: '08182089681',
      categories: 'software development'
    };
    it('should return status 201 and create business', (done) => {
      chai
        .request(app)
        .post(`${baseUrl}/business/register`)
        .set('Authorization', `${token.user}`)
        .send(newBusiness)
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('data');
          res.body.data.message.should.equal('New Business is successfully created');
        });
      done();
    });
  });

  describe('PUT', () => {
    const business = {
      businessName: 'devSquare',
      description: 'Hire a new developer hire',
      address: '321 avenue business location',
      contactNumber: '08182089681',
      categories: 'software development'
    };
    it('should return status 200 and update business', (done) => {
      chai
        .request(app)
        .put(`${baseUrl}/business/3`)
        .set('Authorization', `${token.user}`)
        .send(business)
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('data');
          res.body.data.message.should.equal('Business Successfully updated');
        });
      done();
    });
    it('should return status 400 and not update business', (done) => {
      chai
        .request(app)
        .put(`${baseUrl}/business/419`)
        .set('Authorization', `${token.user}`)
        .send(business)
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('data');
          res.body.data.message.should.equal('No business Found!');
        });
      done();
    });
  });

  describe('DELETE', () => {
    it('should return status 200 and delete business', (done) => {
      chai
        .request(app)
        .delete(`${baseUrl}/business/4`)
        .set('Authorization', `${token.user}`)
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('data');
          res.body.data.message.should.equal('Business Successfully Deleted');
        });
      done();
    });
    it('should return status 400 and not business not found', (done) => {
      chai
        .request(app)
        .delete(`${baseUrl}/business/419`)
        .set('Authorization', `${token.user}`)
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('data');
          res.body.data.message.should.equal('No business Found!');
        });
      done();
    });
  });

  describe('GET', () => {
    it('should return status 200 and all businesses', (done) => {
      chai
        .request(app)
        .get(`${baseUrl}/businesses`)
        .set('Authorization', `${token.user}`)
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('data');
          res.body.data.businesses.should.be.an('array');
        });
      done();
    });
    it('should return status 200 and all businesses by the category', (done) => {
      chai
        .request(app)
        .get(`${baseUrl}/businesses?categories=software development`)
        .set('Authorization', `${token.user}`)
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('data');
          res.body.data.businesses.should.be.an('array');
        });
      done();
    });
  });
});
