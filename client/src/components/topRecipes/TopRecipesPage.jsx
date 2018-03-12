import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Jumbotron from '../common/Jumbotron';
import SearchBar from '../common/Search';
import RecipeCard from '../common/RecipeCard';

// actions
import getAllRecipes from '../../actions/getAllRecipes';

/**
 * @class Toprecipes
 */
class TopRecipes extends React.Component {
  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  /**
   * @returns {void} void
   */
  componentWillMount() {
    this.props.recipes();
  }
  /**
   * @returns {JSX} JSX element
   */
  render() {
    const recipes = this.props.allRecipes ? this.props.allRecipes : [];
    let recipeList;

    if (recipes.length === 0) {
      recipeList = (
        <div className="text-center">
          <h4> No recipes found </h4>
        </div>
      );
    } else {
      recipeList = recipes.map((recipe, i) => (
        <div className="body-wrapper-content" key={`recipe${i + 1}`}>
          <RecipeCard
         {...recipe}
          />
        </div>
      ));
    }
    return (
      <div>
        <Jumbotron
          heading="Recipes"
          jumbotronText="Here is a list of the weeks
          top recipes. Happy Experimenting!!!"
        />
        <div className="body-wrapper" >
          <div className="container">
            <SearchBar />
            <div className="body-wrapper-content">
              {recipeList}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allRecipes: state.recipes.allrecipes
});

const mapDispatchToProps = dispatch => ({
  recipes: () => dispatch(getAllRecipes())
});

export default connect(mapStateToProps, mapDispatchToProps)(TopRecipes);
