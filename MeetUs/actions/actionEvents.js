import { serverURL } from '../config/config';
import axios from 'axios';
import { PermissionsAndroid, Platform } from 'react-native';

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
        type : "EVENTS__SET_TITLE",
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
        dadescriptionte: description
    };
}

export function setDescriptionError(descriptionError){
    return {
        type: "EVENTS_SET_DESCRIPTION_ERROR",
        descriptionError: datdescriptionErroreError
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
            
                let requestURL = serverURL + "/event/search?latitude=43.684201&longitude=-79.318706&distance=50";

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

export function create(title, subtitle, address, date, description, callback){
    return (dispatch) => {

        dispatch({
            type: "EVENTS_LOADING"
        });

        let body = {
            title: title,
            subtitle: subtitle,
            address: address,
            date: date,
            description: description,
        };

        axios.post(serverURL + "/user/create", body)
        .then(function (response) {

            if (response.data.err){
                console.log("CREATE EVENT ERROR", response.data.err);

                dispatch({
                    type: "EVENTS_ERROR",
                    error: 'An account with this CREATE EVENT already exists'
                });
            }
            else{

                console.log("CREATE EVENT SUCCESS", response.data.data);
                let eventInfoString = JSON.stringify(response.data.data);
                saveAsyncStorage(dispatch, "eventInfo", eventInfoString, callback);

            }

        })
        .catch(function (error) {
            console.log("CREATE EVENT ERROR", error);

            dispatch({
                type: "EVENTS_ERROR",
                error: "CREATE EVENT failed: please try again"
            });
        });
    }
}