import { serverURL } from '../config/config';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

export function login(email, password){
    return (dispatch) => {

        dispatch({
            type: "AUTHENTICATION_LOADING"
        });

        let body = {
            username: email,
            password: password
        };

        return axios.post(serverURL + "/user/login", body)
        .then(response => {

            console.log("AUTHENTICATION SUCCESS", response.data);
            let userInfoString = JSON.stringify(response.data);
            return saveAsyncStorage(dispatch, "userInfo", userInfoString);
        })
        .catch(error => {
            console.log("LOGIN ERROR", error);
            dispatch({
                type: "AUTHENTICATION_ERROR",
            });

            return new Promise.reject('Wrong email/password: please try again');

        });

    }
}

export function register(email, firstName, lastName, password){
    return (dispatch) => {

        dispatch({
            type: "AUTHENTICATION_LOADING"
        });

        let body = {
            username: email,
            email: email,
            name: firstName + " " + lastName,
            password: password
        };

        return axios.post(serverURL + "/user/register", body)
        .then(fresponse =>  {

            console.log("REGISTRATION SUCCESS", response.data);
            let userInfoString = JSON.stringify(response.data);
            return saveAsyncStorage(dispatch, "userInfo", userInfoString);

        })
        .catch(error => {
            console.log("REGISTRATION ERROR", error);

            dispatch({
                type: "AUTHENTICATION_ERROR",
            });

            return new Promise.reject("Registration failed: please try again")
        });
    }
}



export async function saveAsyncStorage(dispatch, key, value, callback){

    console.log("SAVE ASYNC STORAGE", key, value);

    try {
        await AsyncStorage.setItem('@MeetUsStore:' + key, value);
        console.log("SAVE ASYNC STORAGE SUCCESS");
            
        let json = JSON.parse(value);
        
        dispatch({
            type: "AUTHENTICATION_SUCCESS",
            user: json
        });
        
        return new Promise.resolve(json);
        
    } 
    catch (error) {
        console.log("SAVE ASYNC STORAGE ERROR", error);
        dispatch({
            type: "AUTHENTICATION_ERROR",
        });

        return new Promise.reject('Unexpected error: please try again');
    }

   
}

export async function readFromAsyncStorage(dispatch, key){

    dispatch({
        type: "AUTHENTICATION_LOADING",
    });

    console.log("READ ASYNC STORAGE", key);

    try {
        const value = await AsyncStorage.getItem('@MeetUsStore:' + key);
        if (value !== null){

            console.log("READ ASYNC STORAGE SUCCESS", value);
            
            let json = JSON.parse(value);
            dispatch({
                type: "AUTHENTICATION_SUCCESS",
                user: json
            });

            return new Promise.resolve(json);
        }
        else{
            console.log("READ ASYNC STORAGE ERROR: value null");

            dispatch({
                type: "AUTHENTICATION_ERROR",
                error: 'Unexpected error: please try again'
            });

            return new Promise.reject("Login failed: please try again");

        }
    } 
    catch (error) {
        console.log("READ ASYNC STORAGE ERROR: ", error);

        dispatch({
            type: "AUTHENTICATION_ERROR",
            error: 'Unexpected error: please try again'
        });

        return new Promise.reject("Login failed: please try again");

    }
    
}

export function autoLogin(){
    return (dispatch) => {
        return readFromAsyncStorage(dispatch, 'userInfo');
    }
}



