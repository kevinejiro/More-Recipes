import db from '../models';

const { Review } = db;

const reviewCtrl = {
  /**
     * @returns {Object} review
     * @param {*} req
     * @param {*} res
     */
  addReview(req, res) {
    // --> api/recipes/<recipeId>/review
    const { userId } = req;
    const { content } = req.body;
    const { recipeId } = req.params;

    // check review was inputed
    if (!content || !content.trim()) { return res.status(400).json({ status: 'fail', message: 'Review is required' }); }
    // check if the user have posted a review on the recipe before
    // a user can only post a review once.
    Review
      .findOne({
        where: {
          recipeId, userId
        }
      })
      .then((review) => {
        if (review) {
          return res.status(403).json({ status: 'fail', message: 'You already posted a review for this recipe' });
        }
        return Review.create({
          userId,
          recipeId,
          body: content
        })
          .then(() => res.status(200).json({ status: 'pass', message: 'Your review have been posted successfully' }))
          .catch(() => res.statu(500).json({ status: 'fail', message: 'Something went wrong while adding review' }));
      })
      .catch(() => res.status(500).json({ status: 'fail', message: 'Something went wrong while adding this review' }));
  },
  /**
   * @returns {Object} reviews
   * @param {*} req
   * @param {*} res
   */
  getReviews(req, res) {
    // get('/recipes/:recipeId/reviews'
    const { recipeId } = req.params;

    Review
      .findAll({
        attributes: ['id', 'body', 'createdAt', 'updatedAt'],
        where: {
          recipeId
        }
      })
      .then((reviews) => {
        const reviewLength = reviews.length;
        if (reviewLength == 0) { return res.status(404).json({ status: 'pass', message: 'No review found for this recipe' }); }
        return res.status(200).json({ status: 'pass', message: `${reviewLength} reviews found`, reviews });
      })
      .catch(() => res.status(500).json({ success: false, message: 'Error adding review' }));
  }
};
export default reviewCtrl;
