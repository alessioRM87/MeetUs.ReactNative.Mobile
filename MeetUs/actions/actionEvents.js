import { serverURL } from '../config/config';
import axios from 'axios';
import { PermissionsAndroid, Platform } from 'react-native';

export function setSelectedEventID(eventID){
    return {
        type: "EVENT_SET_SELECTED_EVENT_ID",
        eventID: eventID``
    };
}

async function requestLocationPermission(){
    return await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'MeetUs Location Request',
          'message': 'MeetUs has to access to your location to show events around your position'
        }
    );
}

export function setTitle(title){
    return {
        type : "EVENTS_SET_TITLE",
        title : title
    };
}

export function setTitleError(titleError){
    return {
        type : "EVENTS_SET_TITLE_ERROR",
        titleError : titleError
    };
}

export function setSubtitle(subtitle){
    return {
        type: "EVENTS_SET_SUBTITLE",
        subtitle: subtitle
    };
}

export function setSubtitleError(subtitleError){
    return {
        type: "EVENTS_SET_SUBTITLE_ERROR",
        subtitleError: subtitleError
    };
}

export function setAddress(address){
    return {
        type: "EVENTS_SET_ADDRESS",
        address: address
    };
}

export function setAddressError(addressError){
    return {
        type: "EVENTS_SET_ADDRESS_ERROR",
        addressError: addressError
    };
}

export function setDescription(description){
    return {
        type: "EVENTS_SET_DESCRIPTION",
        description: description
    };
}

export function setDescriptionError(descriptionError){
    return {
        type: "EVENTS_SET_DESCRIPTION_ERROR",
        descriptionError: descriptionError
    };
}

export function setDate(date){
    return {
        type: "EVENTS_SET_DATE",
        date: date
    };
}

export function setDateError(dateError){
    return {
        type: "EVENTS_SET_DATE_ERROR",
        dateError: dateError
    };
}

export function getEventsAroundMe(){

    return dispatch => {

        if (Platform.OS == "android"){
            const granted = requestLocationPermission();
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {

                console.log("GET EVENTS AROUND ME", position);
        
                dispatch({
                    type: "EVENTS_LOADING"
                });

                // let requestURL = serverURL + "/event/search?latitude=" + position.coords.latitude + "&longitude=" + position.coords.longitude + "&distance=50"
            
                let requestURL = serverURL + "/event/search?latitude=43.684201&longitude=-79.318706&distance=50000";

                axios.get(requestURL)
                .then(response => {

                    if (response.data.err){

                        console.log("GET EVENTS AROUND ME ERROR", response.data.err);

                        dispatch({
                            type: "EVENTS_ERROR",
                            error: response.data.err
                        })
                    }
                    else{
                        console.log("GET EVENTS AROUND ME SUCCESS", response.data.data);

                        dispatch({
                            type: "EVENTS_SUCCESS",
                            events: response.data.data
                        });
                    }
                })
                .catch(error => {

                    dispatch({
                        type: "EVENTS_ERROR",
                        error: error
                    })
                });
            },
            (error) => {
                console.log("POSITION ERROR: ", error);

                dispatch({
                    type: "EVENTS_ERROR",
                    error: error
                })
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 1000 }
        );

        
    }

    
}

export function create(createRequest){
    return (dispatch) => {

        dispatch({
            type: "EVENTS_LOADING"
        });

        let googleAPIUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=";
        var googleRequestUrl = googleAPIUrl + createRequest.address;

        return axios.get(googleRequestUrl).then(response => {
            let latlong = response.data.results.map(result => {
                const longitude = result.geometry.location.lng;
                const latitude = result.geometry.location.lat;
                const formattedAddress = result.formatted_address;

                return {
                    latitude: latitude,
                    longitude: longitude,
                    address: formattedAddress
                };
            })

            let body = {
                host_id: createRequest.host_id,
                title: createRequest.title,
                subtitle: createRequest.subtitle,
                address: latlong[0].address,
                latitude: latlong[0].latitude,
                longitude: latlong[0].longitude,
                date: createRequest.date,
                description: createRequest.description,
            };

            console.log("REQUEST BODY: ", body);
    
            return axios.post(serverURL + "/event", body).then(function (response) {
    
                if (response.data.err){
                    console.log("CREATE EVENT ERROR", response.data.err);
    
                    dispatch({
                        type: "EVENTS_ERROR",
                        error: 'Error creating event: please try again'
                    });

                    return new Promise.reject(response.data.err);
                }
                else{
    
                    console.log("CREATE EVENT SUCCESS", response.data.data);
    
                    return navigator.geolocation.getCurrentPosition((position) => {
                        // let requestURL = serverURL + "/event/search?latitude=" + position.coords.latitude + "&longitude=" + position.coords.longitude + "&distance=50"
                
                        let requestURL = serverURL + "/event/search?latitude=43.684201&longitude=-79.318706&distance=50000";
    
                        return axios.get(requestURL).then(response => {
    
                            if (response.data.err){
    
                                console.log("GET EVENTS AROUND ME ERROR", response.data.err);
    
                                dispatch({
                                    type: "EVENTS_ERROR",
                                    error: response.data.err
                                })

                                return new Promise.reject(response.data.err);
                            }
                            else{
                                console.log("GET EVENTS AROUND ME SUCCESS", response.data.data);
    
                                dispatch({
                                    type: "EVENTS_SUCCESS",
                                    events: response.data.data
                                });
    
                                return new Promise.resolve();
                            }
                        })
                        .catch(error => {
    
                            dispatch({
                                type: "EVENTS_ERROR",
                                error: error
                            })

                            return new Promise.reject(error);
                        });
                    },
                    (error) => {
                        console.log("POSITION ERROR: ", error);
            
                        dispatch({
                            type: "EVENTS_ERROR",
                            error: error
                        })

                        return new Promise.reject(error);
                    },
                    { enableHighAccuracy: true, timeout: 5000, maximumAge: 1000 });
                    
    
                }
    
            })
            .catch(function (error) {
                console.log("CREATE EVENT ERROR", error);
    
                dispatch({
                    type: "EVENTS_ERROR",
                    error: "CREATE EVENT failed: please try again"
                });

                return new Promise.reject(error);
            });

        })
        .catch(error => {
            dispatch({
                type: "EVENTS_ERROR",
                error: "Error creating event: please try again"
            });

            return new Promise.reject(error);
        });

        
    }
}