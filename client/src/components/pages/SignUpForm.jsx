import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import TextField from '../common/TextField';
import { signUpCheck } from '../../helpers/authHelpers';
import { signUpAction } from '../action/auth';

/**
 * @class SignUpForm
 */
class SignUpForm extends React.Component {
  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      isLoading: false,
      error: {}
    };
  }
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit = (event) => {
    event.preventDefault();
    this.setState({
      isLoading: true,
      error: {}
    });
    const { hasError, error } =
      signUpCheck(this.state);

    if (hasError) {
      this.setState({
        isLoading: false,
        error
      });
    } else {
      this.props.signUpAction(this.state);
    }
  }

  /**
   * @returns {JSX} JSX element
   */
  render() {
    return (
      <form
        action=""
        autoComplete="on"
        id="signupForm"
        method="post"
        onSubmit={this.onSubmit}>
        <TextField
          autoComplete="off"
          errorMessage={this.state.error.username}
          field="username"
          handleChange={this.onChange}
          icon="user"
          label="Enter Username...."
          maxLength="30"
          textFieldClass="form-group input-group"
          value={this.state.username}
        />
        <TextField
          autoComplete="email"
          errorMessage={this.state.error.email}
          field="email"
          handleChange={this.onChange}
          icon="envelope"
          label="Enter Email Address..."
          maxLength="None"
          textFieldClass="form-group input-group"
          type="email"
          value={this.state.email}
        />
        <TextField
          autoComplete="off"
          errorMessage={this.state.error.password}
          field="password"
          handleChange={this.onChange}
          icon="key"
          label="Enter Password..."
          textFieldClass="form-group input-group"
          type="password"
          value={this.state.password}
        />
        <TextField
          autoComplete="off"
          errorMessage={this.state.error.passwordConfirmation}
          field="passwordConfirmation"
          handleChange={this.onChange}
          icon="unlock-alt"
          label="Confirm Password..."
          textFieldClass="form-group input-group"
          type="password"
          value={this.state.passwordConfirmation}
        />

        <div className="form-group">
          <button
            className="btn btn-success app-btn"
            disabled={this.state.isLoading}
            type="submit"
          >
            Create an Account
          </button>
        </div>

        <div className="form-group text-center">
          <p>Already have an account ?
            <Link
              href="/signin"
              to="/signin"
            >
              Sign In
            </Link>
          </p>
        </div>

      </form>
    );
  }
}

export default connect(
  null,
  {
    signUpAction
  }
)(SignUpForm);
