import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';

import Jumbotron from '../common/Jumbotron';
import SearchBar from '../common/Search';
import RecipeCard from '../common/RecipeCard';

// actions
import getAllRecipes, { searchRecipes } from '../../actions/getAllRecipes';

/**
 * @class Toprecipes
 */
export class TopRecipes extends React.Component {
  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      recipes: props.allRecipes.recipes,
      currentPage: props.allRecipes.pagination.currentPage,
      limit: 8,
      last: props.allRecipes.pagination.lastPage
    };
  }
  /**
   * @returns {void} void
   */
  componentDidMount() {
    const { currentPage: page, limit } = this.state;

    this.props.getAllRecipes({ page, limit });
    document.body.classList.add('in-recipepage');
  }

  /**
   * @param {Object} newProps
   *
   * @returns {void} newProps
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.allRecipes) {
      const {
        allRecipes: {
          recipes,
          pagination
        },
      } = nextProps;
      this.setState({
        recipes,
        last: pagination.lastPage
      });
    }
  }
  /**
 *
 *
 * @param {any} prevProps
 * @param {any} prevState
 * @memberof TopRecipes
 */
  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentPage !== this.state.currentPage) {
      this.props.getAllRecipes({
        page: this.state.currentPage,
        limit: this.state.limit
      });
    }
  }

  /**
   * @returns {void} void
   */
  componentWillUnmount() {
    document.body.classList.remove('in-recipepage');
  }
  handleSearch = (event) => {
    this.setState({
      searchTerm: event.target.value
    });
    this.props.searchRecipes(event.target.value);
  }

  handlePageClick = ({ selected }) => {
    this.setState({
      currentPage: selected + 1,
    });
  }

  /**
   * @returns {JSX} JSX element
   */
  render() {
    const { recipes, searchTerm } = this.state;

    let recipeList;

    if (recipes && recipes.length === 0) {
      recipeList = (
        <div className="text-center">
          <h4> No recipes found </h4>
        </div>
      );
    } else {
      recipeList = recipes && recipes.map((recipe, i) => (
        <div className="" key={`recipe${i + 1}`}>
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
            <SearchBar
              handleSearch={this.handleSearch}
              onSubmit={this.searchSubmit}
              searchTerm={this.state.searchTerm}
            />
            <div className="body-wrapper-content">
              {recipeList}
              {!searchTerm &&
              <ReactPaginate
                  activeClassName="active"
                  containerClassName="pagination"
                  marginPagesDisplayed={2}
                  nextLabel={'  >>>'}
                  onPageChange={this.handlePageClick}
                  pageClassName="waves-effect"
                  pageCount={this.state.last}
                  pageRangeDisplayed={4}
                  previousLabel={'<<<  '}
                />
              }
            </div>


          </div>
        </div>
      </div>
    );
  }
}

/**
 * @param {Object} state
 *
 * @returns {Object} new state
 */
const mapStateToProps = state => ({
  allRecipes: state.recipes.allrecipes
});

/**
 *
 * @param {any} dispatch
 *
 * @returns {void}
 */
export const mapDispatchToProps = dispatch => ({
  getAllRecipes: ({ page, limit }) => dispatch(getAllRecipes({ page, limit })),
  searchRecipes: searchTerm => dispatch(searchRecipes(searchTerm))
});

export default connect(mapStateToProps, mapDispatchToProps)(TopRecipes);
