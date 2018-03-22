import React from 'react';
import { Route, Redirect } from 'react-router-dom';
/**
 *
 * @param {JSX} param Component
 * @param {object} ...rest
 */
function PrivateRoute({
  component: Component,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props => (
        localStorage.token
          ? <Component {...props} />
          : <Redirect
            to={{
              pathname: '/'
            }}
          />
      )}
    />
  );
}

export default PrivateRoute;
