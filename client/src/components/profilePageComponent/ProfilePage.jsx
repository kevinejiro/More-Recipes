import React from 'react';

import ProfileComponent from './ProfileComponent';
import RecipeComponent from './RecipeComponent';
import AddRecipeComponent from './AddRecipeComponent';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import RecipeCard from '../common/RecipeCard';
        
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
    this.state = {
      currentActionType: 'My Recipes'
    };
  }
  /**
   * @returns {void} void
   */
  componentDidMount() {
    document.body.classList.add('in-profile');
  }
  /**
   *
   * @param {object} nextProps
   *
   * @returns {void} void
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
    });
  }
  /**
   * @returns {void} no return dammit
  */
  componentWillUnmount() {
    document.body.classList.remove('in-profile');

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
      });
    }
  }
  /**
   * @returns {JSX} JSX element
   */
  render() {
    const { currentActionType } = this.state;
    return (
      <div className="container-fluid layout">
        <div className="row profile-page">
          <div className="col-sm-12 col-md-3">
            <ProfileComponent
              currentActionType={currentActionType}
              handleButtonClick={this.handleButtonClick}
            />
          </div>

          <div className="recipe-container-wrapper">

            {(currentActionType === 'My Recipes'
              || currentActionType === 'Fav Recipes') &&
              <RecipeComponent

              />
            }
            {currentActionType === 'add Recipe' &&
              <AddRecipeComponent />
            }
          </div>
        </div>
      </div>
    );
  }
}


export default ProfilePage;
