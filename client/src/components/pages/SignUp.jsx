import React from 'react';
import SignUpForm from './SignUpForm';

/**
 * signup page component
 * @param {Object} props
 * @returns {JSX} react element
 */
const SignUp = props => (
  <main className="signup">
    <div className="container">
      <div className="messages-container" />
      <div className="row signInForm">
        <div className="col-md-6 offset-md-3 signup-border">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">
                Sign up for free
              </h3>
            </div>
            <div className="panel-body">
              <SignUpForm {...props} />
            </div>
          </div>
        </div>
      </div>

    </div>
  </main>
);

export default SignUp;
