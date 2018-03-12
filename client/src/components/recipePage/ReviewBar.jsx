import React from 'react';
import { Link } from 'react-router-dom';

import Reviews from './Reviews';

/**
 *
*/
const ReviewBar = (props) => (
  <div>
    <div
      className="my-3 p-3 bg-dark rounded box-shadow">
      <h6
       className="border-bottom border-gray pb-2 mb-0"
       >
       Recent Reviews
      </h6>
      {/* <Reviews
        reviewText={}
        username={}
      /> */}
      <small
        className="d-block text-right mt-3">
        <Link
          href="/dashboard"
          to="/dashboard"
        >
          All Reviews
        </Link>
      </small>
    </div>
  </div>
);

export default ReviewBar;
