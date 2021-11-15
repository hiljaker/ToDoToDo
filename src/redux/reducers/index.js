//? redux
import { combineReducers } from 'redux';
//? reducers
import { activityReducer } from './activityReducer';
import { authReducers } from "./auth_reducers";

const reducers = combineReducers({
  activityReducer,
  auth: authReducers
});

export default reducers;
