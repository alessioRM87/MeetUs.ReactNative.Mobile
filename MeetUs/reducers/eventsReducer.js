const initialState = {
    position: {
        coords: {
            latitude: 37.78825,
            longitude: -122.4324
        }
    },
    events: [],
    myHostedEvents: null,
    myHostedEventsLoaded: false,
    mySubscribedEvents: null,
    mySubscribedEventsLoaded: false,
    event: null,
    isMember: false,
    loading : false,
    memberLoaded: false,
};

export default function eventsReducer(state = initialState, action = {}){
    switch (action.type){
        case "EVENTS_SET_MEMBERS":
            let selectedEvent = state.event;

            selectedEvent.users = action.members;

            return {
                ...state,
                event: selectedEvent
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
            }
        case "EVENTS_SUCCESS":

            if (action.events){
                return{
                    ...state,
                    loading : false,
                    events: action.events
                }
            }
            else{
                return{
                    ...state,
                    loading : false,
                }
            }

            
        case "EVENTS_ERROR":
            return{
                ...state,
                loading : false,
            }
        case "EVENTS_CREATE_SUCCESS":
            return{
                ...state,
                loading : false,
            }
        case "EVENTS_GET_EVENT_BY_ID_SUCCESS":

            return {
                ...state,
                event: action.event,
                loading: false,
                success: true,
                error: null
            };
        case "EVENTS_HOSTED_EVENTS_LOADING":
            return {
                ...state,
                loading : true,
                myHostedEventsLoaded : false,
                error : ""
            };
        case "EVENTS_HOSTED_EVENTS_SUCCESS":
            return {
                ...state,
                loading : false,
                myHostedEventsLoaded : true,
                error : "",
                myHostedEvents: action.events
            };
        case "EVENTS_HOSTED_EVENTS_ERROR":
            return {
                ...state,
                loading : false,
                myHostedEventsLoaded : true,
                error : action.error
            };
            case "EVENTS_SUBSCRIBED_EVENTS_LOADING":
            return {
                ...state,
                loading : true,
                mySubscribedEventsLoaded : false,
                error : ""
            };
        case "EVENTS_SUBSCRIBED_EVENTS_SUCCESS":
            return {
                ...state,
                loading : false,
                mySubscribedEventsLoaded : true,
                error : "",
                mySubscribedEvents: action.events
            };
        case "EVENTS_SUBSCRIBED_EVENTS_ERROR":
            return {
                ...state,
                loading : false,
                mySubscribedEventsLoaded : true,
                error : action.error
            };
        default : 
            return state;
    }
}