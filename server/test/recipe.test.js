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

const recipe2 = {
  title: 'Recipe test 2',
  ingredients: 'test, test, test',
  description: 'testing the recipe',
  direction: 'testing the recipe',
  imgUrl: 'https://res.cloudinary.com/dhgq8vcwi/image/upload/v1519918536/Indomielette.jpg'
};

const recipe3 = {
  title: 'Recipe test3',
  ingredients: 'test, test, test',
  description: 'For testing the recipe',
  direction: 'testing the recipe',
  imgUrl: 'https://res.cloudinary.com/dhgq8vcwi/image/upload/v1519918536/Indomielette.jpg'
};


describe('RECIPE CONTROLLER', () => {
  before((done) => {
    request.post(signupURl)
      .send({
        username: 'test2',
        email: 'test2@test.com',
        password: '1234567890',
        passwordConfirmation: '1234567890'
      })
      .end((error, response) => {
        userToken = response.body.token;
        userId = response.body.user.id;
        done();
      });
  });

  describe('Add Recipe', () => {
    it('Should allow auth users to add recipe to catalog', (done) => {
      request.post(recipeUrl)
        .set('token', userToken)
        .send(recipe2)
        .end((error, response) => {
          recipeId = response.body.recipe.id;
          expect(response.status).to.equal(201);
          expect(response.body).to.be.an('object');
          expect(response.body.recipe.title).to.equal('Recipe test 2');
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

    it('Should not allow non auth user to add recipe to catalog', (done) => {
      request.post(recipeUrl)
        .send(recipe2)
        .end((error, response) => {
          expect(response.status).to.equal(401);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('An authorization token is required!');
          done();
        });
    });
  });

  describe('Update Recipe', () => {
    it('Should not update a recipe that does not exist', (done) => {
      request.put('/api/v1/recipes/20')
        .set('token', userToken)
        .send(recipe2)
        .end((error, response) => {
          expect(response.status).to.equal(404);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.be.a('string');
          done();
        });
    });

    it(
      'Should not allow non auth user to update a recipe in the catalog',
      (done) => {
        request.put(`/api/v1/recipes/${recipeId}`)
          .send(recipe2)
          .end((error, response) => {
            expect(response.status).to.equal(401);
            expect(response.body).to.be.an('object');
            expect(response.body.message).to.equal('An authorization token is required!');
            done();
          });
      }
    );

    it('Should allow auth user to update a recipe in the catalog', (done) => {
      request.put(`/api/v1/recipes/${recipeId}`)
        .set('token', userToken)
        .send(recipe3)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('object');
          expect(response.body.returnedRecipe.title).to.equal(recipe3.title);
          expect(response.body.returnedRecipe.ingredients)
            .to.equal(recipe3.ingredients);
          expect(response.body.returnedRecipe.description)
            .to.equal(recipe3.description);
          expect(response.body.returnedRecipe.direction)
            .to.equal(recipe3.direction);
          expect(response.body.returnedRecipe.imgUrl)
            .to.be.a('string');
          expect(response.body.returnedRecipe.id)
            .to.be.a('number');
          expect(response.body.returnedRecipe.userId)
            .to.be.a('number');
          done();
        });
    });

    it(
      'Should not update a particular recipe for recipeId that is not a number',
      (done) => {
        request.put('/api/v1/recipes/recipeId')
          .set('token', userToken)
          .send(recipe3)
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


  describe('Get Recipe', () => {
    it('Should allow users to view all recipes in the catalog', (done) => {
      request.get('/api/v1/recipes')
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('object');
          expect(response.body.pagination.totalCount)
            .to.be.a('number');
          expect(response.body.pagination.lastPage)
            .to.be.a('number');
          expect(response.body.pagination.currentPage)
            .to.be.a('number');
          done();
        });
    });

    it(
      'Should allow users to view a particular recipe in the catalog',
      (done) => {
        request.get(`/api/v1/recipes/${recipeId}`)
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('object');
            expect(response.body.recipe)
              .to.be.an('object');
            expect(response.body).to.have.property('recipe');
            done();
          });
      }
    );

    it('Should allow auth user view all their recipes', (done) => {
      request.get(`/api/v1/users/${userId}/recipes`)
        .set('token', userToken)
        .end((error, response) => {
          expect(response.status).to.equal(202);
          expect(response.body).to.be.an('object');
          expect(response.body.pagination.totalCount)
            .to.be.a('number');
          expect(response.body.pagination.lastPage)
            .to.be.a('number');
          expect(response.body.pagination.currentPage)
            .to.be.a('number');
          done();
        });
    });

    it('Should not allow non auth user view all their recipes', (done) => {
      request.get('/api/v1/users/70/recipes')
        .end((error, response) => {
          expect(response.status).to.equal(401);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('An authorization token is required!');
          done();
        });
    });

    it(
      'Should not get a particular recipe for recipeId that is not a number',
      (done) => {
        request.get('/api/v1/recipes/recipeId')
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

  describe('Delete a recipe', () => {
    it('Should not delete a recipe that does not exist', (done) => {
      request.delete('/api/v1/recipes/10')
        .set('token', userToken)
        .end((error, response) => {
          expect(response.status).to.equal(404);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.be.a('string');
          done();
        });
    });

    it('Should not allow a non auth user to delete a recipe', (done) => {
      request.delete(`/api/v1/recipes/${recipeId}`)
        .end((error, response) => {
          expect(response.status).to.equal(401);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('An authorization token is required!');
          done();
        });
    });

    it('Should allow an auth user delete a recipe', (done) => {
      request.delete(`/api/v1/recipes/${recipeId}`)
        .set('token', userToken)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('Recipe was deleted successfully');
          done();
        });
    });

    it(
      'Should not delete a particular recipe for recipeId that is not a number',
      (done) => {
        request.get('/api/v1/recipes/recipeId')
          .end((error, response) => {
            expect(response.status).to.equal(500);
            expect(response.body).to.be.an('object');
            expect(response.body.message)
              .to.include('Invalid recipe id; id must be an numbe');
            done();
          });
      }
    );
  });
});
