import React from 'react';
import EditRecipeForm from './EditRecipeForm';

/**
 * @param {Object} props
 *
 * @returns {JSX} JSX element
 */
function EditRecipeComponent(props) {
  return (
    <div className="mx-auto add-recipe editrecipe">
      <div className="card">
        <h3 className="card-header"
        >
          Edit recipe
        </h3>
        <div className="card-block">
          <EditRecipeForm {...props} />
        </div>
      </div>
    </div>
  );
}
export default EditRecipeComponent;
