import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import sweetalert from 'sweetalert2';
import toastr from 'toastr';

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
export class RecipePage extends React.Component {
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
    if (this.props.isAuthenticated) {
      this.props.voteRecipe(voteType, this.props.oneRecipe.id);
    } else {
      toastr.options = {
        closeButton: true,
        extendedTimeOut: '1000',
        positionClass: 'toast-bottom-right',
        hideMethod: 'fadeOut'
      };
      toastr.error('Please sign in to vote ');
    }
  }
  handleFavouriteBtnClick = () => {
    if (this.props.isAuthenticated) {
      this.props.favouriteRecipe(this.props.oneRecipe.id);
    } else {
      toastr.options = {
        closeButton: true,
        extendedTimeOut: '1000',
        positionClass: 'toast-bottom-right',
        hideMethod: 'fadeOut'
      };
      toastr.error('Please sign in to favourite a recipe');
    }
  }
  handleDeleteBtnClick = () => {
    sweetalert({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.props.deleteRecipe(this.props.oneRecipe.id)
          .then(() => {
            this.props.history.push('/dashboard');
          });
      } else if (
        // Read more about handling dismissals
        result.dismiss === sweetalert.DismissReason.cancel
      ) {
        sweetalert(
          'Cancelled',
          'Your Recipe is Safe .. for now :)',
          'error'
        );
      }
    });
  }
  handleEditbtnClick = () => {
    this.setState({
      isEditing: true,
    });
  }

  hasFavorited() {
    const result =
      this.props.oneRecipe.Favorites.find(fav => fav.userId === this.props.authUserId);
    if (result) {
      return true;
    }
    return false;
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
                    id="userIdName"
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
                    id="upvote"
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
                    id="downvote"
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
                    className={`fa fa-heart clickable  favourite ${this.hasFavorited() ? 'favourited' : ''}`}
                    id="favourite"
                    onClick={this.handleFavouriteBtnClick}
                  />
                  {
                    this.props.authUserId === this.props.oneRecipe.userId &&
                    <span
                      className="righticons">
                      <i
                        aria-hidden="true"
                        className="fa fa-trash trash clickable"
                        id="delete"
                        onClick={this.handleDeleteBtnClick}
                      />
                      <i
                        aria-hidden="true"
                        className="fa fa-edit edit clickable"
                        id="edit"
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


RecipePage.propTypes = {
  recipe: PropTypes.func.isRequired,
  voteRecipe: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  favouriteRecipe: PropTypes.func.isRequired,
  deleteRecipe: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  oneRecipe: PropTypes.object.isRequired,
  authUserId: PropTypes.string.isRequired,
};

/**
 * @param {Object} state
 *
 * @returns {Object} new state
 */
const mapStateToProps = state => ({
  authUserId: state.auth.user.id,
  oneRecipe: state.recipes.oneRecipe,
  isAuthenticated: state.auth.isAuthenticated,
});

/**
 *
 * @param {any} dispatch
 *
 * @returns {void}
 */
export const mapDispatchToProps = dispatch => ({
  recipe: id => dispatch(getSingleRecipe(id)),
  voteRecipe: (voteType, id) => dispatch(voteRecipe(voteType, id)),
  favouriteRecipe: id => dispatch(favouriteRecipe(id)),
  deleteRecipe: id => dispatch(deleteRecipe(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipePage);

