import React from 'react';
import { Link } from 'react-router-dom';
/**
 *
*/
const ReviewBar = () => (
  <div>
    <div
      className="my-3 p-3 bg-dark rounded box-shadow">
      <h6
       className="border-bottom border-gray pb-2 mb-0"
       >
       Recent Reviews
      </h6>
      <div
        className="media text-muted pt-3">
        <img
         alt=""
          className="mr-2 rounded"
          data-src="holder.js/32x32?theme=thumb&bg=007bff&fg=007bff&size=1" />
        <p
           className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
          <Link
            className="d-block text-gray-dark"
            href="/dashboard"
            to="/dashboard"
          >
            username
          </Link>
            Donec id elit non mi porta gravida at eget metus.
        </p>
      </div>
      <div
          className="media text-muted pt-3">
        <img
           alt="" className="mr-2 rounded" data-src="holder.js/32x32?theme=thumb&bg=e83e8c&fg=e83e8c&size=1" />
        <p
             className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
          <Link
            className="d-block text-gray-dark"
            href="/dashboard"
               to="/dashboard"
               >
               username
          </Link>
              Donec id elit non mi porta gravida at eget metus.
        </p>
      </div>
      <div
            className="media text-muted pt-3">
        <img
             alt=""
              className="mr-2 rounded"
              data-src="holder.js/32x32?theme=thumb&bg=6f42c1&fg=6f42c1&size=1"
              />
        <p
            className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"
               >
          <Link
            className="d-block text-gray-dark"
            href="/dashboard"
            to="/dashboard"
          >
            username
          </Link>
              Donec id elit non mi porta gravida .
        </p>
      </div>
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
