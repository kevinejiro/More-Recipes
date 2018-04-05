import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import TextField from '../common/TextField';
import { signUpCheck } from '../../helpers/authHelpers';
import getSignUp from '../../actions/signUp';

/**
 * @class SignUpForm
 */
export class SignUpForm extends React.Component {
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
      error: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
   *
   *
   * @param {any} event
   * @memberof SignUpForm
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
 *
 *
 * @param {any} event
 * @memberof SignUpForm
 */
  onSubmit(event) {
    event.preventDefault();
    this.setState({
      error: {}
    });
    const { hasError, error } =
      signUpCheck(this.state);

    if (hasError) {
      this.setState({
        error
      });
    } else {
      const userData = this.state;
      this.props.signUpUser(userData);
    }
  }

  /**
   *
   * @param {object} nextProps
   *
   * @returns {void} void
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated &&
      nextProps.auth.errorMessage.length === 0) {
      this.setState({
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      }, () => {
        this.props.history.push('/dashboard');
      });
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
              &nbsp;
                  Sign In
            </Link>
          </p>
        </div>

      </form>
    );
  }
}

/**
 * @param {Object} state
 *
 * @returns {Object} new state
 */
const mapStateToProps = state => ({
  auth: state.auth
});

/**
 *
 * @param {any} dispatch
 *
 * @returns {void}
 */
const mapDispatchToProps = dispatch => ({
  signUpUser: (userDetails) => {
    dispatch(getSignUp(userDetails));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
