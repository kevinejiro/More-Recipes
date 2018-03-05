import 'raf/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
// import jwtDecode from 'jwt-decode';
import {
  BrowserRouter as Router,
  browserHistory,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from './reducers/rootReducer';
import Main from './routes';

import './assets/css/style.scss';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk), // this allows us to dispatch asynchronous actions
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
);

// if (localStorage.jwtToken) {
//   const currentTime = Date.now().valueOf() / 1000;
//   const jwtDecoded = jwtDecode(localStorage.jwtToken);
//   if (jwtDecoded.exp < currentTime) {
//     store.dispatch(setCurrentUser({}));
//     localStorage.removeItem('jwtToken');
//   } else {
//     // setAuthorizationToken(localStorage.jwtToken);
//     store.dispatch(setCurrentUser(jwtDecoded));
//   }
// } else {
//   // store.dispatch(setCurrentUser({}));
// }

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Main />
    </Router>
  </Provider>,
  document.getElementById('app'),
);
