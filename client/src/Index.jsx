// import 'raf/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
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

import { setAxiosHeader } from './actions/signIn';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk), // this allows us to dispatch asynchronous actions
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
);

if (localStorage.token) {
  setAxiosHeader(localStorage.token);
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Main />
    </Router>
  </Provider>,
  document.getElementById('app'),
);
