import React from 'react';
import { Button, View, StyleSheet, Dimensions, ImageBackground, Text, ProgressBarAndroid, Platform, PermissionsAndroid } from 'react-native';
import { connect } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import Header from '../common/header';
import ButtonBack from '../common/back';
import { getEventsAroundMe, setSelectedEventID } from '../../actions/actionEvents';

class Search extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.getEventsAroundMe();
    }

    handleOnClickBack(){
        this.props.navigation.navigate('Home');
    }

    handleOnPressMarker(eventID){
        this.props.setSelectedEventID(eventID);
        this.props.navigation.navigate('Details');
    }

    renderMarkers(){
        return this.props.events.map((event, i) => {
            return <Marker
                key={i}
                coordinate={{latitude: event.latitude, longitude: event.longitude}}
                title={event.title}
                onPress={this.handleOnPressMarker.bind(this, event._id)}>
            </Marker>
        });
    }

    render(){
        return (
            <View style={styles.container}>
                <Header handleOnClickBack={this.handleOnClickBack.bind(this)} headerText='EVENTS AROUND ME'/>
                <ButtonBack navigateBack={this.handleOnClickBack.bind(this)}/>
                <MapView
                style={styles.map}
                initialRegion={{
                latitude: 43.684201,
                longitude: -79.318706,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
                }}>
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
        getEventsAroundMe: () => dispatch(getEventsAroundMe()),
        setSelectedEventID: (eventID) => dispatch(setSelectedEventID(eventID))
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search)