import express from 'express';
import userCtrl from '../controller/user';
import recipeCtrl from '../controller/recipe';
import validateInput from '../middleware/validators';
import verifyUserSession from '../middleware/authorization';
import reviewCtrl from '../controller/review';
import favoriteCtrl from '../controller/favorite';
import voteCtrl from '../controller/vote';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 'pass',
    message: 'Welcome to More Recipes'
  });
});

router.post(
  '/users/signup',
  userCtrl.createUser
);
// signup

router.post(
  '/users/signin',
  validateInput.checkForUsername,
  userCtrl.signIn
);
// signin


router.post(
  '/recipes',
  verifyUserSession,
  recipeCtrl.createRecipe
);
// post a recipes

router.get(
  '/recipes/:recipeId',
  validateInput.checkForRecipe,
  recipeCtrl.retrieveRecipe
);
// get one recipe

router.get(
  '/users/:userId/recipes',
  verifyUserSession,
  validateInput.checkForUser,
  userCtrl.getUserRecipes
);
// get all recipes posted by a user

router.get(
  '/recipes',
  recipeCtrl.getAllRecipes
);
// get all recipes or  query {/recipes?sort=upvotes&order=des}

router.delete(
  '/recipes/:recipeId',
  verifyUserSession,
  validateInput.checkForRecipe,
  recipeCtrl.deleteRecipe
);
// delete a recipe

router.put(
  '/recipes/:recipeId',
  verifyUserSession,
  validateInput.checkForRecipe,
  recipeCtrl.editRecipe
);
// edit a recipe


router.post(
  '/recipes/:recipeId/reviews',
  verifyUserSession,
  validateInput.checkForRecipe,
  reviewCtrl.addReview
);
// add a review

router.get(
  '/recipes/:recipeId/reviews',
  validateInput.checkForRecipe,
  reviewCtrl.getReviews
);
// get reviews of a recipe;


router.post(
  '/recipes/:recipeId/favorite',
  verifyUserSession,
  validateInput.checkForRecipe,
  favoriteCtrl.favoriteRecipe
);
// add a recipe to favorite list

router.get(
  '/users/:userId/favorites',
  verifyUserSession,
  validateInput.checkForUser,
  favoriteCtrl.getUserFavorites
);
// get all favourites


router.post(
  '/recipes/:recipeId/vote-:voteType',
  verifyUserSession,
  validateInput.checkForRecipe,
  voteCtrl.voteRecipe,
  voteCtrl.countVote
);

export default router;
