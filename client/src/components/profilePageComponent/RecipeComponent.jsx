import React from 'react';
import RecipeCard from '../common/RecipeCard';

/**
 *
 * @param {object} props
 *
 * @returns {JSX} JSX Component
 */
function RecipeComponent(props) {
  let recipeList;
  if (props.recipes.length === 0) {
    recipeList = (
      <div className="text-center">
        <h4> No recipes found </h4>
      </div>
    );
  } else {
    recipeList = props.recipes.map((recipe, i) => (
      <div className="" key={`recipe${i + 1}`}>
        <RecipeCard
          {...recipe}
        />
      </div>
    ));
  }
  return (
    <div className="body-wrapper">
      <div className="body-wrapper-header">
        <div className="card px-auto">
          {props.currentActionType}
        </div>
      </div>
      <div className="body-wrapper-content">
        {recipeList}
      </div>
    </div >
  );
}
export default RecipeComponent;
