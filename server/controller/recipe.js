import db from '../models';

const {
  Recipe,
  Review,
  User,
  Favorite
} = db;

const recipeCtrl = {
  /**
   * @param {object} request HTTP Request Object
   * @param {object} response HTTP Response Object
   *
   * @returns {Object} recipe
   */
  retrieveRecipe(request, response) {
    // get('api/v1/recipes/:recipeId'
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
        },
        {
          model: Favorite,
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
        message: err.message
      }));
  },
  /**
   * @param {object} request HTTP Request Object
   * @param {object} response HTTP Response Object
   *
   * @returns {Object} recipe
   */
  createRecipe(request, response) {
    // post('api/v1/recipes')
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
      image
    } = request.body;

    if (!image) {
      image = 'https://res.cloudinary.com/dhgq8vcwi/image/upload/v1519918536/Indomielette.jpg';
    }

    console.log(request.body);


    return Recipe
      .create({
        userId,
        title,
        description,
        ingredients,
        direction,
        imgUrl: image
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
    // put('api/v1/recipes/:recipeId'
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
    // get('api/v1/recipes'
    let {
      sort,
      order,
      search,
      items,
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
    } else if (search && items) {
      search = search.toLowerCase();
      if (search === 'recipes') {
        items = items.split(',').join(' ').split(' ');
        items = items.filter(item => item !== '');
        const itemsList = items.map(item => ({
          $or: [{
            title: {
              $iLike: `%${item}%`,
            },
          }, {
            ingredients: {
              $iLike: `%${item}%`,
            }
          }]
        }));

        return Recipe
          .findAll({
            where: {
              $or: itemsList,
            },
            include: [{
              model: Review,
              as: 'reviews',
              attributes: ['id', 'body', 'userId']
            },
            {
              model: User,
              attributes: ['id', 'username', 'fullname']
            }]
          })
          .then((recipes) => {
            const recipeCount = recipes.length;
            if (recipeCount === 0) {
              return response
                .status(200)
                .send({
                  status: 'none',
                  message: 'No recipes found',
                  recipes
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
              message: 'cant search for recipes'
            }));
      }
      return response
        .status(400)
        .send({
          status: 'fail',
          message: 'Invalid search query',
        });
    }
    // if no query, return all the recipes by upvotes in decending order

    const limit = parseInt(request.query.limit, 10) || 12;
    const page = parseInt(request.query.page, 10) || 1;

    const offset = (page - 1) * limit;

    return Recipe
      .findAndCountAll({
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
        ],
        limit,
        offset
      })
      .then(({
        count,
        rows: recipes
      }) => {
        if (count === 0) {
          return response
            .status(200)
            .send({
              status: 'pass',
              message: 'No recipes found'
            });
        }

        const lastPage = Math.ceil(count / limit);

        response
          .send({
            status: 'pass',
            message: `${count} recipes found`,
            recipes,
            pagination: {
              totalCount: count,
              lastPage,
              currentPage: page
            }
          });
      })
      .catch(err => response.status(500).json({
        status: 'fail',
        message: err.errors[0].message
      }));
  }
};
export default recipeCtrl;
