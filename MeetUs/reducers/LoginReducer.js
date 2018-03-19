const initialState = {
    username : "",
    password : "",
    loading: false,
    success : false,
    error : null
};

export default function loginReducer(state = initialState, action = {}){
    switch (action.type){
        default: 
            return state;
    }
}