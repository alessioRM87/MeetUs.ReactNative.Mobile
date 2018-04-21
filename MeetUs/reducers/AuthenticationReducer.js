const initialState = {
    loading : false,
    user: null
};

export default function authenticationReducer(state = initialState, action = {}){
    switch (action.type){
        case "AUTHENTICATION_LOADING":
            return {
                ...state,
                loading: true,
            };
        case "AUTHENTICATION_SUCCESS":
            return {
                ...state,
                loading: false,
                user: action.user
            };
        case "AUTHENTICATION_ERROR":
            return {
                ...state,
                loading: false,
            };
        case "AUTHENTICATION_LOGOUT":
            return {
                ...state,
                loading : false,
                user: null
            };
        default : 
            return state;
    }
}