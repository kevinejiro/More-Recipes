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
    // Post--> api/v1/recipes/:recipeId/favorite
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
          console.log(favorite);
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
    // GET ---> api/v1/users/:userId/favourites
    const {
      userId
    } = req.params;

    const limit = parseInt(req.query.limit, 10) || 12;
    const page = parseInt(req.query.page, 10) || 1;

    const offset = (page - 1) * limit;

    Favorite
      .findAndCountAll({
        where: {
          userId
        },
        include: [{
          model: Recipe
        }],
        limit,
        offset
      })
      .then(({ count, rows: favorites }) => {
        if (count === 0) {
          return res.status(200).json({
            status: 'pass',
            username: req.recoveredUsername,
            message: 'User has no recipe in favorites',
          });
        }
        const recipes = favorites.map(fav => fav.Recipe);
        const lastPage = Math.ceil(count / limit);

        return res.send({
          status: 'pass',
          username: req.recoveredUsername,
          recipes,
          pagination: {
            totalCount: count,
            lastPage,
            currentPage: page
          }
        });
      })
      .catch(() => res.status(500).json({
        status: 'fail',
        message: 'An error occured!'
      }));
  }
};
export default favoriteCtrl;
