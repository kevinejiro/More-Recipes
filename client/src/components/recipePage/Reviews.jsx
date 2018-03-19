import React from 'react';
import { Link } from 'react-router-dom';

/**
 *
 * @param {object} props
 *
 * @returns {JSX} JSX Component
 */
function Reviews(props) {
  return (
    <div>
      <div
        className="media text-muted pt-3">
        <img
          alt=""
          className="mr-2 rounded"
          data-src="holder.js/32x32?theme=thumb&bg=007bff&fg=007bff&size=1" />
        <p
          className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"
        >
          <Link
            className="d-block text-gray-dark"
            href={`/user/${props.User.id}`}
            to={`/user/${props.User.id}`}
          >
            {props.User.username}
          </Link>
          {props.body}
        </p>
      </div>

    </div >
  );
}
// Reviews.propTypes = {
//   recipe: PropTypes.object.isRequired,
// };
export default Reviews;
