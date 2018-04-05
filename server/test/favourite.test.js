import { expect } from 'chai';
import supertest from 'supertest';
import app from '../app';

const rootURL = '/api/v1';
const recipeUrl = `${rootURL}/recipes`;
const usersUrl = `${rootURL}/users`;
const signupURl = `${usersUrl}/signup`;

const request = supertest(app);

let userToken;
let recipeId;
let userId;

describe('FAVOURITE API', () => {
  before((done) => {
    request.post(signupURl)
      .send({
        username: 'test4',
        email: 'test4@test.com',
        password: '1234567890',
        passwordConfirmation: '1234567890'
      })
      .end((error, response) => {
        userToken = response.body.token;
        userId = response.body.user.id;
        done();
      });
  });

  before((done) => {
    request.post(recipeUrl)
      .set('token', userToken)
      .send({
        title: 'Recipe test 3',
        ingredients: 'test, test, test',
        description: 'testing the recipe',
        direction: 'testing the recipe',
        imgUrl: 'https://res.cloudinary.com/dhgq8vcwi/image/upload/v1519918536/Indomielette.jpg'
      })
      .end((error, response) => {
        recipeId = response.body.recipe.id;
        expect(response.status).to.equal(201);
        expect(response.body).to.be.an('object');
        expect(response.body.recipe.title).to.equal('Recipe test 3');
        expect(response.body.recipe.ingredients)
          .to.equal('test, test, test');
        expect(response.body.recipe.description)
          .to.equal('testing the recipe');
        expect(response.body.recipe.direction)
          .to.equal('testing the recipe');
        expect(response.body.recipe.imgUrl)
          .to.be.a('string');
        expect(response.body.recipe.id)
          .to.be.a('number');
        expect(response.body.recipe.userId)
          .to.be.a('number');
        done();
      });
  });

  describe('Add favourite', () => {
    it(
      'Should not allow non auth user to add a recipe as favorite',
      (done) => {
        request.post(`/api/v1/recipes/${recipeId}/favorite`)
          .end((error, response) => {
            expect(response.status).to.equal(401);
            expect(response.body).to.be.an('object');
            expect(response.body.message).to.equal('An authorization token is required!');
            done();
          });
      }
    );

    it(
      'Should not add a recipe that doesn\'t exist, as a favorite',
      (done) => {
        request.post('/api/v1/recipes/10/favorite')
          .set('token', userToken)
          .end((error, response) => {
            expect(response.status).to.equal(404);
            expect(response.body).to.be.an('object');
            expect(response.body.message)
              .to.equal('Recipe does not exist');
            done();
          });
      }
    );

    it(
      'Should allow auth user to add a recipe as favorite',
      (done) => {
        request.post(`/api/v1/recipes/${recipeId}/favorite`)
          .set('token', userToken)
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('object');
            expect(response.body.message).to.equal('Recipe have been added to your favorites');
            done();
          });
      }
    );
    it(
      'Should allow auth user to remove a recipe as favorite',
      (done) => {
        request.post(`/api/v1/recipes/${recipeId}/favorite`)
          .set('token', userToken)
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('object');
            expect(response.body.message).to.equal('Recipe have been removed from your favorites');
            done();
          });
      }
    );

    it(
      'Should not add a recipeId that is not a number as favorite',
      (done) => {
        request.post('/api/v1/recipes/recipeId/favorite')
          .set('token', userToken)
          .end((error, response) => {
            expect(response.status).to.equal(500);
            expect(response.body).to.be.an('object');
            expect(response.body.message)
              .to.include('Invalid recipe id; id must be an number');
            done();
          });
      }
    );
  });

  describe('Get favourite', () => {
    it(
      'Should not allow non auth user to get all favorited recipes',
      (done) => {
        request.get(`/api/v1/users/${userId}/favorites`)
          .end((error, response) => {
            expect(response.status).to.equal(401);
            expect(response.body).to.be.an('object');
            expect(response.body.message).to.equal('An authorization token is required!');
            done();
          });
      }
    );

    it(
      'Should allow auth user to get all favorited recipes',
      (done) => {
        request.get(`/api/v1/users/${userId}/favorites`)
          .set('token', userToken)
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('object');
            done();
          });
      }
    );
  });
});
