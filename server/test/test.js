import { expect } from 'chai';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../app';

process.env.NODE_ENV = 'test';

const rootURL = '/api/v1';
const recipesUrl = `${rootURL}/recipes`;
const usersUrl = `${rootURL}/users`;

let data = {};
const request = supertest(app);

describe('API Integration Tests', () => {
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
    const signupURl = `${usersUrl}/signup`;

    beforeEach(() => {
      data = {
        username: 'userkevin',
        password: 'password',
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
  });
});
