import express from 'express';
import Recipe from '../controller/recipe';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Welcome to More Recipes' });
});

router.get('/recipes', Recipe.getAllRecipe);
router.post('/recipes', Recipe.postRecipe);
router.get('/recipes/:recipeId', Recipe.getOneRecipe);
router.post('/recipes/:recipeId/reviews', Recipe.postReview);
router.delete('/recipes/:recipeId', Recipe.deleteRecipe);
router.put('/recipes/:recipeId', Recipe.editRecipe);

export default router;
