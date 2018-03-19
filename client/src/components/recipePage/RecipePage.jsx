import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReviewBar from './ReviewBar';
import ReviewForm from './ReviewForm';


// actions
import getSingleRecipe from '../../actions/getSingleRecipe';
import voteRecipe from '../../actions/voteRecipe';
import favouriteRecipe from '../../actions/favouriteRecipe';
import deleteRecipe from '../../actions/deleteRecipe';

import EditRecipeComponent from './EditRecipeComponent';

/**
 *
 * @class RecipePage
 *
 * @param {string} voteType
 */
class RecipePage extends React.Component {
  /**
   *
   * @param {object} props
   *
   */
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };
    this.handleVoteBtnClick = this.handleVoteBtnClick.bind(this);
    this.handleFavouriteBtnClick = this.handleFavouriteBtnClick.bind(this);
    this.handleDeleteBtnClick = this.handleDeleteBtnClick.bind(this);
  }

  /**
   * @returns {void} void
   */
  componentDidMount() {
    document.body.classList.add('in-profile');
    this.props.recipe(this.props.match.params.recipeId);
  }

  /**
   *@returns {void} void
  */
  componentWillUnmount() {
    document.body.classList.remove('in-profile');
  }

  handleVoteBtnClick = (voteType) => {
    this.props.voteRecipe(voteType, this.props.oneRecipe.id);
  }
  handleFavouriteBtnClick = () => {
    this.props.favouriteRecipe(this.props.oneRecipe.id);
  }
  handleDeleteBtnClick = () => {
    this.props.deleteRecipe(this.props.oneRecipe.id)
      .then(() => {
        this.props.history.push('/dashboard');
      });
  }
  handleEditbtnClick = () => {
    console.log('this is an edit button click');
    this.setState({
      isEditing: true,
    });
  }
  /**
   * @returns {JSX} JSX element
   */
  render() {
    const { isEditing } = this.state;
    const ID = this.props.oneRecipe.userId;
    return (
      <div>
        {isEditing
          ? <EditRecipeComponent {...this.props} />
          : <div className="container marketing layout">
            <hr className="featurette-divider" />
            <div className="row featurette">
              <div className="col-md-5">
                <img
                  alt={this.props.oneRecipe.imgUrl}
                  className="featurette-image img-fluid mx-auto"
                  src={this.props.oneRecipe.imgUrl}
                />
              </div>
              <div className="col-md-7">
                <h1 className="featurette-heading"
                >
                  {this.props.oneRecipe.title}
                </h1>
                <h4>
                  Posted by
                  &nbsp;
                          <Link
                    href={`/user/${ID}`}
                    to={`/user/${ID}`}
                  >
                    {this.props.oneRecipe.User.username}
                  </Link>
                </h4>
                <hr />
                <h4 className="page-header">Descriptions</h4>
                <p>
                  {this.props.oneRecipe.description}
                </p>
                <hr />
                <h4 className="page-header">Ingredients</h4>
                <p>
                  {this.props.oneRecipe.ingredients}
                </p>
                <hr />
                <h4 className="page-header">Directions</h4>
                <p>
                  {this.props.oneRecipe.direction}
                </p>
                <div
                  className="icons">
                  <i
                    aria-hidden="true"
                    className="fa fa-thumbs-up upvote clickable"
                    onClick={() => this.handleVoteBtnClick('vote-up')}
                  >
                    <span
                      className="badge badge-default"
                    >
                      {this.props.oneRecipe.upvoteCount}
                    </span>
                  </i>
                  <i
                    aria-hidden="true"
                    className="fa fa-thumbs-down downvote clickable"
                    onClick={() => this.handleVoteBtnClick('vote-down')}
                  >
                    <span
                      className="badge"
                    >
                      {this.props.oneRecipe.downvoteCount}
                    </span>
                  </i>
                  <i
                    aria-hidden="true"
                    className="fa fa-heart clickable favourite"
                    onClick={this.handleFavouriteBtnClick}
                  />
                  {
                    this.props.authUserId === this.props.oneRecipe.userId &&
                    <span
                      className="righticons">
                      <i
                        aria-hidden="true"
                        className="fa fa-trash trash clickable"
                        onClick={this.handleDeleteBtnClick}
                      />
                      <i
                        aria-hidden="true"
                        className="fa fa-edit edit clickable"
                        onClick={this.handleEditbtnClick}
                      />
                    </span>
                  }
                </div>
                <ReviewForm recipeId={this.props.oneRecipe.id} />
                <ReviewBar {...this.props}
                />
              </div>
            </div>
          </div>
        }
      </div >
    );
  }
}
/**
 * @param {Object} state
 *
 * @returns {Object} new state
 */
const mapStateToProps = state => ({
  authUserId: state.auth.user.id,
  oneRecipe: state.recipes.oneRecipe,
  userIsAuthenticated: state.auth.isAuthenticated,
});

/**
 *
 * @param {any} dispatch
 *
 * @returns {void}
 */
const mapDispatchToProps = dispatch => ({
  recipe: id => dispatch(getSingleRecipe(id)),
  voteRecipe: (voteType, id) => dispatch(voteRecipe(voteType, id)),
  favouriteRecipe: id => dispatch(favouriteRecipe(id)),
  deleteRecipe: id => dispatch(deleteRecipe(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipePage);

