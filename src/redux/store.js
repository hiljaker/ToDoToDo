//? axios
import axios from 'axios';
//? redux
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
//? reducers
import reducers from './reducers';

// * api
const api = axios.create({
  baseURL: 'http://localhost:3001',
});

const store = createStore(
  reducers,
  {}, // * initial state
  // * compose accepts the functions to compose and returns the final function obtained by composing the given functions from right to left.
  compose(
    applyMiddleware(thunk.withExtraArgument(api)),

    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
