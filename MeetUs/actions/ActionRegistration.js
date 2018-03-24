import { serverURL } from '../config/Config';
import { setLoginSuccess } from './ActionLogin';

export function setEmail(email){
    return {
        type: "REGISTRATION_SET_EMAIL",
        email: email
    };
}

export function setEmailError(emailError){
    return {
        type: "REGISTRATION_SET_EMAIL_ERROR",
        emailError: emailError
    };
}

export function setFirstName(firstName){
    return {
        type: "REGISTRATION_SET_FIRST_NAME",
        firstName: firstName
    };
}

export function setFirstNameError(firstNameError){
    return {
        type: "REGISTRATION_SET_FIRST_NAME_ERROR",
        firstNameError: firstNameError
    };
}

export function setLastName(lastName){
    return {
        type: "REGISTRATION_SET_LAST_NAME",
        lastName: lastName
    };
}

export function setLastNameError(lastNameError){
    return {
        type: "REGISTRATION_SET_LAST_NAME_ERROR",
        lastNameError: lastNameError
    };
}

export function setPassword(password){
    return {
        type: "REGISTRATION_SET_PASSWORD",
        password: password
    };
}

export function setPasswordError(passwordError){
    return {
        type: "REGISTRATION_SET_PASSWORD_ERROR",
        passwordError: passwordError
    };
}

export function setConfirmPassword(confirmPassword){
    return {
        type: "REGISTRATION_SET_CONFIRM_PASSWORD",
        confirmPassword: confirmPassword
    };
}

export function setConfirmPasswordError(confirmPasswordError){
    return {
        type: "REGISTRATION_SET_CONFIRM_PASSWORD_ERROR",
        confirmPasswordError: confirmPasswordError
    };
}

export function setRegistrationLoading(){
    return {
        type: "REGISTRATION_LOADING"
    };
}

export function setRegistrationSuccess(){
    return {
        type: "REGISTRATION_SUCCESS"
    };
}

export function setRegistrationError(error){
    return {
        type: "REGISTRATION_ERROR",
        error: error
    };
}

export function register(email, firstName, lastName, password, callback){
    return (dispatch) => {
        dispatch(setRegistrationLoading());

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
                dispatch(setRegistrationSuccess());
                dispatch(setLoginSuccess(responseJson.data));
                callback();
            }

        })
        .catch(error => {
            console.log("REGISTRATION ERROR", error);
            dispatch(setLoginError("Registration failed: please try again"));
        });
    }
}



