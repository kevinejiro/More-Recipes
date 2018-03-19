import React from 'react';
import AddRecipeForm from './AddRecipeForm';

/**
 * @param {Object} props
 *
 * @returns {JSX} JSX element
 */
function AddRecipeComponent(props) {
  return (
    <div className="mx-auto add-recipe">
      <div className="card">
        <h3 className="card-header"
        >
          Add new recipe
        </h3>
        <div className="card-block">
          <AddRecipeForm {...props} />
        </div>
      </div>
    </div>
  );
}
export default AddRecipeComponent;
