import recipes from '../model/recipe';
import validator from '../middleware/validators';
/**
 * @class Recipe
 */
class Recipe {
  /**
* @returns {Object} recipes
* @param {*} req
* @param {*} res
*/
  static getAllRecipe(req, res) {
    if (req.query.sort === 'upvotes') {
      if (req.query.order === 'desc') {
        recipes.sort((recipe1, recipe2) => recipe1.upvotes < recipe2.upvotes);
      } else {
        recipes.sort((recipe1, recipe2) => recipe1.upvotes > recipe2.upvotes);
      }
    }
    return res.status(200)
      .json({
        status: 'success',
        error: false,
        recipes
      });
  }
  /**
 * @returns {Object} recipes
 * @param {*} req
 * @param {*} res
 */
  static postRecipe(req, res) {
    const validate = validator(req.body);
    const recipe = Object.assign({}, req.body, {
      id: recipes.length + 1,
      upvotes: 0,
      downvotes: 0,
      favorited: 0,
      views: 0,
    });
    if (validate.valid) {
      recipes.push(recipe);
      return res.status(200).json({
        feed: recipes[recipes.length - 1],
        message: 'success',
        error: false
      });
    }
    return res.status(400).send({ status: false, message: validate.message });


    // recipes.push({
    //   id: recipes.length + 1,
    //   name: req.body.name,
    //   description: req.body.description,
    //   image: req.body.image,
    //   ingredients: req.body.ingredients,
    //   directions: req.body.directions,
    //   created: new Date(),
    //   upvotes: 0,
    //   downvotes: 0,
    //   favorited: 0,
    // });
    // return res.status(200).json({
    //   status: 'success',
    //   message: 'Recipe added',
    //   error: false,
    //   recipes
    // });
  }
  /**
 * @returns {Object} recipes
 * @param {*} req
 * @param {*} res
 */
  static deleteRecipe(req, res) {
    for (let i = 0; i < recipes.length; i += 1) {
      if (recipes[i].id === parseInt(req.params.recipeId, 10)) {
        recipes.splice(i, 1);
        return res.status(200).json({
          status: 'success',
          message: 'Recipe deleted',
          recipes,
        });
      }
    }
    return res.status(404).json({
      status: 'Error',
      message: 'Recipe not found',
    });
  }
  /**
   * @returns {Object} recipes
   * @param {*} req
   * @param {*} res
   */
  static postReview(req, res) {
    for (let i = 0; i < recipes.length; i += 1) {
      if (recipes[i].id === parseInt(req.params.recipeId, 10)) {
        console.log(recipes);
        recipes[i].reviews.push(req.body.reviews);
        return res.status(200).json({
          status: 'success',
          error: false,
          recipes
        });
      }
    }
    return res.status(404).json({
      message: 'Recipe not found',
      error: true
    });
  }
  /**
 * @returns {Object} recipes
 * @param {*} req
 * @param {*} res
 */
  static getOneRecipe(req, res) {
    for (let i = 0; i < recipes.length; i += 1) {
      if (recipes[i].id === parseInt(req.params.recipeId, 10)) {
        return res.status(200).json({
          status: 'success',
          error: false,
          recipes: recipes[i]
        });
      }
    }
    return res.status(404).json({
      message: 'Recipe not found',
      error: true
    });
  }

  /**
 * @returns {Object} recipes
 * @param {*} req
 * @param {*} res
 */
  static editRecipe(req, res) {
    for (let i = 0; i < recipes.length; i += 1) {
      if (recipes[i].id === parseInt(req.params.recipeId, 10)) {
        recipes[i].name = req.body.name;
        recipes[i].description = req.body.description;
        recipes[i].image = req.body.image;
        recipes[i].ingredients = req.body.ingredients;
        recipes[i].directions = req.body.directions;
        recipes.edited = new Date();
        return res.status(200).json({
          status: 'success',
          message: 'Recipe modified',
          recipes,
        });
      }
    }
    return res.status(404).json({
      message: 'Recipe not found',
      error: true
    });
  }
}
export default Recipe;
