import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import TextField from '../common/TextField';
import { signInCheck } from '../../helpers/authHelpers';
import getSignIn from '../../actions/signIn';

/**
 * @class SignInForm
 */
class SignInForm extends React.Component {
  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit = (event) => {
    event.preventDefault();
    this.setState({
      error: {}
    });
    const { hasError, error } =
      signInCheck(this.state);

    if (hasError) {
      this.setState({
        error
      });
    } else {
      const userData = this.state;
      this.props.signInUser(userData);
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
        id="loginForm"
        method="post"
        onSubmit={this.onSubmit}>
        {
          this.state.error.errorMessage &&

          <div className="alert alert-danger" role="alert">
            {this.state.error.errorMessage}
          </div>
        }
        <TextField
          autoComplete="off"
          field="username"
          handleChange={this.onChange}
          icon="user"
          label="Enter Username..."
          maxLength="30"
          textFieldClass="form-group input-group"
          value={this.state.username}
        />
        <TextField
          autoComplete="off"
          field="password"
          handleChange={this.onChange}
          icon="key"
          label="Enter Password..."
          textFieldClass="form-group input-group"
          type="password"
          value={this.state.password}
        />
        <div className="form-group">
          <button
            className="btn btn-success app-btn"
            disabled={this.state.isLoading}
            type="submit"
          >
            Sign In
          </button>
        </div>

        <div className="form-group text-center">
          <p>Already have an account ?
            <Link
              href="/signup"
              to="/signup"
            >
              Sign Up
            </Link>
          </p>
        </div>

      </form>
    );
  }
}
SignInForm.contextTypes = {
  router: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  signInUser: (userDetails) => {
    dispatch(getSignIn(userDetails));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
