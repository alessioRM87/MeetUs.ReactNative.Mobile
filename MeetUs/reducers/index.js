import { combineReducers } from "redux";
import loginReducer from './LoginReducer';
import registrationReducer from './RegistrationReducer';

export default function getRootReducer(navReducer) {
    return combineReducers({
        nav: navReducer,
        loginReducer: loginReducer,
        registrationReducer : registrationReducer,
    });
}