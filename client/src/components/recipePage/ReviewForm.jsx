import React from 'react';
import { Link } from 'react-router-dom';
import TextField from '../common/TextField';

const { serverUrl } = process.env;

/**
 * @class ReviewForm
 */
class ReviewForm extends React.Component {
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
      className="comment">
        <div className="form-group">
          <textarea
            className="form-control"
            id="recipeComment"
            placeholder="Review  Recipe"
            rows="3" />
        </div>
        <div className="form-group">
          <button className="btn btn-success"
          >
            Post Review
          </button>
        </div>

      </form>
    );
  }
}

export default ReviewForm;

