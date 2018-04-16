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