import { expect } from 'chai';
import supertest from 'supertest';
import app from '../app';

const rootURL = '/api/v1';
const recipesUrl = `${rootURL}/recipes`;
const usersUrl = `${rootURL}/users`;
const signupURl = `${usersUrl}/signup`;
const signInUrl = `${usersUrl}/signin`;

let data = {};
const request = supertest(app);

describe('User API Integration Tests', () => {
  it('Should return home page', (done) => {
    // calling home page api
    request.get(rootURL)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Welcome to More Recipes');
        expect(res.body.status).to.equal('pass');
        done();
      });
  });

  describe('User signup', () => {
    beforeEach(() => {
      data = {
        username: 'userkevin',
        password: 'password',
        passwordConfirmation: 'password',
        email: 'example@user.com',
      };
    });
    it('return 400 for an empty username ', (done) => {
      const invalidData = Object.assign({}, data);
      invalidData.username = '';

      request.post(signupURl)
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Username is required');
          done();
        });
    });

    it('return 400 for an empty email ', (done) => {
      const invalidData = Object.assign({}, data);
      invalidData.email = '  ';

      request.post(signupURl)
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Email is required');
          done();
        });
    });

    it('return 400 for an empty password', (done) => {
      const invalidData = Object.assign({}, data);
      invalidData.password = ' ';

      request.post(signupURl)
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Password is required');
          done();
        });
    });

    it('return 400 for an invalid email', (done) => {
      const invalidData = Object.assign({}, data);
      invalidData.email = 'somerubbish';

      request.post(signupURl)
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('invalid email address');
          done();
        });
    });

    it('return 400 for a password less than 7 characters', (done) => {
      const invalidData = Object.assign({}, data);
      invalidData.password = 'key';

      request.post(signupURl)
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Password must be at least 7 characters long');
          done();
        });
    });
    it('return 422 for a username less than 4 characters', (done) => {
      const invalidData = Object.assign({}, data);
      invalidData.username = 'toy';

      request.post(signupURl)
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Username must be between 4 and 15 characters long, with no space between characters');
          done();
        });
    });
    it('return 200 for a correct signup', (done) => {
      const validData = Object.assign({}, data);
      request.post(signupURl)
        .send(validData)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Account created successfully');
          expect(res.body.user.username).to.equal(validData.username);
          expect(res.body.user.email).to.equal(validData.email);
          expect(res.body).to.have.property('token');
          done();
        });
    });
  });
  describe('User signin', () => {
    before((done) => {
      data = {
        username: 'kevinjohn',
        password: 'passwordforthis',
        passwordConfirmation: 'passwordforthis',
        email: 'examplekevin@user.com',
      };
      request.post(signupURl)
        .send(data)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });
    it('return 400 for an empty username', (done) => {
      request.post(signInUrl)
        .send({
          username: '',
          password: 'passwordforthis',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('username and password are required');
          done();
        });
    });
    it('return 400 for an empty password', (done) => {
      request.post(signInUrl)
        .send({
          username: 'kevinjohn',
          password: '',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('username and password are required');
          done();
        });
    });
    it('return 400 for an invalid password', (done) => {
      request.post(signInUrl)
        .send({
          username: 'kevinjohn',
          password: 'password',
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('Username or password incorrect');
          done();
        });
    });
    it('return 200 for a successful signin', (done) => {
      request.post(signInUrl)
        .send({
          username: 'kevinjohn',
          password: 'passwordforthis',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Log in was successful');
          done();
        });
    });
  });
});
