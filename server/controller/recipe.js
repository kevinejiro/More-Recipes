import db from '../models';

const {
  Recipe,
  Review,
  User
} = db;

const recipeCtrl = {
  /**
   * @param {object} request HTTP Request Object
   * @param {object} response HTTP Response Object
   *
   * @returns {Object} recipe
   */
  retrieveRecipe(request, response) {
    // get('/recipes/:recipeId'
    const recipeId = parseInt(request.params.recipeId, 10);
    return Recipe
      .find({
        where: {
          id: recipeId
        },
        include: [{
            model: Review,
            as: 'reviews',
            attributes: ['id', 'body', 'userId']
          },
          {
            model: User,
            attributes: ['username', 'fullname']
          }
        ],
      })
      .then((recipe) => {
        if (recipe) {
          response
            .status(200)
            .json({
              status: 'pass',
              recipe
            });
        } else {
          response
            .status(200)
            .json({
              status: 'fail',
              message: 'recipe does not exist'
            });
        }
      })
      .catch(err => response.status(404).json({
        status: 'fail',
        message: err
      }));
  },
  /**
   * @param {object} request HTTP Request Object
   * @param {object} response HTTP Response Object
   *
   * @returns {Object} recipe
   */
  createRecipe(request, response) {
    // post('/recipes')
    const {
      userId
    } = request;

    const title =
      request.body.title ?
      request.body.title.trim() : '';
    const description =
      request.body.description ?
      request.body.description.trim() : '';
    const ingredients =
      request.body.ingredients ?
      request.body.ingredients.trim() : '';
    const direction =
      request.body.direction ?
      request.body.direction.trim() : '';

    let {
      imgUrl
    } = request.body;

    if (!imgUrl) {
      imgUrl = 'https://res.cloudinary.com/dhgq8vcwi/image/upload/v1519918536/Indomielette.jpg';
    }


    return Recipe
      .create({
        userId,
        title,
        description,
        ingredients,
        direction,
        imgUrl
      })
      .then(recipe => response.status(201)
        .json({
          status: 'pass',
          message: 'recipe created successfully',
          recipe
        }))
      .catch(err => response.status(500).json({
        status: 'fail',
        message: err
      }));
  },
  /**
   * @param {object} request HTTP Request Object
   * @param {object} response HTTP Response Object
   *
   * @returns {Object} recipe
   */
  editRecipe(request, response) {
    // put('/recipes/:recipeId'
    const {
      userId
    } = request;
    const {
      recipeId
    } = request.params;

    return Recipe
      .findById(recipeId)
      .then((recipe) => {
        if (recipe.userId !== userId) {
          return response.status(403)
            .json({
              status: 'fail',
              message: 'Not authorized to modify this recipe!'
            });
        }
        return recipe
          .update({
            title: request.body.title || recipe.title,
            description: request.body.description || recipe.description,
            ingredients: request.body.ingredients || recipe.ingredients,
            direction: request.body.direction || recipe.direction,
          })
          .then(returnedRecipe => response
            .status(200)
            .json({
              status: 'pass',
              message: 'recipe updated successfully',
              returnedRecipe
            }))
          .catch(() => response
            .status(400)
            .json({
              status: 'fail',
              message: 'Error modifying recipe'
            }));
      })
      .catch(() => response
        .status(500).json({
          status: 'fail',
          message: 'Error modifying recipe'
        }));
  },
  /**
   * @param {object} request HTTP Request Object
   * @param {object} response HTTP Response Object
   *
   * @returns {Object} recipe
   */
  deleteRecipe(request, response) {
    const {
      userId
    } = request;
    Recipe
      .findById(request.params.recipeId)
      .then((recipe) => {
        if (recipe.userId !== userId) {
          return response
            .status(403)
            .json({
              status: 'fail',
              message: 'Not authorized to delete this recipe'
            });
        }
        recipe
          .destroy()
          .then(() => response
            .status(200)
            .json({
              status: 'pass',
              message: 'Recipe was deleted successfully'
            }))
          .catch(() => response
            .status(400)
            .json({
              status: 'fail',
              message: 'Recipe cannot be deleted'
            }));
      })
      .catch(() => response
        .status(500)
        .json({
          status: 'fail',
          message: 'Error deleting recipe'
        }));
  },
  /**
   * @param {object} request HTTP Request Object
   * @param {object} response HTTP Response Object
   *
   * @returns {Object} recipe
   */
  getAllRecipes(request, response) {
    // get('/recipes'
    let {
      sort,
      order
    } = request.query;
    if (sort && order) {
      // if sort and order exist convert them to lowercase
      sort = sort.toLowerCase();
      order = order.toLowerCase();

      if (sort !== 'upvotes' && sort !== 'downvotes') {
        return response
          .status(400)
          .json({
            status: 'fail',
            message: `Cannot sort recipes by ${sort}`
          });
      }
      if (order !== 'ascending' && order !== 'des') {
        return response
          .status(400)
          .send({
            status: 'fail',
            message: 'Invalid order, Please use either ascending or des'
          });
      }

      const orderCriteria = order === 'ascending' ? 'ASC' : 'DESC';
      const sortCriteria = sort === 'upvotes' ? 'upvoteCount' : 'downvoteCount';

      return Recipe
        .findAll({
          order: [
            [sortCriteria, orderCriteria]
          ],
          include: [{
              model: Review,
              as: 'reviews',
              attributes: ['id', 'body', 'userId']
            },
            {
              model: User,
              attributes: ['id', 'username', 'fullname']
            }
          ]
        })
        .then((recipes) => {
          const recipeCount = recipes.length;
          if (recipeCount === 0) {
            return response
              .status(200)
              .send({
                status: 'pass',
                message: 'No recipes found'
              });
          }
          response
            .status(200)
            .send({
              status: 'pass',
              message: `${recipeCount} recipes found`,
              recipes
            });
        })
        .catch(() => response
          .status(500)
          .send({
            status: 'fail',
            message: 'cant get recipes'
          }));
    }
    // if no query, return all the recipes by upvotes in decending order
    return Recipe
      .findAll({
        order: [
          ['upvoteCount', 'DESC']
        ],
        include: [{
            model: Review,
            as: 'reviews',
            attributes: ['id', 'body', 'userId']
          },
          {
            model: User,
            attributes: ['id', 'username', 'fullname']
          }
        ]
      })
      .then((recipes) => {
        const recipeCount = recipes.length;
        if (recipeCount === 0) {
          return response
            .status(200)
            .send({
              status: 'pass',
              message: 'No recipes found'
            });
        }
        response
          .status(200)
          .send({
            status: 'pass',
            message: `${recipeCount} recipes found`,
            recipes
          });
      })
      .catch(err => response.status(404).json({
        status: 'fail',
        message: err.errors[0].message
      }));
  }
};
export default recipeCtrl;
