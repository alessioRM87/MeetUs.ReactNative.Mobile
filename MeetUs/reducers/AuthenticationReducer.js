const initialState = {
    email : "",
    emailError: "",
    firstName: "",
    firstNameError: "",
    lastName: "",
    lastNameError: "",
    password : "",
    passwordError: "",
    confirmPassword : "",
    confirmPasswordError: "",
    loading : false,
    success : false,
    error : null,
};

export default function authenticationReducer(state = initialState, action = {}){
    switch (action.type){
        case "AUTHENTICATION_SET_EMAIL":
            return {
                ...state,
                email: action.email
            };
        case "AUTHENTICATION_SET_EMAIL_ERROR":
            return {
                ...state,
                emailError: action.emailError
            };
        case "AUTHENTICATION_SET_FIRST_NAME":
            return {
                ...state,
                firstName: action.firstName
            };
        case "AUTHENTICATION_SET_FIRST_NAME_ERROR":
            return {
                ...state,
                firstNameError: action.firstNameError
            };
        case "AUTHENTICATION_SET_LAST_NAME":
            return {
                ...state,
                lastName: action.lastName
            };
        case "AUTHENTICATION_SET_LAST_NAME_ERROR":
            return {
                ...state,
                lastNameError: action.lastNameError
            };
        case "AUTHENTICATION_SET_PASSWORD":
            return {
                ...state,
                password: action.password
            };
        case "AUTHENTICATION_SET_PASSWORD_ERROR":
            return {
                ...state,
                passwordError: action.passwordError
            };
        case "AUTHENTICATION_SET_CONFIRM_PASSWORD":
            return {
                ...state,
                confirmPassword: action.confirmPassword
            };
        case "AUTHENTICATION_SET_CONFIRM_PASSWORD_ERROR":
            return {
                ...state,
                confirmPasswordError: action.confirmPasswordError
            };
        case "AUTHENTICATION_SET_EMAIL":
            return {
                ...state,
                email: action.email
            };
        case "AUTHENTICATION_SET_EMAIL":
            return {
                ...state,
                email: action.email
            };
        case "AUTHENTICATION_LOADING":
            return {
                ...state,
                loading: true,
                success: false,
                error: ""
            };
        case "AUTHENTICATION_SUCCESS":
            return {
                ...state,
                loading: false,
                success: true,
                error: ""
            };
        case "AUTHENTICATION_ERROR":
            return {
                ...state,
                loading: false,
                success: false,
                error: action.error
            };
        case "AUTHENTICATION_LOGOUT":
            return {
                ...state,
                email : "",
                emailError: "",
                firstName: "",
                firstNameError: "",
                lastName: "",
                lastNameError: "",
                password : "",
                passwordError: "",
                confirmPassword : "",
                confirmPasswordError: "",
                loading : false,
                success : false,
                error : null
            };
        default : 
            return state;
    }
}