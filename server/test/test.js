import { expect } from 'chai';
import supertest from 'supertest';
import app from '../app';

const rootURL = '/api/v1';
const recipesUrl = `${rootURL}/recipes`;

const request = supertest(app);

describe('API Integration Tests', () => {
  it('Should return home page', (done) => {
    // calling home page api
    request.get(rootURL)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Welcome to More Recipes');
        expect(res.body.success).to.equal(true);
        done();
      });
  });
  it('Should return recipes', (done) => {
    // calling home page api
    request.get(recipesUrl)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
});
