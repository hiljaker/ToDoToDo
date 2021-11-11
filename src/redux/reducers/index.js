//? redux
import { combineReducers } from 'redux';
//? reducers
import { activityReducer } from './activityReducer';

const reducers = combineReducers({
  activityReducer,
});

export default reducers;
