import db from '../models';

const { Recipe, Review, User } = db;

const recipeCtrl = {
  /**
     *@returns {Object} recipe
     * @param {*} req
     * @param {*} res
     */
  retrieveRecipe(req, res) {
    const recipeId = parseInt(req.params.recipeId);
    return Recipe
      .find({
        where: { id: recipeId },
        include: [{ model: Review, as: 'reviews', attributes: ['id', 'body', 'userId'] }],
      })
      .then((recipe) => {
        if (recipe) { res.status(200).json({ status: 'pass', recipe }); } else { res.status(200).json({ status: 'fail', message: 'recipe does not exist' }); }
      })
      .catch(err => res.status(404).json({
        status: 'fail',
        message: err
      }));
  },
  /**
   * @returns {Object} recipe
   * @param {*} req
   * @param {*} res
   */
  createRecipe(req, res) {
    const { userId } = req;

    const title = req.body.title ? req.body.title.trim() : '';
    const description = req.body.description ? req.body.description.trim() : '';
    const ingredients = req.body.ingredients ? req.body.ingredients.trim() : '';
    const direction = req.body.direction ? req.body.direction.trim() : '';
    return Recipe
      .create({
        userId,
        title,
        description,
        ingredients,
        direction,
      })
      .then(recipe => res.status(201)
        .json({ status: 'pass', message: 'recipe created successfully', recipe }))
      .catch(err => res.status(500).json({ status: 'fail', message: err }));
  },
  /**
   *@returns {Object} recipe
   * @param {*} req
   * @param {*} res
   */
  editRecipe(req, res) {
    const { userId } = req;
    const { recipeId } = req.params;

    return Recipe
      .findById(recipeId)
      .then((recipe) => {
        if (recipe.userId !== userId) {
          return res.status(403).json({ status: 'fail', message: 'Not authorized to modify this recipe!' });
        }
        return recipe
          .update({
            title: req.body.title || recipe.title,
            description: req.body.description || recipe.description,
            ingredients: req.body.ingredients || recipe.ingredients,
            direction: req.body.direction || recipe.direction,
          })
          .then(recipe => res.status(200).json({ status: 'pass', message: 'recipe updated successfully', recipe }))
          .catch(() => res.status(400).json({ status: 'fail', message: 'Error modifying recipe' }));
      })
      .catch(() => res.status(500).json({
        status: 'fail',
        message: 'Error modifying recipe'
      }));
  },
  /**
   * @returns {Object} recipe
   * @param {*} req
   * @param {*} res
   */
  deleteRecipe(req, res) {
    const { userId } = req;
    // console.log(userId);
    Recipe
      .findById(req.params.recipeId)
      .then((recipe) => {
        if (recipe.userId !== userId) {
          return res.status(403).json({ status: 'fail', message: 'Not authorized to delete this recipe' });
        }
        recipe
          .destroy()
          .then(() => res.status(200).json({ status: 'pass', message: 'Recipe was deleted successfully' }))
          .catch(() => res.status(400).json({ status: 'fail', message: 'Recipe cannot be deleted' }));
      })
      .catch(() => res.status(500).json({
        status: 'fail',
        message: 'Error deleting recipe'
      }));
  },
  /**
   * @returns {Object} recipe
   * @param {*} req
   * @param {*} res
   */
  getAllRecipes(req, res) {
    let { sort, order } = req.query;
    if (sort && order) {
      // if sort and order exist convert them to lowercase
      sort = sort.toLowerCase();
      order = order.toLowerCase();

      if (sort !== 'upvotes' && sort !== 'downvotes') { return res.status(400).json({ status: 'fail', message: `Cannot sort recipes by ${sort}` }); }
      if (order !== 'ascending' && order !== 'des') { return res.status(400).send({ status: 'fail', message: 'Invalid order, Please use either ascending or des' }); }

      const orderCriteria = order === 'ascending' ? 'ASC' : 'DESC';
      const sortCriteria = sort === 'upvotes' ? 'upvoteCount' : 'downvoteCount';

      return Recipe
        .findAll({
          order: [[sortCriteria, orderCriteria]],
          include: [
            { model: Review, as: 'reviews', attributes: ['id', 'body', 'userId'] },
            { model: User, attributes: ['id', 'username', 'fullname'] }
          ]
        })
        .then((recipes) => {
          const recipeCount = recipes.length;
          if (recipeCount === 0) { return res.status(200).send({ status: 'pass', message: 'No recipes found' }); }
          res.status(200).send({ status: 'pass', message: `${recipeCount} recipes found`, recipes });
        })
        .catch(() => res.status(500).send({ status: 'fail', message: 'cant get recipes' }));
    }
    // if no query is passed, just return all the recipes by upvotes in decending order
    return Recipe
      .findAll({
        order: [['upvoteCount', 'DESC']],
        include: [
          { model: Review, as: 'reviews', attributes: ['id', 'body', 'userId'] },
          { model: User, attributes: ['id', 'username', 'fullname'] }
        ]
      })
      .then((recipes) => {
        const recipeCount = recipes.length;
        if (recipeCount === 0) { return res.status(200).send({ status: 'pass', message: 'No recipes found' }); }
        res.status(200).send({ status: 'pass', message: `${recipeCount} recipes found`, recipes });
      })
      .catch(err => res.status(404).json({
        status: 'fail',
        message: err.errors[0].message
      }));
  }
};
export default recipeCtrl;
