import React from 'react';
import SignInForm from './SignInForm';

/**
 * signin page component
 * @param {Object} props
 * @returns {JSX} react element
 */
const SignIn = props => (
  <main className="signup">
    <div className="container">
      <div className="messages-container" />
      <div className="row signInForm">
        <div className="col-md-6 offset-md-3 signup-border">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">
                Sign In
              </h3>
            </div>
            <div className="panel-body">
              <SignInForm {...props} />
            </div>
          </div>
        </div>
      </div>

    </div>
  </main>
);

export default SignIn;
