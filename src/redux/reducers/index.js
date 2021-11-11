import { combineReducers } from "redux";
import { authReducers } from "./auth_reducers";

export default combineReducers({
    auth: authReducers
})