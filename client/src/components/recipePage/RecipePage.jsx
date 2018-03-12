import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReviewBar from './ReviewBar';
import ReviewForm from './ReviewForm';


// actions
import getSingleRecipe from '../../actions/getSingleRecipe';
/**
 * @class RecipePage
 */
class RecipePage extends React.Component {
  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  /**
 * @returns {void} void
 */
  componentWillMount() {
    console.log(this.props);
    this.props.recipe(this.props.match.params.recipeId);
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
   *@returns {void} void
  */
  componentWillUnmount() {
    document.body.classList.remove('in-profile');
  }
  /**
   * @returns {JSX} JSX element
   */
  render() {
    const {
      recipeTitle,
      recipeDescription,
      recipeAuthor,
      recipeIngredients,
      recipeDirections,
    } = this.state;
    return (
      <div>
        <div className="container marketing layout">
          <hr className="featurette-divider"
          />
          <div className="row featurette">
            <div className="col-md-5">
              <img
                alt="recipe"
                className="featurette-image img-fluid mx-auto"
                src="https://res.cloudinary.com/dhgq8vcwi/image/upload/v1519918536/Indomielette.jpg"
              />
            </div>
            <div className="col-md-7">
              <h2 className="featurette-heading"
              >
                {recipeTitle}
              </h2>
              <h3>
                Posted by
                <Link
                  href="/dashboard"
                  to="/dashboard"
                >
                  {recipeAuthor}
                </Link>
              </h3>
              <h4 className="page-header">Descriptions</h4>
              <p>
                {recipeDescription}
              </p>
              <h4 className="page-header">Ingredients</h4>
              <p>
                {recipeIngredients}
              </p>
              <h4 className="page-header">Directions</h4>
              <p>
                {recipeDirections}
              </p>
              <div
                className="icons">
                <i
                  aria-hidden="true"
                  className="fa fa-thumbs-up"
                />
                <i
                  aria-hidden="true"
                  className="fa fa-thumbs-down"
                />
                <span>
                  <i
                    aria-hidden="true"
                    className="fa fa-trash"
                  />
                  <i
                    aria-hidden="true"
                    className="fa fa-edit"
                  />
                </span>
              </div>
              <ReviewForm />
              <ReviewBar />
            </div>
          </div>
        </div>
      </div >
    );
  }
}

const mapStateToProps = state => ({
  getSingleRecipe: state.recipe
});

const mapDispatchToProps = dispatch => ({
  recipe: id => dispatch(getSingleRecipe(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipePage);

