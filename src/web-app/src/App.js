import React from 'react';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import root from './sagas';
import reducer from './reducers';

import Main from './app/main';

import './App.css';

const sagaMiddleware = createSagaMiddleware();
global.store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(root);

function App() {
  return (
    <Provider store={global.store}>
        <Main />
    </Provider>
  );
}

export default App;
