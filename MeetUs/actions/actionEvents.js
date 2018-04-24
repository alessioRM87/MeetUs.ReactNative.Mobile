import { serverURL } from '../config/config';
import axios from 'axios';
import { PermissionsAndroid, Platform } from 'react-native';
import { login } from '../actions/actionAuthentication';

export function getPosition(){

    return dispatch => {
        
        // var granted;

        // if (Platform.OS == "android" && Platform.Version >= 23){
        //     granted = requestLocationPermission();
        // }

        // console.log("GRANTED: ", granted);
            
        // if (granted == PermissionsAndroid.RESULTS.GRANTED || (Platform.OS == "android" && Platform.Version < 23)){

        //     console.log("PERMISSIONS GRANTED");

        //     return navigator.geolocation.getCurrentPosition((position) => {

        //         console.log("GET POSITION SUCCESS: ", position);

        //         return new Promise.resolve(position);

        //     }, (error) => {

        //         console.log("GET POSITION ERROR: ", error);

        //         return new Promise.reject();
        //     })
        // }
        // else{

        //     console.log("PERMISSIONS NOT GRANTED");

        //     return new Promise.reject();
        // }

            return navigator.geolocation.getCurrentPosition((position) => {

                console.log("GET POSITION SUCCESS: ", position);

                return new Promise.resolve(position);

            }, (error) => {

                console.log("GET POSITION ERROR: ", error);

                return new Promise.reject();
            },
            { enableHighAccuracy: true, timeout: 25000, maximumAge: 3600000 })
    }

    
}

export function validateAddress(address){
    let googleAPIUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=";
    var googleRequestUrl = googleAPIUrl + createRequest.address;

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

async function requestLocationPermission(){

    let granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
            'title': 'MeetUs Location Request',
            'message': 'MeetUs has to access to your location to show events around your position'
        }
    );

    return granted;
    
}

export function getEventsAroundMe(position){

    return dispatch => {

        console.log("GET EVENTS AROUND ME CALLED");

        dispatch({
            type: "EVENTS_LOADING"
        });

        let requestURL = serverURL + "/event/search?latitude=" + position.coords.latitude + "&longitude=" + position.coords.longitude + "&distance=50"
    
        // let requestURL = serverURL + "/event/search?latitude=43.684201&longitude=-79.318706&distance=50000";

        axios.get(requestURL)
        .then(response => {

            console.log("GET EVENTS AROUND ME SUCCESS", response.data.data);

            dispatch({
                type: "EVENTS_SUCCESS",
                events: response.data.data
            });
        })
        .catch(error => {

            dispatch({
                type: "EVENTS_ERROR",
            })
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

            console.log("CREATE EVENT SUCCESS", response.data.data);

            dispatch({
                type: "EVENTS_CREATE_SUCCESS",
            })

            return new Promise.resolve(response.data.data);

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

                let event = response.data;

                requestUrl = serverURL + '/user?id=' + event.host_id;

                return axios.get(requestUrl).then(responseUser => {

                    event.host = responseUser.data;

                    console.log("EVENT BY ID UPDATED: ", event);

                    dispatch({
                        type: "EVENTS_GET_EVENT_BY_ID_SUCCESS",
                        event: event
                    });
    
                    return new Promise.resolve(event);
                })
                .catch(error => {
                    console.log("GET EVENT BY ID ERROR: ", error);

                    dispatch({
                        type: "EVENTS_ERROR",
                    });

                    return new Promise.reject(error);
                })
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
            console.log("SUBSCRIBE TO EVENT SUCCESS: ", response.data.data);

            let event = response.data;

            requestUrl = serverURL + '/user?id=' + event.host_id;

            return axios.get(requestUrl).then(responseUser => {

                event.host = responseUser.data;

                console.log("EVENT BY ID UPDATED: ", event);

                dispatch({
                    type: "EVENTS_GET_EVENT_BY_ID_SUCCESS",
                    event: event
                });

                return new Promise.resolve(event);

            })
            .catch(error => {
                console.log("GET EVENT BY ID ERROR: ", error);

                dispatch({
                    type: "EVENTS_ERROR",
                });

                return new Promise.reject(error);
            })
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
            console.log("UNSUBSCRIBE TO EVENT SUCCESS: ", response.data);

            let event = response.data;

            requestUrl = serverURL + '/user?id=' + event.host_id;

            return axios.get(requestUrl).then(responseUser => {

                event.host = responseUser.data;

                console.log("EVENT BY ID UPDATED: ", event);

                dispatch({
                    type: "EVENTS_GET_EVENT_BY_ID_SUCCESS",
                    event: event
                });

                return new Promise.resolve(event);
            })
            .catch(error => {
                console.log("GET EVENT BY ID ERROR: ", error);

                dispatch({
                    type: "EVENTS_ERROR",
                });

                return new Promise.reject(error);
            })
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

            let event = response.data;

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

            let event = response.data;

            requestUrl = serverURL + '/user?id=' + event.host_id;

            return axios.get(requestUrl).then(responseUser => {

                event.host = responseUser.data;

                console.log("EVENT BY ID UPDATED: ", event);

                dispatch({
                    type: "EVENTS_GET_EVENT_BY_ID_SUCCESS",
                    event: event
                });

                return new Promise.resolve(event);
            })
            .catch(error => {
                console.log("GET EVENT BY ID ERROR: ", error);

                dispatch({
                    type: "EVENTS_ERROR",
                });

                return new Promise.reject(error);
            })

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