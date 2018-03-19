import React from 'react';
import { connect } from 'react-redux';

import Reviews from './Reviews';

import getAllReviews from '../../actions/getAllReviews';

/**
 *
*/
class ReviewBar extends React.Component {
  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * @returns {void} void
   */
  componentWillMount() {
    this.props.reviews(this.props.match.params.recipeId);
  }

  /**
   * @returns {JSX} JSX element
   */
  render() {
    const reviews = this.props.allReviews ? this.props.allReviews : [];
    let reviewList;
    if (reviews.length === 0) {
      reviewList = (
        <div className="text-center">
          <h6> This recipe hasnt been reviewed </h6>
        </div>
      );
    } else {
      reviewList = reviews.map((review, i) => (
        <div key={`review${i + 1}`}>
          <Reviews {...review} />
        </div>
      ));
    }
    return (
      <div>
        <div
          className="my-3 p-3 bg-dark rounded box-shadow">
          <h6
            className="border-bottom border-gray pb-2 mb-0"
          >
            Recent Reviews
          </h6>
          {reviewList}
        </div>
      </div>
    );
  }
}

/**
 * @param {Object} state
 *
 * @returns {Object} new state
 */
const mapStateToProps = state => ({
  allReviews: state.recipes.allReviews
});

/**
 *
 * @param {any} dispatch
 *
 * @returns {void}
 */
const mapDispatchToProps = dispatch => ({
  reviews: id => dispatch(getAllReviews(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewBar);
