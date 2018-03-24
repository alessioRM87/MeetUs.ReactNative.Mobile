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
    error : null
};

export default function registrationReducer(state = initialState, action = {}){
    switch (action.type){
        case "REGISTRATION_SET_EMAIL":
            return {
                ...state,
                email: action.email
            };
        case "REGISTRATION_SET_EMAIL_ERROR":
            return {
                ...state,
                emailError: action.emailError
            };
        case "REGISTRATION_SET_FIRST_NAME":
            return {
                ...state,
                firstName: action.firstName
            };
        case "REGISTRATION_SET_FIRST_NAME_ERROR":
            return {
                ...state,
                firstNameError: action.firstNameError
            };
        case "REGISTRATION_SET_LAST_NAME":
            return {
                ...state,
                lastName: action.lastName
            };
        case "REGISTRATION_SET_LAST_NAME_ERROR":
            return {
                ...state,
                lastNameError: action.lastNameError
            };
        case "REGISTRATION_SET_PASSWORD":
            return {
                ...state,
                password: action.password
            };
        case "REGISTRATION_SET_PASSWORD_ERROR":
            return {
                ...state,
                passwordError: action.passwordError
            };
        case "REGISTRATION_SET_CONFIRM_PASSWORD":
            return {
                ...state,
                confirmPassword: action.confirmPassword
            };
        case "REGISTRATION_SET_CONFIRM_PASSWORD_ERROR":
            return {
                ...state,
                confirmPasswordError: action.confirmPasswordError
            };
        case "REGISTRATION_SET_EMAIL":
            return {
                ...state,
                email: action.email
            };
        case "REGISTRATION_SET_EMAIL":
            return {
                ...state,
                email: action.email
            };
        case "REGISTRATION_LOADING":
            return {
                ...state,
                loading: true,
                success: false,
                error: ""
            };
        case "REGISTRATION_SUCCESS":
            return {
                ...state,
                loading: false,
                success: true,
                error: ""
            };
        case "REGISTRATION_ERROR":
            return {
                ...state,
                loading: false,
                success: false,
                error: action.error
            };
        default : 
            return state;
    }
}