import React from 'react';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import toastr from 'toastr';

import IndexVideo from './indexPage/IndexVideo';
import Header from './Header';
import { signoutAction } from '../actions/signOut';

/**
 * @class App
 */
class App extends React.Component {
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
    this.checkUserStatus();
  }
  /**
 * @returns {void} void
 */
  componentWillUpdate() {
    this.checkUserStatus();
  }
  checkUserStatus = () => {
    const { token } = localStorage;
    if (token) {
      const decodedToken = jwtDecode(token);
      const newTime = Date.now().valueOf() / 1000;
      if (decodedToken.exp < newTime) {
        toastr.options = {
          closeButton: true,
          extendedTimeOut: '1000',
          positionClass: 'toast-bottom-right',
          hideMethod: 'fadeOut'
        };
        this.props.signOutUser();
        toastr.error('Login Expired');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }

  /**
   * @returns {JSX} JSX element
   */
  render() {
    const windowLocation = window.location.pathname;
    const indexLocation = windowLocation === '/';
    return (
      <div
        className={
          indexLocation ?
            'video-bg' : undefined}
      >
        {indexLocation &&
          <IndexVideo />
        }
        <div id="overlay">
          <Header />
          {this.props.children}
        </div>
      </div >
    );
  }
}

/**
 *
 * @param {object} dispatch
 *
 * @returns {void}
 */
const mapDispatchToProps = dispatch => ({
  signOutUser: () => {
    dispatch(signoutAction());
  }
});
export default connect(null, mapDispatchToProps)(App);
