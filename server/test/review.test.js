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

const recipe1 = {
  title: 'Recipe test 1',
  ingredients: 'test, test, test',
  description: 'testing the recipe',
  direction: 'testing the recipe',
  imgUrl: 'https://res.cloudinary.com/dhgq8vcwi/image/upload/v1519918536/Indomielette.jpg'
};

const review1 = {
  content: 'A Really good recipe'
};

describe('REVIEW API', () => {
  before((done) => {
    request.post(signupURl)
      .send({
        username: 'test3',
        email: 'test3@test.com',
        password: '1234567890',
        passwordConfirmation: '1234567890'
      })
      .end((error, response) => {
        userToken = response.body.token;
        done();
      });
  });

  before((done) => {
    request.post(recipeUrl)
      .set('token', userToken)
      .send(recipe1)
      .end((error, response) => {
        recipeId = response.body.recipe.id;
        expect(response.status).to.equal(201);
        expect(response.body.recipe.title).to.equal(recipe1.title);
        expect(response.body.recipe.ingredients)
          .to.equal(recipe1.ingredients);
        expect(response.body.recipe.description)
          .to.equal(recipe1.description);
        expect(response.body.recipe.direction)
          .to.equal(recipe1.direction);
        expect(response.body.recipe.imgUrl)
          .to.be.a('string');
        expect(response.body.recipe.id)
          .to.be.a('number');
        expect(response.body.recipe.userId)
          .to.be.a('number');
        done();
      });
  });

  describe('Add review', () => {
    it(
      'Should not allow non auth user to add a review for a recipe',
      (done) => {
        request.post(`/api/v1/recipes/${recipeId}/reviews`)
          .send(review1)
          .end((error, response) => {
            expect(response.status).to.equal(401);
            expect(response.body).to.be.an('object');
            expect(response.body.message).to.equal('An authorization token is required!');
            done();
          });
      }
    );

    it('Should not add review with an empty content field', (done) => {
      request.post(`/api/v1/recipes/${recipeId}/reviews`)
        .set('token', userToken)
        .send({
          content: ''
        })
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.message)
            .to.include('Review is required');
          done();
        });
    });

    it('Should allow auth user to add a review for a recipe', (done) => {
      request.post(`/api/v1/recipes/${recipeId}/reviews`)
        .set('token', userToken)
        .send(review1)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('Your review have been posted successfully');
          done();
        });
    });

    it('Should not add review for a recipeId that is not a number', (done) => {
      request.post('/api/v1/recipes/recipeId/reviews')
        .set('token', userToken)
        .send(review1)
        .end((error, response) => {
          expect(response.status).to.equal(500);
          expect(response.body).to.be.an('object');
          expect(response.body.message)
            .to.include('Invalid recipe id; id must be an number');
          done();
        });
    });
  });
});
