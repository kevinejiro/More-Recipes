import React from 'react';
import toastr from 'toastr';
import { connect } from 'react-redux';

import postReview from '../../actions/postReview';

/**
 * @class ReviewForm
 */
class ReviewForm extends React.Component {
  state = {
    content: '',
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit = (event) => {
    event.preventDefault();
    if (!this.state.content) {
      toastr.options = {
        closeButton: true,
        extendedTimeOut: '1000',
        positionClass: 'toast-bottom-right',
        hideMethod: 'fadeOut'
      };
      toastr.error('Review content cannot be empty');
      return;
    }

    if (!this.props.userIsAuthenticated) {
      toastr.error('Sign in to post a review');
      return;
    }

    const reviewData = {
      content: this.state.content,
      recipeId: this.props.recipeId,
    };

    this.props.postReview(reviewData);
  }

  /**
   * @returns {JSX} JSX element
   */
  render() {
    return (
      <form
        onSubmit={this.onSubmit}
        className="comment">
        <div className="form-group">
          <textarea
            className="form-control"
            id="recipeComment"
            onChange={this.onChange}
            placeholder="Review Recipe"
            rows="3"
            value={this.state.content}
            name="content"
          />
        </div>
        <div className="form-group">
          <button className="btn btn-success"
          >
            Post Review
          </button>
        </div>
      </form>
    );
  }
}

/**
 * @param {any} state
 *
 * @returns {Object} props from state
 */
const mapStateToProps = state => ({
  userIsAuthenticated: state.auth.isAuthenticated
});

/**
 * 
 * 
 * @param {any} dispatch 
 */
const mapDispatchToProps = dispatch => ({
  postReview: reviewData => dispatch(postReview(reviewData))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);

