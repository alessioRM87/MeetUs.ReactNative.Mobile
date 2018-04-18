const initialState = {
    position: {
        coords: {
            latitude: 37.78825,
            longitude: -122.4324
        }
    },
    events: [],
    eventID: null,
    loading : false,
    success : false,
    error : null
};

export default function eventsReducer(state = initialState, action = {}){
    switch (action.type){
        case "EVENT_SET_SELECTED_EVENT_ID":
            return {
                ...state,
                eventID: action.eventID
            };
        case "POSITION SUCCESS":
            return {
                ...state,
                position: action.position
            };
        case "EVENTS_LOADING":
            return{
                ...state,
                loading : true,
                success : false,
                error : null
            }
        case "EVENTS_SUCCESS":
            return{
                ...state,
                loading : false,
                success : true,
                error : null,
                events: action.events
            }
        case "EVENTS_ERROR":
            return{
                ...state,
                loading : false,
                success : false,
                error : action.error
            }
        default : 
            return state;
    }
}