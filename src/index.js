import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/gameReducer';
import * as actions from './actions/actionTypes';

let store = createStore(reducer);

//store.dispatch(actions.)

render(
  <div>React working....</div>,
  document.getElementById('app')
);
