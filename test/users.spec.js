import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';
import clientToken from './token.config';

chai.use(chaiHttp);
const { should } = chai;
should();

const { baseUrl, token } = clientToken;
describe('TEST ALL ENDPOINT', () => {
  describe('Initial testing', () => {
    it('should return Hello world', (done) => {
      chai
        .request(app)
        .get('/')
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('data');
          res.body.data.message.should.equal('Welcome! to the your biz-connect App');
        });
      done();
    });
  });

  describe('POST', () => {
    const newUser = {
      username: 'name',
      email: 'mail@gmail.com',
      password: 'password'
    };
    it('should return status 201 and create user', (done) => {
      chai
        .request(app)
        .post(`${baseUrl}/auth/signup`)
        .send(newUser)
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('data');
          res.body.data.message.should.equal(`${newUser.username} is successfully created as a new account`);
        });
      done();
    });
    it('should return status 400 and not create user', (done) => {
      const existingUser = {
        username: 'testname',
        email: 'mail1@gmail.com',
        password: 'newpassword',
      };
      chai
        .request(app)
        .post(`${baseUrl}/auth/signup`)
        .send(existingUser)
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('data');
          res.body.data.message.should.equal('Account already existed!');
        });
      done();
    });
  });

  describe('POST', () => {
    it('should return status 200 and login user', (done) => {
      const user = {
        email: 'mail1@gmail.com',
        password: 'newpassword',
      };
      chai
        .request(app)
        .post(`${baseUrl}/auth/login`)
        .send(user)
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('data');
          res.body.data.should.have.property('message');
        });
      done();
    });
    it('should return status 400 and not login user', (done) => {
      const fakeUser = {
        email: 'fake@mail.com',
        password: '419'
      };
      chai
        .request(app)
        .post(`${baseUrl}/auth/login`)
        .send(fakeUser)
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('data');
          res.body.data.message.should.equal('email or password is incorrect');
        });
      done();
    });
  });

  describe('DELETE', () => {
    it('should return status 200 and delete user', (done) => {
      chai
        .request(app)
        .delete(`${baseUrl}/auth/del/user/2`)
        .set('Authorization', `${token.userTwo}`)
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('data');
          res.body.data.message.should.equal('Account Is Successfully Deleted');
        });
      done();
    });
  });

  describe('GET', () => {
    it('should return status 200 and all users', (done) => {
      chai
        .request(app)
        .get(`${baseUrl}/auth/users`)
        .set('Authorization', `${token.user}`)
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('data');
          res.body.data.users.should.be.an('array');
        });
      done();
    });
  });

  describe('Midleware', () => {
    it('should return user does not exist', (done) => {
      chai
        .request(app)
        .get(`${baseUrl}/auth/users`)
        .set('Authorization', `${token.user}`)
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('data');
        });
      done();
    });
  });
});
