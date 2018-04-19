const initialState = {
    position: {
        coords: {
            latitude: 37.78825,
            longitude: -122.4324
        }
    },
    events: [],
    event: null,
    loading : false,
    memberLoaded: false,
    success : false,
    error : null,
    title: "",
    titleError: "",
    subtitle: "",
    subtitleError: "",
    description: "",
    descriptionError: "",
    address: "",
    addressError: "",
    date: "",
    dateError: ""
};

export default function eventsReducer(state = initialState, action = {}){
    switch (action.type){
        case "EVENTS_SET_TITLE":
            return {
                ...state,
                title: action.title
            };
        case "EVENTS_SET_TITLE_ERROR":
            return {
                ...state,
                titleError: action.titleError
            };
        case "EVENTS_SET_SUBTITLE":
            return {
                ...state,
                subtitle: action.subtitle
            };
        case "EVENTS_SET_SUBTITLE_ERROR":
            return {
                ...state,
                subtitleError: action.subtitleError
            };
        case "EVENTS_SET_DESCRIPTION":
            return {
                ...state,
                description: action.description
            };
        case "EVENTS_SET_DESCRIPTION_ERROR":
            return {
                ...state,
                descriptionError: action.descriptionError
            };
        case "EVENTS_SET_ADDRESS":
            return {
                ...state,
                address: action.address
            };
        case "EVENTS_SET_ADDRESS_ERROR":
            return {
                ...state,
                addressError: action.addressError
            };
        case "EVENTS_SET_DATE":
            return {
                ...state,
                date: action.date
            };
        case "EVENTS_SET_DATE_ERROR":
            return {
                ...state,
                dateError: action.dateError
            };
        case "EVENTS_SET_SELECTED_EVENT_ID":
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
        case "EVENTS_GET_EVENT_BY_ID_SUCCESS":
            return {
                ...state,
                event: action.event,
                loading: false,
                success: true,
                error: null
            };
        default : 
            return state;
    }
}