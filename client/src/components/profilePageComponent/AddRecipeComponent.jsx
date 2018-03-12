import React from 'react';

function AddRecipeComponent(props) {
  return (
    <div className="mx-auto add-recipe">
      <div className="card">
        <h3 className="card-header"
        >
        Add new recipe
        </h3>
        <div className="card-block">
          <form>
            <div
            className="form-group">
              <label className="labeltext"
              >
              Title
              </label>
              <input
              className="form-control"
               id="recipeTitle"
               placeholder=""
               type="text" />
            </div>
            <div
              className="form-group">
              <label className="labeltext"
              >
                Description
              </label>
              <textarea
                className="form-control"
                id="recipeDescription"
                rows="3" />
            </div>
            <div
            className="form-group">
              <label className="labeltext"
              >
              Ingredients
              </label>
              <textarea
              className="form-control"
               id="recipeIngredient"
                rows="3" />
            </div>
            <div
             className="form-group">
              <label className="labeltext"
              >
              Directions
              </label>
              <textarea
              className="form-control"
               id="recipeDirections"
                rows="5" />
            </div>
            <div
            className="form-group">
              <label
              />
              <input
              aria-describedby="fileHelp"
               className="form-control-file"
                id="exampleInputFile"
                 type="file" />
            </div>
            <button
            className="btn btn-primary app-btn"
             type="submit"
             >
             Add Recipe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AddRecipeComponent;
