import React from 'react';

import IndexVideo from './indexPage/IndexVideo';
import Header from './Header';

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
      initial: 1
    };
  }
  /**
   * @returns {JSX} JSX element
   */
  render() {
    const indexLocation = window.location.pathname === '/';
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
export default App;
