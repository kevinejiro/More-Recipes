import React from 'react';
import RecipeCard from '../common/RecipeCard';

/**
 *
 * @param {object} props
 *
 * @returns {JSX} JSX Component
 */
function RecipeComponent(props) {
  return (
    <div className="body-wrapper">
      <div className="body-wrapper-header">
        <div className="card px-auto">
          Header
        </div>
      </div>
      <div className="body-wrapper-content">
        <RecipeCard
          description="Some description"
          id={1}
          imgUrl="https://res.cloudinary.com/dhgq8vcwi/image/upload/v1519918536/Indomielette.jpg"
          title="Some Title"
        />
      </div>
    </div >
  );
}
export default RecipeComponent;
