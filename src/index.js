import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/gameReducer';
import * as actions from './actions/actionCreators';
import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import App from './components/App';

let store = createStore(reducer);

store.dispatch(actions.resetGame());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
