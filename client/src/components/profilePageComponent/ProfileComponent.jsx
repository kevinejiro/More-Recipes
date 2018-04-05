import React from 'react';
import PropTypes from 'prop-types';
/**
 *
 * @param {object} props
 *
 * @returns {JSX} JSX Component
 */
function ProfileComponent(props) {
  return (
    <div className="profile-page--sidebar">
      <div className="card user-profile">
        <div
          className="sidebar--userimg mx-auto d-block"
        >
          <img
            alt="profile"
            className="mx-auto d-block img-responsive"
            src="http://res.cloudinary.com/dhgq8vcwi/image/upload/v1520331711/default.jpg"
          />
        </div>
        <div className="sidebar--title">
          <div className="sidebar--title-name">
            {props.username}
          </div>
        </div>
      </div>
      <div
        className="mx-auto text-center"
      >
        {props.currentUser &&
          <div className=" mx-auto card button-card">

            <button
              className="btn add-button"
              id="Add-Recipe"
              name="Add Recipe"
              onClick={props.handleButtonClick}
              type="button"
            >
              Add Recipe
            </button>
          </div>
        }
      </div>
      <div className="card link-menu-card">
        <div className="link-menu">
          <ul>
            <li
              className={
                (props.currentActionType === 'My Recipes') ?
                  'active' : undefined
              }
            >
              <button
                id="My-Recipes"
                name="My Recipes"
                onClick={props.handleButtonClick}
              >
                My Recipes
              </button>
            </li>
            <li
              className={
                props.currentActionType === 'Favourite Recipes' ?
                  'active' : undefined
              }
            >
              <button
                id="Favourite-Recipes"
                name="Favourite Recipes"
                onClick={props.handleButtonClick}
              >
                Favourite Recipes
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div >
  );
}
ProfileComponent.propTypes = {
  currentActionType: PropTypes.string.isRequired,
  currentUser: PropTypes.bool.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
  username: PropTypes.string,
};
export default ProfileComponent;
