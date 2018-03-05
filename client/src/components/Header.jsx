import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
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
      isOpen: false
    };
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
            
              <NavItem>
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

            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
export default Header;
