import React from 'react';
import SignUpForm from './SignUpForm';

/**
 * SignUp
 * @returns
 */
const SignUp = () => (
  <main className="signup">
    <div className="container">
      <div className="messages-container" />
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">
                  Sign up for free
              </h3>
            </div>
            <div className="panel-body">
              <SignUpForm />
            </div>
          </div>
        </div>
      </div>

    </div>
  </main>
);

export default SignUp;
