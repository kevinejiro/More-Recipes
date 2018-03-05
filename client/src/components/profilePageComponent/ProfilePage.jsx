import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import RecipeCard from '../common/RecipeCard';
/**
 * @class ProfilePage
 */
class ProfilePage extends React.Component {
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
   *
  */
  componentWillUnmount() {
  }
  /**
   * @returns {JSX} JSX element
   */
  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row profile-page">
            <div className="col-sm-12 col-md-3">
              <div className="profile-page--sidebar">
                <div className="card">
                  <div className="sidebar--userimg mx-auto d-block ">
                    <img className="mx-auto d-block img-responsive" src="http://res.cloudinary.com/dhgq8vcwi/image/upload/v1520331711/default.jpg" />
                  </div>
                  <div className="sidebar--title">
                    <div className="sidebar--title-name">
                      Ejiro Kevin
                    </div>
                  </div>
                </div>
                <div className="mx-auto text-center">
                  <button
                    className="btn "
                    data-target="#exampleModal"
                  data-toggle="modal"
                  type="button"
                   >
                    Add Recipe
                  </button>
                  <div
                    aria-hidden="true"
                    aria-labelledby="exampleModalLabel"
                    className="modal fade" id="exampleModal"
                    role="dialog" tabIndex="-1">
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">New message</h5>
                          <button aria-label="Close" 
                          className="close"
                            data-dismiss="modal"
                            type="button">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <form>
                            <div className="form-group">
                              <label
                               className="col-form-label"
                               >
                                Recipient:
                              </label>
                              <input className="form-control" id="recipient-name" type="text" />
                            </div>
                            <div className="form-group">
                              <label
                                className="col-form-label"
                               >
                               Message:
                              </label>
                              <textarea
                                className="form-control"
                                id="message-text" />
                            </div>
                          </form>
                        </div>
                        <div className="modal-footer">
                          <button
                            className="btn btn-secondary"
                            data-dismiss="modal" type="button"
                          >
                          Close
                          </button>
                          <button
                            className="btn btn-primary"
                            type="button"
                            >
                            Send message
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="link-menu" />
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-9">
              <h1>Recipes for this user</h1>
              <div className="card-deck profile-content">
                <RecipeCard
                  description="Some description"
                  id={1}
                  imgUrl="https://res.cloudinary.com/dhgq8vcwi/image/upload/v1519918536/Indomielette.jpg"
                  title="Some Title"
                />
                <RecipeCard
                  description="Some description"
                  id={1}
                  imgUrl="https://res.cloudinary.com/dhgq8vcwi/image/upload/v1519918536/Indomielette.jpg"
                  title="Some Title"
                />
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
      </div >
    );
  }
}


export default ProfilePage;
