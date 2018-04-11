import { serverURL } from '../config/Config';
import { AsyncStorage } from 'react-native';

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

export function setAuthenticationLoading(){
    return {
        type : "AUTHENTICATION_LOADING",
    };
}

export function setAuthenticationSuccess(){
    return {
        type : "AUTHENTICATION_SUCCESS",
    };
}

export function setAuthenticationError(error){
    return {
        type : "AUTHENTICATION_ERROR",
        error: error
    };
}

export function setAuthenticationLogout(){
    return {
        type : "AUTHENTICATION_LOGOUT",
    };
}

export function login(email, password, callback){
    return (dispatch) => {

        dispatch(setAuthenticationLoading());



        let json = {
            email: email,
            password: password
        };

        let body = JSON.stringify(json);

        let headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };

        let data = {
            method: 'POST',
            headers: headers,
            body: body
        };

        fetch(serverURL + "/user/login", data)
        .then(response => response.json())
        .then(responseJson => {
            
            if (responseJson.err){
                console.log("AUTHENTICATION ERROR", responseJson.err);
                dispatch(setLoginError('Wrong email/password: please try again'));
            }
            else{

                console.log("AUTHENTICATION SUCCESS", responseJson.data);
                let userInfoString = JSON.stringify(responseJson.data);
                saveAsyncStorage(dispatch, "userInfo", userInfoString, callback);

            }

        })
        .catch(error => {
            console.log("LOGIN ERROR", error);
            dispatch(setLoginError("Login failed: please try again"));
        });

    }
}

export function register(email, firstName, lastName, password, callback){
    return (dispatch) => {
        dispatch(setAuthenticationLoading());

        let json = {
            email: email,
            name: firstName + " " + lastName,
            password: password
        };

        let body = JSON.stringify(json);

        let headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };

        let data = {
            method: 'POST',
            headers: headers,
            body: body
        };

        fetch(serverURL + "/user/register", data)
        .then(response => response.json())
        .then(responseJson => {
            
            if (responseJson.err){
                console.log("REGISTRATION ERROR", responseJson.err);
                dispatch(setRegistrationError('An account with this email already exists'));
            }
            else{
                console.log("REGISTRATION SUCCESS", responseJson.data);
                let userInfoString = JSON.stringify(responseJson.data);
                saveAsyncStorage(dispatch, "userInfo", userInfoString, callback);
            }

        })
        .catch(error => {
            console.log("REGISTRATION ERROR", error);
            dispatch(setLoginError("Registration failed: please try again"));
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
        dispatch(setAuthenticationSuccess());
        callback();
        
    } 
    catch (error) {
        console.log("SAVE ASYNC STORAGE ERROR", error);
        dispatch(setAuthenticationError('Unexpected error: please try again'));
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
            dispatch(setAuthenticationSuccess());
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



