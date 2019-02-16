const chaiHttp = require('chai-http');
const chai = require('chai');

const server = require('../../src/index.js');
const { User } = require('../../src/models/User');

const should = chai.should();
chai.use(chaiHttp);

const registerDetails = {
  password: 'password',
  email: 'moe@email.com',
  fullname: 'Moe Doe'
};

const loginDetails = {
  email: registerDetails.email,
  password: registerDetails.password
};

describe('Feature', () => {
  before((done) => {
    User.remove({}, () => {
      done();
    });
  });

  describe('Register User', () => {
    it('should return a success message after creating a new user', (done) => {
      chai.request(server)
        .post('/api/v1/register')
        .send(registerDetails)
        .end((error, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.success.should.equal(true);
          res.body.message.should.equal('User successful created');
          done();
        });
    });

    it('should return a failure message if the user details already exist', (done) => {
      chai.request(server)
        .post('/api/v1/register')
        .send(registerDetails)
        .end((error, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.success.should.equal(false);
          res.body.message.should.equal('The email address you have entered is already associated with another account.');
          done();
        });
    });
  });

  describe('Loging User', () => {
    it('should return a success message after logging in with valid details', (done) => {
      chai.request(server)
        .post('/api/v1/login')
        .send(loginDetails)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.success.should.equal(true);
          res.body.should.have.property('token');
          res.body.message.should.equal(`${registerDetails.fullname}, You have successfully logged in.`);
          done();
        });
    });

    it('should return a failure message when using wrong password', (done) => {
      const invalidLoginDetails = {
        email: loginDetails.email,
        password: 'wrongpassword'
      };

      chai.request(server)
        .post('/api/v1/login')
        .send(invalidLoginDetails)
        .end((error, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.success.should.equal(false);
          res.body.message.should.equal('Please enter your correct login credentials.');
          done();
        });
    });

    it('should return a failure message when user details do not exist', (done) => {
      const fakeUserDetails = {
        email: 'fake@email.com',
        password: 'password'
      };

      chai.request(server)
        .post('/api/v1/login')
        .send(fakeUserDetails)
        .end((error, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.success.should.equal(false);
          res.body.message.should.equal('Authentication failed. User not found.');
          done();
        });
    });
  });
});
