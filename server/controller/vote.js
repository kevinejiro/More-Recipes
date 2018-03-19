import db from '../models';

const {
  Vote,
  Recipe
} = db;

const voteCtrl = {
  /**
   * @returns {boolean} vote
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  voteRecipe(req, res, next) {
    // POST --> /recipes/:recipeId/vote-:voteType
    const recipeId = parseInt(req.params.recipeId, 10);

    const {
      voteType
    } = req.params;
    const {
      userId
    } = req;

    // if votetype is not equal to down and up --> Error !
    if (voteType !== 'down' && voteType !== 'up') {
      return res.status(400).send({
        status: 'fail',
        message: 'invalid vote type'
      });
    }

    Recipe
      .find({
        where: {
          id: recipeId,
          userId
        }
      })
      .then((recipe) => {
        if (recipe) {
          return res.status(403).json({
            success: false,
            message: 'Cant vote on own recipe'
          });
        }
        // store upvotes as true and downvote as false --> basically convert vote to boolean
        // stores true when upvote and false when downvote
        const voteCond = voteType === 'up';
        Vote
          .findAll({
            where: {
              recipeId
            }
          })
          .then((votes) => {
            // get id of users that have voted
            const alreadyVoted = votes.map(v => v.userId);
            // if current user has voted, remove vote !
            if (alreadyVoted.includes(userId)) {
              const userVote = votes.filter(v => v.userId = userId)[0];

              if (userVote.dataValues.voteType === voteCond) {
                return Vote
                  .findById(userVote.id)
                  .then(vote => vote
                    .destroy()
                    .then(() => {
                      res.msg = `${voteType}vote removed successfully!`;
                      next();
                    }));
              }
              // else create the vote.
              return Vote
                .findById(userVote.id)
                .then(vote => vote.update({
                  voteType: voteCond
                }).then(() => {
                  res.msg = `Recipe ${voteType}voted successfully!`;
                  next();
                }));
            }

            return Vote
              .create({
                recipeId,
                userId,
                voteType: voteCond
              })
              .then(() => {
                res.msg = `Recipe ${voteType}voted successfully!`;
                next();
              });
            // .catch( (err) => res.status(500).json({success: false, message: err}));
          });
      });
  },
  /**
   * @returns {Object} recipe
   * @param {*} req
   * @param {*} res
   */
  countVote(req, res) {
    const recipeId = parseInt(req.params.recipeId, 10);


    Vote
      .findAll({
        where: {
          recipeId
        }
      })
      .then((votes) => {
        const upvoteCount = votes.filter(vote => vote.voteType === true).length;
        const downvoteCount = votes.filter(vote => vote.voteType === false).length;

        Recipe
          .findById(recipeId)
          .then(recipe => recipe.update({
              upvoteCount,
              downvoteCount
            })
            .then((recipe) => {
              res.status(200).json({
                success: true,
                message: res.msg,
                recipe
              });
            }));
      })
      .catch(() => res.status(500).json({
        success: false,
        message: 'cant vote recipe'
      }));
  }
};
export default voteCtrl;
