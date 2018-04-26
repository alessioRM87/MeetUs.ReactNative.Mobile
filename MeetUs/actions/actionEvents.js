import { serverURL } from '../config/config';
import axios from 'axios';
import { PermissionsAndroid, Platform } from 'react-native';
import { login } from '../actions/actionAuthentication';

export function validateAddress(address){

    return dispatch => {
        let googleAPIUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=";
        var googleRequestUrl = googleAPIUrl + address;
    
        return axios.get(googleRequestUrl)
        .then(response => {
            let latlong = response.data.results.map(result => {
                const longitude = result.geometry.location.lng;
                const latitude = result.geometry.location.lat;
                const formattedAddress = result.formatted_address;
    
                return {
                    latitude: latitude,
                    longitude: longitude,
                    address: formattedAddress
                };
            });
    
            return new Promise.resolve({
                latitude: latlong[0].latitude,
                longitude: latlong[0].longitude,
                address: latlong[0].formattedAddress     
            });
        })
        .catch(error => {
            console.log("VALIDATE ADDRESS ERROR: ", error);
    
            return new Promise.reject();
        });
    }
    
}

export function getEventsAroundMe(position){

    return dispatch => {

        console.log("GET EVENTS AROUND ME LOADING");

        dispatch({
            type: "EVENTS_LOADING"
        });

        let requestURL = serverURL + "/event/search?latitude=" + position.coords.latitude + "&longitude=" + position.coords.longitude + "&distance=50000"
    
        // let requestURL = serverURL + "/event/search?latitude=43.684201&longitude=-79.318706&distance=50000";

        return axios.get(requestURL)
        .then(response => {

            console.log("GET EVENTS AROUND ME SUCCESS", response.data.data);

            dispatch({
                type: "EVENTS_SUCCESS",
                events: response.data.data
            });

            return new Promise.resolve(response.data.data);
        })
        .catch(error => {

            console.log("GET EVENTS AROUND ME ERROR: ", error.response);

            dispatch({
                type: "EVENTS_ERROR",
            })

            return new Promise.reject(error);
        });

        
    }
}

export function create(createRequest){
    return (dispatch) => {

        dispatch({
            type: "EVENTS_LOADING"
        });

        let body = {
            host_id: createRequest.host_id,
            title: createRequest.title,
            subtitle: createRequest.subtitle,
            address: createRequest.address,
            latitude: createRequest.latitude,
            longitude: createRequest.longitude,
            date: createRequest.date,
            description: createRequest.description,
        };

        return axios.post(serverURL + "/event", body)
        .then(response => {

            console.log("CREATE EVENT SUCCESS", response.data);

            dispatch({
                type: "EVENTS_CREATE_SUCCESS",
            })

            return new Promise.resolve(response.data);

        })
        .catch(error => {
            console.log("CREATE EVENT ERROR", error);

            dispatch({
                type: "EVENTS_ERROR",
            });

            return new Promise.reject(error);
        });     
    }
}

export function getEventById(eventID){
    return (dispatch) => {

        dispatch({
            type: "EVENTS_LOADING"
        });

        let requestUrl = serverURL + "/event?id=" + eventID;

        return axios.get(requestUrl).then(response => {
            console.log("GET EVENT BY ID SUCCESS: ", response.data.data);

                console.log("EVENT BY ID UPDATED: ", response.data);

                dispatch({
                    type: "EVENTS_GET_EVENT_BY_ID_SUCCESS",
                    event: response.data
                });

                return new Promise.resolve(response.data);
        })
        .catch(error => {
            console.log("GET EVENT BY ID ERROR: ", error);

            dispatch({
                type: "EVENTS_ERROR",
            });

            return new Promise.reject(error);
        });

    }
}

export function participateToEvent(user_id, event_id){

    return dispatch => {

        dispatch({
            type: "EVENTS_LOADING"
        });

        let requestUrl = serverURL + "/event/subscribe";

        let body = {
            user_id: user_id,
            event_id: event_id
        };

        return axios.post(requestUrl, body).then(response => {
            console.log("SUBSCRIBE TO EVENT SUCCESS: ", response.data);

            dispatch({
                type: "EVENTS_GET_EVENT_BY_ID_SUCCESS",
                event: response.data
            });

            return new Promise.resolve(response.data);
        })
        .catch(error => {
            console.log("GET EVENT BY ID ERROR: ", error);

            dispatch({
                type: "EVENTS_ERROR",
            });

            return new Promise.reject(error);
        });
    }

}

export function unsubscribeFromEvent(user_id, event_id){

    return dispatch => {

        dispatch({
            type: "EVENTS_LOADING"
        });

        let requestUrl = serverURL + "/event/unsubscribe";

        let body = {
            user_id: user_id,
            event_id: event_id
        };

        return axios.post(requestUrl, body).then(response => {
            console.log("UNSUBSCRIBE FROM EVENT SUCCESS: ", response.data);

            dispatch({
                type: "EVENTS_GET_EVENT_BY_ID_SUCCESS",
                event: response.data
            });

            return new Promise.resolve(response.data);
        })
        .catch(error => {
            console.log("GET EVENT BY ID ERROR: ", error);

            dispatch({
                type: "EVENTS_ERROR",
            });

            return new Promise.reject(error);
        });
    }

}

export function getHostedEvents(host_id){
    return (dispatch) => {

        dispatch({
            type: "EVENTS_HOSTED_EVENTS_LOADING"
        });

        let requestUrl = serverURL + "/host_event?host_id=" + host_id;

        return axios.get(requestUrl).then(response => {
            console.log("GET HOSTED EVENTS SUCCESS: ", response.data);

            dispatch({
                type: "EVENTS_HOSTED_EVENTS_SUCCESS",
                events: response.data
            });

            return new Promise.resolve(response.data);
        })
        .catch(error => {
            console.log("GET EVENT BY ID ERROR: ", error);

            dispatch({
                type: "EVENTS_HOSTED_EVENTS_ERROR",
            });

            return new Promise.reject(error);

        });

    }
}

export function getSubscribedEvents(guest_id){
    return (dispatch) => {

        dispatch({
            type: "EVENTS_SUBSCRIBED_EVENTS_LOADING"
        });

        let requestUrl = serverURL + "/guest_event?id=" + guest_id;

        return axios.get(requestUrl).then(response => {
            console.log("GET SUBSCRIBED EVENTS SUCCESS: ", response.data);

            dispatch({
                type: "EVENTS_SUBSCRIBED_EVENTS_SUCCESS",
                events: response.data
            });

            return new Promise.resolve(response.data);
        })
        .catch(error => {
            console.log("GET SUBSCRIBED EVENTS ERROR: ", error);

            dispatch({
                type: "EVENTS_SUBSCRIBED_EVENTS_ERROR",
            });

            return new Promise.reject(error);

        });

    }
}

export function deleteEvent(eventID){
    return dispatch => {
        dispatch({
            type: "EVENTS_LOADING"
        });

        let requestUrl = serverURL + "/event?id=" + eventID;

        return axios.delete(requestUrl).then(response => {
            console.log("DELETE EVENT SUCCESS");

            dispatch({
                type: "EVENTS_SUCCESS"
            });

            return new Promise.resolve();
        })
        .catch(error => {
            console.log("GET EVENT BY ID ERROR: ", error);

            dispatch({
                type: "EVENTS_ERROR",
            });

            return new Promise.reject(error);
        });
    }
}

export function updateEvent(updateRequest){
    return dispatch => {

        dispatch({
            type: "EVENTS_LOADING"
        });

        let requestUrl = serverURL + "/event/update";

        let body = {
            _id: updateRequest._id,
            title: updateRequest.title,
            description: updateRequest.description,
            subtitle: updateRequest.subtitle,
            latitude: updateRequest.latitude,
            longitude: updateRequest.longitude,
            date: updateRequest.date,
            address: updateRequest.address,
        };

        return axios.post(requestUrl, body).then(response => {

           console.log("UPDATE EVENT SUCCESS: ", response.data);

           dispatch({
               type: "EVENTS_GET_EVENT_BY_ID_SUCCESS",
               event: response.data
           });

           return new Promise.resolve(response.data);

        })
        .catch(error => {
            console.log("GET EVENT BY ID ERROR: ", error);

            dispatch({
                type: "EVENTS_ERROR",
            });

            return new Promise.reject(error);
        });

        
    }
}