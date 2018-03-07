import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReviewBar from './ReviewBar';
import ReviewForm from './ReviewForm';
/**
 * @class Toprecipes
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
   *
  */
  componentWillUnmount() {
    document.body.classList.remove('in-profile');
  }
  /**
   * @returns {JSX} JSX element
   */
  render() {
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
              <h2 className="featurette-heading">Recipe Title.</h2>
              <h3>Posted by
                <Link
                  href="/dashboard"
                  to="/dashboard"
                >
                  User Name
                </Link>
              </h3>
              <h4 className="page-header">Ingredients</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              </p>
              <h4 className="page-header">Directions</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
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


export default RecipePage;
