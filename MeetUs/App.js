import React, { Component } from "react";
import { Text } from "react-native";
import { Provider, connect } from "react-redux";
import { StackNavigator, addNavigationHelpers } from "react-navigation";
import { createReduxBoundAddListener, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

import Routes from "./config/Routes";

import configureStore from "./store/ConfigureStore";

const AppNavigator = StackNavigator(Routes, { headerMode : 'none' });

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Login'));

const navReducer = (state, action) => {
    const newState = AppNavigator.router.getStateForAction(action, state);
    return newState || state;
};

const middleware = createReactNavigationReduxMiddleware(
    "app",
    state => state.nav,
);

const addListener = createReduxBoundAddListener("app");

class AppWithNavigator extends Component {
    render() {
        return (
            <AppNavigator
                navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav,
                    addListener
                })}
            />
        );
    }
}

const mapStateToProps = (state) => ({
  nav: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(AppWithNavigator);

const store = configureStore(navReducer);

export default class App extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <Provider store={store}>
                <AppWithNavigationState />
            </Provider>
        );
    }
    
}