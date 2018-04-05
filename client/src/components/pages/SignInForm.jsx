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
export class SignInForm extends React.Component {
  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoading: false,
      error: {}
    };
  }
  /**
   * @returns {void} void
   */
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.context.router.history.push('/dashboard');
    }
  }
  /**
   *
   * @param {object} nextProps
   *
   * @returns {void} void
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      isLoading: nextProps.isLoading
    });
    if (nextProps.auth.isAuthenticated &&
      !nextProps.auth.errorMessage) {
      return this.setState({
        username: '',
        password: '',
      }, () => {
        this.context.router.history.push('/dashboard');
      });
    }
    if (nextProps.auth.errorMessage) {
      this.setState({
        error: {
          errorMessage: nextProps.auth.errorMessage
        }
      });
    }
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
              &nbsp;
                  Sign Up
            </Link>
          </p>
        </div>

      </form>
    );
  }
}
SignInForm.defaultProps = {
  auth: {
    isAuthenticated: false
  }
};
SignInForm.contextTypes = {
  router: PropTypes.object.isRequired,
};
/**
 *
 * @param {object} state
 * @returns {void}
 */
const mapStateToProps = state => ({
  auth: state.auth,
  isLoading: state.isLoading
});

/**
 *
 * @param {object} dispatch
 *
 * @returns {void}
 */
const mapDispatchToProps = dispatch => ({
  signInUser: (userDetails) => {
    dispatch(getSignIn(userDetails));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
