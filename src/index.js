import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import $ from 'jquery';
import './style.scss';

ReactDOM.render (
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('.main')
)
