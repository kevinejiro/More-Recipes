import React from 'react';
import TextField from './TextField';
/**
 *
 * @param {object} props
 *
 * @returns {JSX} JSX Component
 */
function SearchBar(props) {
  return (
    <div>
      <form
        className="form-group search"
        onSubmit={props.onSubmit}>
        <TextField
          autoComplete="off"
          field="searchTerm"
          handleChange={props.handleSearch}
          label="Search for a recipe"
          textFieldClass="none"
          value={props.searchTerm}
        />
      </form>
    </div>
  );
}
export default SearchBar;
