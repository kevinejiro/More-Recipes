import React from 'react';
import SignInForm from './SignInForm';

/**
 * SignIn
 * @returns
 */
const SignIn = () => (
  <main className="signup">
    <div className="container">
      <div className="messages-container" />
      <div className="row">
        <div className="col-md-6 offset-md-3 signup-border">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">
              Sign In
              </h3>
            </div>
            <div className="panel-body">
              <SignInForm />
            </div>
          </div>
        </div>
      </div>

    </div>
  </main>
);

export default SignIn;
