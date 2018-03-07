import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Jumbotron from '../common/Jumbotron';
import SearchBar from '../common/Search';
import RecipeCard from '../common/RecipeCard';

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
  componentDidMount() {
  }
  /**
   *
   * @param {object} nextProps
   *
   * @returns {void} void
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
    });
  }
  /**
   * @returns {JSX} JSX element
   */
  render() {
    return (
      <div>
        <Jumbotron
          heading="Top Recipes"
          jumbotronText="Here is a list of the weeks
          top recipes. Happy Experimenting!!!"
        />
        <div className="album text-muted" >
          <div className="container">
            <SearchBar />
            <div className="row browse-page">
              <RecipeCard
                description="Some description"
                id={1}
                imgUrl="https://res.cloudinary.com/dhgq8vcwi/image/upload/v1519918536/Indomielette.jpg"
                title="Some Title"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default TopRecipes;
