const initialState = {
    username : "",
    password : "",
    confirmPassword : "",
    loading : false,
    success : false,
    error : null
};

export default function registrationReducer(state = initialState, action = {}){
    switch (action.type){
        default : 
            return state;
    }
}