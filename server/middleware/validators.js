import db from '../models';

const { User, Recipe } = db;
/**
 * @returns {Object} validInput
 * @param {*} param
 */
const validateInput = {
  /**
   * @returns {Object} recipe
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  checkForRecipe(req, res, next) {
    const recipeId = req.params.recipeId ? parseInt(req.params.recipeId) : '';

    Recipe
      .findOne({
        where: {
          id: recipeId
        }
      })
      .then((recipe) => {
        if (!recipe) return res.status(404).json({ status: 'fail', message: 'Recipe does not exist' });
        next();
      })
      .catch(() => res.status(500).json({ status: 'fail', message: 'Invalid recipe id; id must be an number' }));
  },
  /**
   * @returns {Object} user
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  checkForUser(req, res, next) {
    User
      .findOne({
        where: {
          id: req.params.userId
        }
      })
      .then((user) => {
        if (!user) {
          res.status(404).json({ status: 'fail', message: 'User does not exist' });
        } else next();
      })
      .catch(() => res.status(500).json({ status: 'fail', message: 'invalid user id; id must be an number' }));
  },
  /**
   * @returns {Object} user
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  checkForUsername(req, res, next) {
    const username = (req.body.username && typeof req.body.username === 'string') ? req.body.username.trim() : '';
    if (!username) { return res.status(400).json({ status: 'fail', message: 'username and password are required' }); }
    User
      .findOne({
        where: {
          username: req.body.username
        }
      })
      .then((user) => {
        if (!user) {
          res.status(404).json({ status: 'fail', message: 'Username does not match any account' });
        } else next();
      });
  }
};

export default validateInput;
