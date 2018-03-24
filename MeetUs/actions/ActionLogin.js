import { serverURL } from '../config/Config';

export function setEmail(email){
    return {
        type : "LOGIN_SET_EMAIL",
        email : email
    };
}

export function setEmailError(emailError){
    return {
        type : "LOGIN_SET_EMAIL_ERROR",
        emailError : emailError
    };
}

export function setPassword(password){
    return {
        type : "LOGIN_SET_PASSWORD",
        password : password
    };
}

export function setPasswordError(passwordError){
    return {
        type : "LOGIN_SET_PASSWORD_ERROR",
        passwordError : passwordError
    };
}

export function setLoginLoading(){
    return {
        type : "LOGIN_LOADING",
    };
}

export function setLoginSuccess(user){
    return {
        type : "LOGIN_SUCCESS",
        user: user
    };
}

export function setLoginError(error){
    return {
        type : "LOGIN_ERROR",
        error: error
    };
}

export function login(email, password, callback){
    return (dispatch) => {

        dispatch(setLoginLoading());

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
                console.log("LOGIN ERROR", responseJson.err);
                dispatch(setLoginError('Wrong email/password: please try again'));
            }
            else{
                console.log("LOGIN SUCCESS", responseJson.data);
                dispatch(setLoginSuccess(responseJson.data));
                callback();
            }

        })
        .catch(error => {
            console.log("LOGIN ERROR", error);
            dispatch(setLoginError("Login failed: please try again"));
        });

    }
}