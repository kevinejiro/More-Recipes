import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TextField from '../common/TextField';
import { signInCheck } from '../../helpers/authHelpers';

const { serverUrl } = process.env;

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
      signInCheck(this.state);

    if (hasError) {
      this.setState({
        isLoading: false,
        error
      });
    } else {
      axios.post(`${serverUrl}/users/signin`, this.state)
        .then((response) => {
          console.log(response);
          this.setState({
            isLoading: false,
            error: {}
          });
        })
        .catch((errors) => {
          console.log(errors);
          this.setState({
            isLoading: false,
            error: errors
          });
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

export default SignInForm;

