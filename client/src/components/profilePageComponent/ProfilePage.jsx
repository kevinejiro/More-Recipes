import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import ReactPaginate from 'react-paginate';

import ProfileComponent from './ProfileComponent';
import RecipeComponent from './RecipeComponent';
import AddRecipeComponent from './AddRecipeComponent';

import fetchUserRecipes, {
  fetchUserFavouriteRecipes
} from '../../actions/getUserRecipes';


/**
 * @class ProfilePage
 */
class ProfilePage extends React.Component {
  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    const { user } = this.props.auth;

    const { userId } = this.props.match.params;

    const { path } = this.props.match;

    const notCurrentUser = !(user.id === parseInt(userId, 10)
      || path === '/dashboard');

    this.state = {
      currentActionType: 'My Recipes',
      fetchedUserRecipes: [],
      username: (notCurrentUser) ? '' : user.username,
      notCurrentUser,
      loadUserDataId: parseInt((notCurrentUser) ?
        userId : user.id, 10)
    };
  }
  /**
   * @returns {void} void
   */
  componentDidMount() {
    this.getUserRecipes();
    document.body.classList.add('in-profile');
    if (!this.props.auth.isAuthenticated) {
      toastr.options = {
        closeButton: true,
        extendedTimeOut: '1000',
        positionClass: 'toast-bottom-right',
        hideMethod: 'fadeOut'
      };
      toastr.error('Please sign in to view this page.');
      this.context.router.history.push('/signin');
    }
  }

  /**
   *
   * @param {object} nextProps
   *
   * @returns {void} void
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated === false) {
      toastr.options = {
        closeButton: true,
        extendedTimeOut: '1000',
        positionClass: 'toast-bottom-right',
        hideMethod: 'fadeOut'
      };
      toastr.error('Please sign in to view this page.');
      this.context.router.history.push('/signin');
    }
    const {
      fetchedUsername,
      fetchedUserRecipes,
    } = nextProps;
    const { notCurrentUser } = this.state;
    this.setState({
      fetchedUserRecipes,
      username: (notCurrentUser) ?
        fetchedUsername : nextProps.auth.user.username
    });
  }
  /**
   * @returns {void} no return dammit
  */
  componentWillUnmount() {
    document.body.classList.remove('in-profile');
  }
  getUserRecipes = () => {
    const {
      loadUserDataId,
      currentActionType
    } = this.state;
    if (currentActionType === 'Favourite Recipes') {
      this.props.getFavouriteRecipes(loadUserDataId);
    } else {
      this.props.userRecipes(loadUserDataId);
    }
  }
  /**
   *
   * @param {object} event
   * @param {string} actionType
   *
   * @returns {void} no return dammit
   */
  handleButtonClick = (event) => {
    event.preventDefault();
    const actionType = event.target.name;

    const { currentActionType } = this.state;
    if (actionType !== currentActionType) {
      this.setState({
        currentActionType: actionType
      }, () => {
        this.getUserRecipes();
      });
    }
  }
  /**
   * @returns {JSX} JSX element
   */
  render() {
    const {
      currentActionType,
      fetchedUserRecipes,
      username,
      notCurrentUser
    } = this.state;
    return (
      <div className="container-fluid layout">
        <div className="row profile-page">
          <div className="col-sm-12 col-md-3">
            <ProfileComponent
              currentActionType={currentActionType}
              currentUser={!notCurrentUser}
              handleButtonClick={this.handleButtonClick}
              username={username}
            />
          </div>

          <div className="recipe-container-wrapper">

            {(currentActionType === 'My Recipes'
              || currentActionType === 'Favourite Recipes') &&
              <RecipeComponent
                currentActionType={currentActionType}
                recipes={fetchedUserRecipes}

              />
            }
            {currentActionType === 'Add Recipe' &&
              <AddRecipeComponent {...this.props} />
            }
          </div>
        </div>
      </div>
    );
  }
}
ProfilePage.contextTypes = {
  router: PropTypes.object.isRequired,
};
ProfilePage.propTypes = {
  auth: PropTypes.object,
  fetchedUsername: PropTypes.string,
  fetchedUserRecipes: PropTypes.array,
};
ProfilePage.defaultProps = {
  auth: {
    user: {
      username: ''
    }
  },
  fetchedUsername: '',
  fetchedUserRecipes: []
};

/**
 *
 * @param {Object} state - State from Store
 *
 * @returns {Object} new prop
 */
const mapStateToProps = state => ({
  auth: state.auth,
  fetchedUsername: state.userRecipes.username,
  fetchedUserRecipes: state.userRecipes.userRecipes
});

/**
 * @param {Object} dispatch
 *
 * @returns {Object} dispatch to props
 */
const mapDispatchToProps = dispatch => ({
  userRecipes: ID => dispatch(fetchUserRecipes(ID)),
  getFavouriteRecipes: ID => dispatch(fetchUserFavouriteRecipes(ID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
