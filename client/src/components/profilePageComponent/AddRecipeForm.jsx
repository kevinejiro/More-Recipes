import React from 'react';
import toastr from 'toastr';
import { connect } from 'react-redux';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';

import addRecipe from '../../actions/addRecipe';

/**
 *
 *
 * @class addRecipeForm
 * @extends {React.Component}
 */
class AddRecipeForm extends React.Component {
  state = {
    title: '',
    description: '',
    ingredients: '',
    direction: '',
    image: '',
    isUploading: false,
    progress: 0,
  };


  handleUploadStart = () => {
    this.setState({ isUploading: true, progress: 0, });
  }

  handleProgress = (progress) => {
    this.setState({ progress });
  }

  handleUploadSuccess = (filename) => {
    firebase
      .storage()
      .ref('images')
      .child(filename)
      .getDownloadURL()
      .then((url) => {
        this.setState({
          image: url,
          progress: 100,
          isUploading: false,
        });
      });
  }
  handleUploadError = (error) => {
    this.setState({ isUploading: false });
    toastr.options = {
      closeButton: true,
      extendedTimeOut: '1000',
      positionClass: 'toast-bottom-right',
      hideMethod: 'fadeOut'
    };
    toastr.error(error);
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
*
*
* @param {any} event
* @returns {void} any
*/
  onSubmit = (event) => {
    event.preventDefault();
    if (!this.state.title ||
      !this.state.description ||
      !this.state.direction ||
      !this.state.ingredients) {
      toastr.options = {
        closeButton: true,
        extendedTimeOut: '1000',
        positionClass: 'toast-bottom-right',
        hideMethod: 'fadeOut'
      };
      toastr.error('Please fill in all Fields');
      return;
    }

    if (!this.props.userIsAuthenticated) {
      toastr.error('Sign in to add a recipe');
      return;
    }

    const recipeData = {
      title: this.state.title,
      description: this.state.description,
      direction: this.state.direction,
      ingredients: this.state.ingredients,
      image: this.state.image
    };
    this.props.addRecipe(recipeData)
      .then(() => {
        this.props.history.push('/toprecipes');
      });
  }
  /**
   * @returns {JSX} JSX element
   */
  render() {
    return (
      <form
        onSubmit={this.onSubmit}>
        <div
          className="form-group recipeform">
          <label
            className="labeltext"
          >
            Title
          </label>
          <input
            className="form-control"
            id="recipeTitle"
            name="title"
            onChange={this.onChange}
            placeholder="Add A Recipe Title ..."
            type="text"
            value={this.state.title}
          />
        </div>
        <div
          className="form-group recipeform">
          <label
            className="labeltext"
          >
            Description
          </label>
          <textarea
            className="form-control"
            id="recipeDescription"
            name="description"
            onChange={this.onChange}
            placeholder="Add A Short Recipe Description ..."
            rows="3"
            value={this.state.description}
          />
        </div>
        <div
          className="form-group recipeform">
          <label
            className="labeltext"
          >
            Ingredients
          </label>
          <textarea
            className="form-control"
            id="recipeIngredient"
            name="ingredients"
            onChange={this.onChange}
            placeholder="Add Recipe Ingredients ..."
            rows="3"
            value={this.state.ingredients}
          />
        </div>
        <div
          className="form-group recipeform">
          <label className="labeltext"
          >
            Directions
          </label>
          <textarea
            className="form-control"
            id="recipeDirections"
            name="direction"
            onChange={this.onChange}
            placeholder="Add Recipe Directions ..."
            rows="5"
            value={this.state.direction}
          />
        </div>
        <div
          className="form-group">
          <FileUploader
            accept="image/*"
            name="image"
            onProgress={this.handleProgress}
            onUploadError={this.handleUploadError}
            onUploadStart={this.handleUploadStart}
            onUploadSuccess={this.handleUploadSuccess}
            randomizeFilename
            storageRef={firebase.storage().ref('images')}
          />
        </div>
        <button
          className="btn btn-primary app-btn"
          type="submit"
        >
          Add Recipe
        </button>
      </form>
    );
  }
}
/**
 * @param {Object} state
 *
 * @returns {Object} props from state
 */
const mapStateToProps = state => ({
  userIsAuthenticated: state.auth.isAuthenticated
});

/**
 * @param {Object} dispatch
 *
 * @returns {Object} dispatch to props
 */
const mapDispatchToProps = dispatch => ({
  addRecipe: recipeData => dispatch(addRecipe(recipeData))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRecipeForm);
