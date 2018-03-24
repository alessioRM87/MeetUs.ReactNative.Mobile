const serverURL = "https://meet-us-server1.herokuapp.com/api";

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

        console.log("Received: ", email, password);

        let json = {
            email: email,
            password: password
        };

        let body = JSON.stringify(json);

        console.log("Body stringify: ", body);

        let headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };

        let data = {
            method: 'POST',
            headers: headers,
            body: body
        };

        console.log("Data for request: ", data);

        fetch(serverURL + "/user/login", data)
        .then(response => response.json())
        .then(responseJson => {
            
            if (responseJson.err){
                dispatch(setLoginError('Wrong email/password: please try again'));
            }
            else{
                dispatch(setLoginSuccess(responseJson.data));
                callback();
            }

        })
        .catch(error => {
            console.log("LOGIN ERROR", error);
            dispatch(setLoginError("Login failed: please try again"));
        })


    }
}