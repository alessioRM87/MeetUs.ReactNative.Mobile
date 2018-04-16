import { combineReducers } from "redux";
import authenticationReducer from './authenticationReducer';
import eventsReducer from './eventsReducer';

export default function getRootReducer(navReducer) {
    return combineReducers({
        nav: navReducer,
        authenticationReducer: authenticationReducer,
        eventsReducer: eventsReducer
    });
}