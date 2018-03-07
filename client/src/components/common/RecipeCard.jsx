import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

/**
 * @param {object} props
 *
 * @return {JSX} JSX Element
*/
const RecipeCard = props => (
  <div
    className="card recipe-card"
  >
    <img
      alt={props.title}
      src={props.imgUrl}
    />
    <h5>
      <Link
        href={`/recipes/${props.id}`}
        to={`/recipes/${props.id}`}
      >
        {props.title}
      </Link>
    </h5>
    <p
      className="card-text"
    >
      {props.description}
    </p>
  </div>
);
RecipeCard.defaultProps = {
  imgUrl: undefined
};
RecipeCard.propTypes = {
  description: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  imgUrl: PropTypes.string,
  title: PropTypes.string.isRequired,

};

export default RecipeCard;
