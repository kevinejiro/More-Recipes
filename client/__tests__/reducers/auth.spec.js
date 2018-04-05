// import authReducer from '../../src/reducers/auth';

// describe('Authentication Reducer', () => {
//   test('should return initial state', () => {
//     expect(authReducer(undefined, {}))
//       .toEqual({
//         isAuthenticated: false,
//         user: {},
//         errorMessage: null
//       });
//   });
//   test('should render verified user successfully', () => {
//     expect(authReducer(undefined, {
//       type: 'GET_AUTH',
//       user: {
//         id: 1,
//         username: 'Sample'
//       },
//       token: 'sample token really'
//     }))
//       .toEqual({
//         isAuthenticated: true,
//         errorMessage: '',
//         user: {
//           id: 1,
//           username: 'Sample'
//         },
//         token: 'sample token really'
//       });
//   });
// });

import reducers from '../../src/reducers/rootReducer';

describe('reducers', () => {
  let state;
  state = reducers({
    isLoading: true,
    recipes: {
      allrecipes: {
        recipes: [{
          id: 71, title: 'hey there you', description: 's.fchjzdklvhdz', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/more-recipes-7bd87.appspot.com/o/images%2F2add0a31-b3fa-487d-bc7a-c8a268235473.jpg?alt=media&token=d0fbd5bd-97ef-4460-bd2d-4a8430f88942', ingredients: 'banga soup and smoke sauce.', direction: 'l.adkfj;izdufjcd.kvj', upvoteCount: 0, downvoteCount: 0, createdAt: '2018-03-22T16:06:30.214Z', updatedAt: '2018-03-22T16:06:30.214Z', userId: 9, reviews: [], User: { id: 9, username: 'kevinejiro', fullname: null }
        }, {
          id: 72, title: 'Yes stew', description: 'this is a very sweet dish', imgUrl: 'https://res.cloudinary.com/dhgq8vcwi/image/upload/v1519918536/Indomielette.jpg', ingredients: 'Effo, Egusi, plantain, groundnut', direction: 'Take all the ingredients and put them in a pot.\nstir for an hour and serve raw !!!.', upvoteCount: 0, downvoteCount: 0, createdAt: '2018-03-23T17:06:04.876Z', updatedAt: '2018-03-23T17:06:04.876Z', userId: 9, reviews: [], User: { id: 9, username: 'kevinejiro', fullname: null }
        }, {
          id: 46, title: 'Yawhew', description: 'this is a very sweet dish', imgUrl: 'https://res.cloudinary.com/dhgq8vcwi/image/upload/v1519918536/Indomielette.jpg', ingredients: 'Effo, Egusi, plantain, groundnut', direction: 'Take all the ingredients and put them in a pot.\nstir for an hour and serve raw !!!. ', upvoteCount: 0, downvoteCount: 0, createdAt: '2018-03-21T18:17:20.446Z', updatedAt: '2018-03-21T18:18:26.368Z', userId: 9, reviews: [], User: { id: 9, username: 'kevinejiro', fullname: null }
        }, {
          id: 80, title: 'A new recipe 2', description: 'A new recipe', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/more-recipes-7bd87.appspot.com/o/images%2F30b6afab-f615-4bb7-8e81-ef51ea5572da.jpg?alt=media&token=ae07cc93-8181-4eef-81f3-b41dae79ba9e', ingredients: 'A new recipe', direction: 'A new recipe', upvoteCount: 0, downvoteCount: 0, createdAt: '2018-03-28T17:29:40.515Z', updatedAt: '2018-03-28T17:29:40.515Z', userId: 24, reviews: [], User: { id: 24, username: 'sssap', fullname: null }
        }, {
          id: 81, title: 'A very New Recipe', description: 'A very New Recipe', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/more-recipes-7bd87.appspot.com/o/images%2Fc92c40e4-a8d7-422a-8803-b09622512237.jpg?alt=media&token=f96b8a63-2605-44d2-ba5f-d3168442fb18', ingredients: 'A very New Recipe', direction: 'A very New Recipe', upvoteCount: 0, downvoteCount: 0, createdAt: '2018-03-28T17:31:09.669Z', updatedAt: '2018-03-28T17:31:09.669Z', userId: 24, reviews: [], User: { id: 24, username: 'sssap', fullname: null }
        }, {
          id: 79, title: 'response Recipe', description: 'response Recipe', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/more-recipes-7bd87.appspot.com/o/images%2Fccfd3e1a-28c2-419f-a984-7555ab596e32.jpeg?alt=media&token=456ffa6b-8f5d-411f-9494-3472a85eb15c', ingredients: 'response Recipe', direction: 'response Recipe', upvoteCount: 0, downvoteCount: 0, createdAt: '2018-03-28T17:12:24.343Z', updatedAt: '2018-03-28T17:12:24.343Z', userId: 24, reviews: [], User: { id: 24, username: 'sssap', fullname: null }
        }, {
          id: 41, title: 'yoooooooooo', description: 'ds/fg;dsjkfnoskdfgj', imgUrl: 'https://res.cloudinary.com/dhgq8vcwi/image/upload/v1519918536/Indomielette.jpg', ingredients: 'salad and cheese', direction: 'dglkj;sdjgk.sag', upvoteCount: 0, downvoteCount: 1, createdAt: '2018-03-21T13:50:42.266Z', updatedAt: '2018-03-23T18:43:57.287Z', userId: 8, reviews: [], User: { id: 8, username: 'kevin', fullname: null }
        }, {
          id: 54, title: 'xxxxxx', description: 'xxxxx', imgUrl: 'https://res.cloudinary.com/dhgq8vcwi/image/upload/v1519918536/Indomielette.jpg', ingredients: 'xxxxxx', direction: 'xxxxx', upvoteCount: 0, downvoteCount: 0, createdAt: '2018-03-21T22:51:10.722Z', updatedAt: '2018-03-21T22:51:10.722Z', userId: 8, reviews: [], User: { id: 8, username: 'kevin', fullname: null }
        }],
        pagination: { totalCount: 10, lastPage: 2, currentPage: 1 }
      },
      oneRecipe: {
        id: 0, upvoteCount: 0, downvoteCount: 0, reviews: [], User: {}, Favorites: []
      },
      allReviews: [],
      searchAction: false
    },
    userRecipes: { userRecipes: [], username: '' },
    auth: { isAuthenticated: true, user: { id: 24, username: 'sssap', email: 'sss@uu.po' }, errorMessage: null }
  }, { type: 'UNSET_LOADING' });
  expect(state).toEqual({
    isLoading: false,
    recipes: {
      allrecipes: {
        recipes: [{
          id: 71, title: 'hey there you', description: 's.fchjzdklvhdz', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/more-recipes-7bd87.appspot.com/o/images%2F2add0a31-b3fa-487d-bc7a-c8a268235473.jpg?alt=media&token=d0fbd5bd-97ef-4460-bd2d-4a8430f88942', ingredients: 'banga soup and smoke sauce.', direction: 'l.adkfj;izdufjcd.kvj', upvoteCount: 0, downvoteCount: 0, createdAt: '2018-03-22T16:06:30.214Z', updatedAt: '2018-03-22T16:06:30.214Z', userId: 9, reviews: [], User: { id: 9, username: 'kevinejiro', fullname: null }
        }, {
          id: 72, title: 'Yes stew', description: 'this is a very sweet dish', imgUrl: 'https://res.cloudinary.com/dhgq8vcwi/image/upload/v1519918536/Indomielette.jpg', ingredients: 'Effo, Egusi, plantain, groundnut', direction: 'Take all the ingredients and put them in a pot.\nstir for an hour and serve raw !!!.', upvoteCount: 0, downvoteCount: 0, createdAt: '2018-03-23T17:06:04.876Z', updatedAt: '2018-03-23T17:06:04.876Z', userId: 9, reviews: [], User: { id: 9, username: 'kevinejiro', fullname: null }
        }, {
          id: 46, title: 'Yawhew', description: 'this is a very sweet dish', imgUrl: 'https://res.cloudinary.com/dhgq8vcwi/image/upload/v1519918536/Indomielette.jpg', ingredients: 'Effo, Egusi, plantain, groundnut', direction: 'Take all the ingredients and put them in a pot.\nstir for an hour and serve raw !!!. ', upvoteCount: 0, downvoteCount: 0, createdAt: '2018-03-21T18:17:20.446Z', updatedAt: '2018-03-21T18:18:26.368Z', userId: 9, reviews: [], User: { id: 9, username: 'kevinejiro', fullname: null }
        }, {
          id: 80, title: 'A new recipe 2', description: 'A new recipe', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/more-recipes-7bd87.appspot.com/o/images%2F30b6afab-f615-4bb7-8e81-ef51ea5572da.jpg?alt=media&token=ae07cc93-8181-4eef-81f3-b41dae79ba9e', ingredients: 'A new recipe', direction: 'A new recipe', upvoteCount: 0, downvoteCount: 0, createdAt: '2018-03-28T17:29:40.515Z', updatedAt: '2018-03-28T17:29:40.515Z', userId: 24, reviews: [], User: { id: 24, username: 'sssap', fullname: null }
        }, {
          id: 81, title: 'A very New Recipe', description: 'A very New Recipe', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/more-recipes-7bd87.appspot.com/o/images%2Fc92c40e4-a8d7-422a-8803-b09622512237.jpg?alt=media&token=f96b8a63-2605-44d2-ba5f-d3168442fb18', ingredients: 'A very New Recipe', direction: 'A very New Recipe', upvoteCount: 0, downvoteCount: 0, createdAt: '2018-03-28T17:31:09.669Z', updatedAt: '2018-03-28T17:31:09.669Z', userId: 24, reviews: [], User: { id: 24, username: 'sssap', fullname: null }
        }, {
          id: 79, title: 'response Recipe', description: 'response Recipe', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/more-recipes-7bd87.appspot.com/o/images%2Fccfd3e1a-28c2-419f-a984-7555ab596e32.jpeg?alt=media&token=456ffa6b-8f5d-411f-9494-3472a85eb15c', ingredients: 'response Recipe', direction: 'response Recipe', upvoteCount: 0, downvoteCount: 0, createdAt: '2018-03-28T17:12:24.343Z', updatedAt: '2018-03-28T17:12:24.343Z', userId: 24, reviews: [], User: { id: 24, username: 'sssap', fullname: null }
        }, {
          id: 41, title: 'yoooooooooo', description: 'ds/fg;dsjkfnoskdfgj', imgUrl: 'https://res.cloudinary.com/dhgq8vcwi/image/upload/v1519918536/Indomielette.jpg', ingredients: 'salad and cheese', direction: 'dglkj;sdjgk.sag', upvoteCount: 0, downvoteCount: 1, createdAt: '2018-03-21T13:50:42.266Z', updatedAt: '2018-03-23T18:43:57.287Z', userId: 8, reviews: [], User: { id: 8, username: 'kevin', fullname: null }
        }, {
          id: 54, title: 'xxxxxx', description: 'xxxxx', imgUrl: 'https://res.cloudinary.com/dhgq8vcwi/image/upload/v1519918536/Indomielette.jpg', ingredients: 'xxxxxx', direction: 'xxxxx', upvoteCount: 0, downvoteCount: 0, createdAt: '2018-03-21T22:51:10.722Z', updatedAt: '2018-03-21T22:51:10.722Z', userId: 8, reviews: [], User: { id: 8, username: 'kevin', fullname: null }
        }],
        pagination: { totalCount: 10, lastPage: 2, currentPage: 1 }
      },
      oneRecipe: {
        id: 0, upvoteCount: 0, downvoteCount: 0, reviews: [], User: {}, Favorites: []
      },
      allReviews: [],
      searchAction: false
    },
    userRecipes: { userRecipes: [], username: '' },
    auth: { isAuthenticated: true, user: { id: 24, username: 'sssap', email: 'sss@uu.po' }, errorMessage: null }
  });
});
