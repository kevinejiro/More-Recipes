import React, { Component } from 'react';

/**
 * @class SignInForm
 */
class SearchBar extends React.Component {
/**
 *
 * @param {object} props
 */
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    };
    this.onInputChange = this.onInputChange.bind(this);
  }
  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState({ term: event.target.value });
  }
  onSubmit = (event) => {
    event.preventDefault();
    this.setState({
      isLoading: true,
      error: {}
    });
  }

  render() {
    return (
      <div>
        <form
          className="form-group"
          onSubmit={this.onSubmit}>
          <input
          className="form-control"
          id="formGroupExampleInput2"
          onChange={this.onInputChange}
          placeholder="Search for a recipe"
          type="text"
          value={this.state.term}
        />
        </form>
      </div>
    );
  }
}
export default SearchBar;
