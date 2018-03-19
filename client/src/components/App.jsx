import React from 'react';

import IndexVideo from './indexPage/IndexVideo';
import Header from './Header';
import Footer from './common/Footer';

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
          {windowLocation !== '/signup' &&
            windowLocation !== '/signin' &&
            <Footer />
          }
        </div>
      </div >
    );
  }
}
export default App;
