import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description jumbotron
 * @param {object} props
 * @returns {JSX} JSX div
 */
function Jumbotron(props) {
  return (
    <section className="jumbotron text-center">
      <div className="container">
        <h1 className="jumbotron-heading">
          {props.heading}
          {/* Top Recipes */}
        </h1>
        <p className="lead text-muted">
          {props.jumbotronText}
          {/* Here is a list of the weeks top recipes. Happy Experimenting!!! */}
        </p>
      </div>
    </section>
  );
}
Jumbotron.propTypes = {
  heading: PropTypes.string.isRequired,
  jumbotronText: PropTypes.string.isRequired
};
export default Jumbotron;
