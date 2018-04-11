import React from 'react';
import { View, StyleSheet, Dimensions, ImageBackground, Text, ProgressBarAndroid } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import Header from '../common/Header';

class Search extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={styles.container}>
                <Header headerText='EVENTS AROUND ME'/>
                <MapView
                initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}/>
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
    };
}
function mapDispatchToProps(dispatch){
    return {
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search)