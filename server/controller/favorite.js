import db from '../models';

const {
  Recipe,
  Favorite
} = db;

const favoriteCtrl = {
  /**
   * @returns {Object} favorites
   * @param {*} req
   * @param {*} res
   */
  favoriteRecipe(req, res) {
    // Post--> api/recipes/:recipeId/favorite
    const {
      recipeId
    } = req.params;
    const {
      userId
    } = req;

    Favorite
      .findOne({
        where: {
          recipeId,
          userId
        }
      })
      .then((favorite) => {
        if (favorite) {
          return favorite
            .destroy()
            .then(res.status(200).json({
              status: 'pass',
              message: 'Recipe have been removed from your favorites'
            }));
        }
        return Favorite
          .create({
            userId,
            recipeId
          })
          .then(() => res.status(200).json({
            status: 'pass',
            message: 'Recipe have been added to your favorites'
          }))
          .catch(() => res.status(500).json({
            status: 'fail',
            message: 'An error occured while trying to favorite a recipe'
          }));
      })
      .catch(() => res.status(500).json({
        status: 'fail',
        message: 'An error occured from favorite recipe'
      }));
  },
  /**
   * @returns {Object} favorites
   * @param {*} req
   * @param {*} res
   */
  getUserFavorites(req, res) {
    // GET ---> api/users/:userId/favourites
    const {
      userId
    } = req.params;

    Favorite
      .findAll({
        where: {
          userId
        },
        include: [{
          model: Recipe
        }]
      })
      .then((favorites) => {
        const favoritesCount = favorites.length;
        if (favoritesCount === 0) {
          return res.status(200).json({
            status: 'pass',
            username: req.recoveredUsername,
            message: 'User has no recipe in favorites',
          });
        }
        const recipes = favorites.map(fav => fav.Recipe);
        return res.status(200).json({
          status: 'pass',
          username: req.recoveredUsername,
          message: `${favoritesCount} recipes found in favorite`,
          recipes
        });
      })
      .catch(() => res.status(500).json({
        status: 'fail',
        message: 'An error occured! '
      }));
  }
};
export default favoriteCtrl;
