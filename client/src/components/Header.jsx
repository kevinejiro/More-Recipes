import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

import signOut from '../actions/signOut';
/**
 * @class Header
 */
class Header extends React.Component {
  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }
  /**
   *
   */
  componentDidMount() {
    window.addEventListener('scroll', this.scrollAction);
  }
  /**
   *
   */
  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollAction);
  }

  getScrollY = () => {
    let scrOfY = 0;
    if (typeof (window.pageYOffset) === 'number') {
      scrOfY = window.pageYOffset;
    } else if (document.body && document.body.scrollTop) {
      scrOfY = document.body.scrollTop;
    }
    return scrOfY;
  }
  /**
   *
   */
  scrollAction = () => {
    if (this.getScrollY() >= 5) {
      document.getElementsByTagName('nav')[0].classList.add('with-scroll');
    } else {
      document.getElementsByTagName('nav')[0].classList.remove('with-scroll');
    }
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  /**
   * @returns {JSX} JSX element
   */
  render() {
    return (
      <div>
        <Navbar
          color="faded"
          expand="md" fixed="top">
          <NavbarBrand
            href=""
            id="navbar"
            tag={Link}
            to=""
          >
            More Recipes
          </NavbarBrand>
          <NavbarToggler
            onClick={this.toggle}
          />
          <Collapse
            navbar
            isOpen={this.state.isOpen}
          >
            <Nav
              navbar
              className="ml-auto"
            >
              {
                !this.props.authenticated &&
                <NavItem >
                  <NavLink
                    tag={Link}
                    to="/signin">
                    <button
                      className="btn btn-danger"
                      type="button"
                    >
                      Sign In
                    </button>

                  </NavLink>
                </NavItem>
              }
              {
                !this.props.authenticated &&
                <NavItem>
                  <NavLink
                    tag={Link}
                    to="/signup">
                    <button
                      className="btn btn-danger"
                      type="button"
                    >
                      Sign Up
                    </button>

                  </NavLink>
                </NavItem>
              }
              {
                window.location.pathname === '/dashboard' &&
                <NavItem>
                  <NavLink
                    tag={Link}
                    to="/toprecipes">
                    <button
                      className="btn btn-danger"
                      type="button"
                    >
                      Recipes
                    </button>
                  </NavLink>
                </NavItem>
              }
              {
                (window.location.pathname !== '/dashboard' && this.props.authenticated) &&
                <NavItem >
                  <NavLink
                    tag={Link}
                    to="/dashboard">
                    <button
                      className="btn btn-danger"
                      type="button"
                    >
                      Dashboard
                    </button>
                  </NavLink>
                </NavItem>
              }
              {
                this.props.authenticated &&
                <NavItem>
                  <NavLink>
                    <button
                      className="btn btn-danger"
                      onClick={() => { this.props.signOutUser(); }}
                      type="button"
                    >
                      Sign Out
                    </button>
                  </NavLink>
                </NavItem>
              }

            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
Header.contextTypes = {
  router: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  authenticated: state.auth.isAuthenticated,
  user: state.auth.user
});
/**
 *
 *
 * @param {any} dispatch
 */
const mapDispatchToProps = dispatch => ({
  signOutUser: () => {
    dispatch(signOut());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

