export default {
  recipeData: {
    title: 'Yes stew',
    description: 'this is a very sweet dish',
    ingredients: 'Effo, Egusi, plantain, groundnut',
    direction: 'Take all the ingredients and put them in a pot.\nstir for an hour and serve raw !!!.',
    imgUrl: 'https://res.cloudinary.com/dhgq8vcwi/image/upload/v1519918536/Indomielette.jpg',
  },
  addRecipeResponse: {
    status: 'pass',
    message: 'recipe created successfully',
    recipe: {
      upvoteCount: 0,
      downvoteCount: 0,
      id: 45,
      userId: 9,
      title: 'Yes stew',
      description: 'this is a very sweet dish',
      ingredients: 'Effo, Egusi, plantain, groundnut',
      direction: 'Take all the ingredients and put them in a pot.\nstir for an hour and serve raw !!!.',
      imgUrl: 'https://res.cloudinary.com/dhgq8vcwi/image/upload/v1519918536/Indomielette.jpg',
      updatedAt: '2018-03-21T16:55:55.289Z',
      createdAt: '2018-03-21T16:55:55.289Z'
    }
  },
  addRecipeFailure: {
    status: 'fail',
    message: 'error creating recipe'
  },
  favouriteRecipeFailure: {
    status: 'fail',
    message: 'error favouriting a recipe'
  },
  getRecipeResponse: {
    status: 200,
    response: {
      status: 'pass',
      message: 'Recipe have been added to your favorites',
      recipes: [],
      pagination: {
        totalCount: 10,
        lastPage: 1,
        currentPage: 1
      }
    }
  }
};
