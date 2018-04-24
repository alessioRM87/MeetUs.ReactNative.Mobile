import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { deleteEvent, getEventsAroundMe } from '../../actions/actionEvents';

class ButtonEditDelete extends React.Component{

    constructor(props){
        super(props);
    }

    handleOnPressEdit(){
        this.props.navigation.navigate("Edit");
    }

    handleOnPressDelete(){
        this.props.deleteEvent(this.props.event._id).then(async () => {

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
                    this.props.navigation.pop();
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
        });
    }

    render(){
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={this.handleOnPressEdit.bind(this)}>
                    <Image style={styles.image} source={require('../../images/ic_edit_white_24dp.png')}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={this.handleOnPressDelete.bind(this)}>
                    <Image style={styles.image} source={require('../../images/ic_delete_white_24dp.png')}/>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        right: 20,
        bottom: 10,
        height: 120,
        width: 50,
        flex: 1,
        flexDirection: 'column',
    },
    button: {
        marginBottom: 10,
        height: 50,
        width: 50,
        backgroundColor: "#000080",
        borderRadius: 50
    },
    image: {
        height: 50,
        width: 50,
        resizeMode: 'contain',
    }
});

function mapStateToProps (state) {
    return {
        event: state.eventsReducer.event
    };
}
function mapDispatchToProps(dispatch){
    return {
        deleteEvent: (event_id) => dispatch(deleteEvent(event_id))
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ButtonEditDelete)