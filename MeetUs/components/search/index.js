import React from 'react';
import { Button, View, StyleSheet, Dimensions, ImageBackground, Text, ProgressBarAndroid, Platform, PermissionsAndroid, Alert, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import Header from '../common/header';
import ButtonBack from '../common/back';
import { getEventsAroundMe } from '../../actions/actionEvents';

class Search extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            region: {
                latitude: 43.684201,
                longitude: -79.318706,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            }
        }
    }

    async componentDidMount(){

        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                title: 'App needs to access your location',
                message: 'App needs access to your location ' +
                'so we can let our app be even more awesome.'
                }
            );

        if (granted) {
            console.log("GRANTED!");
        }

        navigator.geolocation.getCurrentPosition((position) => {

            console.log("GET POSITION SUCCESS: ", position);

            this.setState({
                region: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }
            })

            this.props.getEventsAroundMe(position).then(events => {

            })
            .catch(error => {

                if (error.response.status == 401){

                    Alert.alert(
                        'USER NOT LOGGED IN',
                        'You will be redirected to the login page',
                        [
                        {text: 'OK', onPress: () => {
                            AsyncStorage.clear(() => {
                                this.props.navigation.navigate('Login');
                            });
                        }},
                        ],
                        { cancelable: false }
                    )
                }
            });
        }, (error) => {

            console.log("GET POSITION ERROR: ", error);

        })
    }

    handleOnClickBack(){
        this.props.navigation.navigate('Home');
    }

    handleOnPressMarker(eventID){
        this.props.navigation.navigate('Details', {eventID: eventID});
    }

    renderMarkers(){

        if (this.props.events.length > 0){

            console.log("EVENTS FOUND");

            return this.props.events.map((event, i) => {
                return <Marker
                    key={i}
                    coordinate={{latitude: event.latitude, longitude: event.longitude}}
                    title={event.title}
                    onPress={this.handleOnPressMarker.bind(this, event._id)}>
                </Marker>
            });
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <Header headerText='EVENTS AROUND ME'/>
                <ButtonBack navigateBack={this.handleOnClickBack.bind(this)}/>
                <MapView
                style={styles.map}
                initialRegion={this.state.region}>
                    {
                        this.props.loading
                        ?
                        this.renderMarkers()
                        :
                        this.renderMarkers()
                        
                    }
                </MapView>
                {
                    this.props.loading
                    &&
                    <View style={styles.containerLoading}>
                        <ProgressBarAndroid/>
                    </View>
                }
            </View>
    );
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollView: {
        flex: 1
    },
    map: {
        flex: 1
    },
    containerLoading: {
        left: 0,
        top: 0,
        bottom: 0,
        right: 0, 
        position: 'absolute',
        backgroundColor: 'black',
        opacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

function mapStateToProps (state) {
    return {
        loading: state.eventsReducer.loading,
        position: state.eventsReducer.position,
        events: state.eventsReducer.events
    };
}
function mapDispatchToProps(dispatch){
    return {
        getEventsAroundMe: (position) => dispatch(getEventsAroundMe(position)),
        getPosition: () => dispatch(getPosition())
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search)