import { serverURL } from '../config/config';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

export function setUserID(userID){
    return {
        type : "AUTHENTICATION_SET_USERID",
        userID : userID
    };
}

export function setUserIDError(userIDError){
    return {
        type : "AUTHENTICATION_SET_USERID_ERROR",
        userIDError : userIDError
    };
}

export function setEmail(email){
    return {
        type : "AUTHENTICATION_SET_EMAIL",
        email : email
    };
}

export function setEmailError(emailError){
    return {
        type : "AUTHENTICATION_SET_EMAIL_ERROR",
        emailError : emailError
    };
}

export function setFirstName(firstName){
    return {
        type: "AUTHENTICATION_SET_FIRST_NAME",
        firstName: firstName
    };
}

export function setFirstNameError(firstNameError){
    return {
        type: "AUTHENTICATION_SET_FIRST_NAME_ERROR",
        firstNameError: firstNameError
    };
}

export function setLastName(lastName){
    return {
        type: "AUTHENTICATION_SET_LAST_NAME",
        lastName: lastName
    };
}

export function setLastNameError(lastNameError){
    return {
        type: "AUTHENTICATION_SET_LAST_NAME_ERROR",
        lastNameError: lastNameError
    };
}

export function setPassword(password){
    return {
        type: "AUTHENTICATION_SET_PASSWORD",
        password: password
    };
}

export function setPasswordError(passwordError){
    return {
        type: "AUTHENTICATION_SET_PASSWORD_ERROR",
        passwordError: passwordError
    };
}

export function setConfirmPassword(confirmPassword){
    return {
        type: "AUTHENTICATION_SET_CONFIRM_PASSWORD",
        confirmPassword: confirmPassword
    };
}

export function setConfirmPasswordError(confirmPasswordError){
    return {
        type: "AUTHENTICATION_SET_CONFIRM_PASSWORD_ERROR",
        confirmPasswordError: confirmPasswordError
    };
}

export function login(email, password, callback){
    return (dispatch) => {

        dispatch({
            type: "AUTHENTICATION_LOADING"
        });

        let body = {
            email: email,
            password: password
        };

        axios.post(serverURL + "/user/login", body)
          .then(function (response) {

            if (response.data.err){
                console.log("AUTHENTICATION ERROR", response.data.err);
                dispatch({
                    type: "AUTHENTICATION_ERROR",
                    error: 'Wrong email/password: please try again'
                });
            }
            else{

                console.log("AUTHENTICATION SUCCESS", response.data.data);
                let userInfoString = JSON.stringify(response.data.data);
                saveAsyncStorage(dispatch, "userInfo", userInfoString, callback);

            }

          })
          .catch(function (error) {
            console.log("LOGIN ERROR", error);
            dispatch({
                type: "AUTHENTICATION_ERROR",
                error: "Login failed: please try again"
            });
          });

    }
}

export function register(email, firstName, lastName, password, callback){
    return (dispatch) => {

        dispatch({
            type: "AUTHENTICATION_LOADING"
        });

        let body = {
            email: email,
            name: firstName + " " + lastName,
            password: password
        };

        axios.post(serverURL + "/user/register", body)
        .then(function (response) {

            if (response.data.err){
                console.log("REGISTRATION ERROR", response.data.err);

                dispatch({
                    type: "AUTHENTICATION_ERROR",
                    error: 'An account with this email already exists'
                });
            }
            else{

                console.log("REGISTRATION SUCCESS", response.data.data);
                let userInfoString = JSON.stringify(response.data.data);
                saveAsyncStorage(dispatch, "userInfo", userInfoString, callback);

            }

        })
        .catch(function (error) {
            console.log("REGISTRATION ERROR", error);

            dispatch({
                type: "AUTHENTICATION_ERROR",
                error: "Registration failed: please try again"
            });
        });
    }
}



export async function saveAsyncStorage(dispatch, key, value, callback){

    console.log("SAVE ASYNC STORAGE", key, value);

    try {
        await AsyncStorage.setItem('@MeetUsStore:' + key, value);
        console.log("SAVE ASYNC STORAGE SUCCESS");
            
        let json = JSON.parse(value);
        dispatch(setUserID(json._id));
        dispatch(setEmail(json.email));
        dispatch(setFirstName(json.firstName));
        dispatch(setLastName(json.lastName));
        dispatch({
            type: "AUTHENTICATION_SUCCESS"
        });
        callback();
        
    } 
    catch (error) {
        console.log("SAVE ASYNC STORAGE ERROR", error);
        dispatch({
            type: "AUTHENTICATION_ERROR",
            error: 'Unexpected error: please try again'
        });
    }

   
}

export async function readFromAsyncStorage(dispatch, key, callback){

    console.log("READ ASYNC STORAGE", key);

    try {
        const value = await AsyncStorage.getItem('@MeetUsStore:' + key);
        if (value !== null){

            console.log("READ ASYNC STORAGE SUCCESS", value);
            
            let json = JSON.parse(value);
            dispatch(setUserID(json._id));
            dispatch(setEmail(json.email));
            dispatch(setFirstName(json.email));
            dispatch(setLastName(json.email));
            dispatch({
                type: "AUTHENTICATION_SUCCESS"
            });
            callback();
        }
        else{
            console.log("READ ASYNC STORAGE ERROR: value null");
        }
    } 
    catch (error) {
        console.log("READ ASYNC STORAGE ERROR: ", error);
    }
    
}

export function autoLogin(callback){
    return (dispatch) => {
        readFromAsyncStorage(dispatch, 'userInfo', callback);
    }
}



