//? api
// import { api } from './../api';
//? redux
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
//? reducers
import reducers from './reducers';

const store = createStore(
  reducers,
  {}, // * initial state
  // * compose accepts the functions to compose and returns the final function obtained by composing the given functions from right to left.
  compose(
    // applyMiddleware(thunk.withExtraArgument(api)),
    applyMiddleware(thunk.withExtraArgument('extra argument')),

    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

// Mas reece, line 11-18 error kalo ga dikomen

export default store;
