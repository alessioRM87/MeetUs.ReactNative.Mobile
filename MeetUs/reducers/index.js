import { combineReducers } from "redux";
import authenticationReducer from './AuthenticationReducer';

export default function getRootReducer(navReducer) {
    return combineReducers({
        nav: navReducer,
        authenticationReducer: authenticationReducer
    });
}