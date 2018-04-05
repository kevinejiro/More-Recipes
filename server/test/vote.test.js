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
  title: 'Test Recipe 4',
  ingredients: 'test, test, test',
  description: 'For testing recipe 4',
  direction: 'For testing recipe 4',
  imgUrl: 'https://res.cloudinary.com/dhgq8vcwi/image/upload/v1519918536/Indomielette.jpg'
};

describe('VOTE API', () => {
  before((done) => {
    request.post(signupURl)
      .send({
        username: 'test5',
        email: 'test5@test.com',
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
        done();
      });
  });

  describe('Upvote a recipe', () => {
    it(
      'Should not upvote a recipe if the upvote query is not provided',
      (done) => {
        request.post(`/api/v1/recipes/${recipeId}/vote-`)
          .set('token', userToken)
          .end((error, response) => {
            expect(response.status).to.equal(404);
            expect(response.body).to.be.an('object');
            expect(response.body.message)
              .to.equal('Not Found!');
            done();
          });
      }
    );

    it(
      'Should not upvote a recipe if the correct query action is not provided',
      (done) => {
        request.post(`/api/v1/recipes/${recipeId}/vote-test`)
          .set('token', userToken)
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body).to.be.an('object');
            expect(response.body.message)
              .to.equal('invalid vote type');
            done();
          });
      }
    );

    it('Should not upvote a recipe that doesn\'t exist', (done) => {
      request.post('/api/v1/recipes/10/vote-up')
        .set('token', userToken)
        .end((error, response) => {
          expect(response.status).to.equal(404);
          expect(response.body.message)
            .to.equal('Recipe does not exist');
          done();
        });
    });

    it('Should not allow non auth users to upvote a recipe', (done) => {
      request.post(`/api/v1/recipes/${recipeId}/vote-up`)
        .end((error, response) => {
          expect(response.status).to.equal(401);
          expect(response.body.message).to.equal('An authorization token is required!');
          done();
        });
    });

    it('Shouldnt allow users to upvote or downvote their own recipe', (done) => {
      request.post(`/api/v1/recipes/${recipeId}/vote-up`)
        .set('token', userToken)
        .end((error, response) => {
          expect(response.status).to.equal(403);
          expect(response.body.message)
            .to.equal('Cant vote on own recipe');
          done();
        });
    });
  });
});
