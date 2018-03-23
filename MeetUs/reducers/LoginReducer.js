const initialState = {
    email : "",
    emailError: "",
    password : "",
    passwordError: "",
    loading: false,
    success : false,
    error : null
};

export default function loginReducer(state = initialState, action = {}){
    switch (action.type){
        case "LOGIN_SET_EMAIL":
            return {
                ...state,
                email: action.email
            };
        case "LOGIN_SET_EMAIL_ERROR":
            return {
                ...state,
                emailError: action.emailError
            };
        case "LOGIN_SET_PASSWORD":
            return {
                ...state,
                password: action.password
            };
        case "LOGIN_SET_PASSWORD_ERROR":
            return {
                ...state,
                passwordError: action.passwordError
            };
        case "LOGIN_LOADING":
            return {
                ...state,
               loading: true,
               success: false,
               error: ""
            };
        case "LOGIN_SUCCESS":
            console.log("LOGIN REDUCER: set login success");
            return {
                ...state,
                loading: false,
                success: true,
                error: ""
            };
        case "LOGIN_ERROR":
            return {
                ...state,
                loading: false,
                success: false,
                error: action.error
            };
        default: 
            return state;
    }
}