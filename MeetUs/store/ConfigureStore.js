import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import getRootReducer from "../reducers";

export default function configureStore(navReducer) {
    const store = createStore(
        getRootReducer(navReducer),
        undefined,
        applyMiddleware(thunk)
    );

    return store;
}