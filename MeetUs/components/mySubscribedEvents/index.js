import React from 'react';
import { View, StyleSheet, ImageBackground, Text, ScrollView, Image, TouchableOpacity, ProgressBarAndroid, Alert, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { getSubscribedEvents } from '../../actions/actionEvents';
import Header from '../common/header';
import ButtonBack from '../common/back';

class MySubscribedEvents extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.getSubscribedEvents(this.props.user._id).then(events => {

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
    }

    handleOnPressRow(event){
        this.props.navigation.navigate('Details', {eventID: event._id});
    }

    handleOnClickBack(){
        this.props.navigation.pop();
    }

    renderEvents(){
        return this.props.mySubscribedEvents.map((event, i) => {
            return  <TouchableOpacity key={i} style={styles.row} onPress={this.handleOnPressRow.bind(this, event)}>
                        <View style={styles.containerMainText}>
                            <Text style={styles.textMain}>{event.title}</Text>
                        </View>
                        <View style={styles.container}>
                            <Image style={styles.icon} source={require('../../images/ic_place_black_24dp.png')}/>
                            <Text style={styles.text}>{event.address}</Text>
                        </View>
                        <View style={styles.container}>
                            <Image style={styles.icon} source={require('../../images/ic_today_black_24dp.png')}/>
                            <Text style={styles.text}>{event.date}</Text>
                        </View>
                    </TouchableOpacity>
        })
    }

    render(){
        return (
            <View
            style={styles.main}>
                <ImageBackground
                    source={require('../../images/main_background.jpg')} 
                    style={styles.imageBackground}>
                    <Header headerText="MY SUBSCRIBED EVENTS"/>
                    <ButtonBack navigateBack={this.handleOnClickBack.bind(this)}/>
                    <ScrollView style={styles.scrollView}>
                    {
                        (this.props.mySubscribedEvents && this.props.mySubscribedEventsLoaded)
                        &&
                        this.renderEvents()
                    }
                    </ScrollView>
                    {
                        this.props.loading
                        &&
                        <View style={styles.containerLoading}>
                            <ProgressBarAndroid/>
                        </View>
                    }
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    imageBackground: {
        flex: 1,
    },
    scrollView: {
        flex: 1
    },
    row: {
        flex: 1,
        marginTop: 20,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column'
    },
    containerMainText: {
        backgroundColor: "#000080",
    },
    textMain: {
        marginLeft: 20,
        marginRight: 20,
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Helvetica'
    },
    container: {
        height: 40,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        marginLeft: 20,
        resizeMode: 'contain',
        width: 30,
        height: 30,
    },
    text: {
        marginLeft: 10,
        marginRight: 20,
        fontSize: 18,
        fontFamily: 'Helvetica'
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
        mySubscribedEvents: state.eventsReducer.mySubscribedEvents,
        mySubscribedEventsLoaded: state.eventsReducer.mySubscribedEventsLoaded,
        user: state.authenticationReducer.user,
        loading: state.eventsReducer.loading
    };
}
function mapDispatchToProps(dispatch){
    return {
        getSubscribedEvents: (hostID) => dispatch(getSubscribedEvents(hostID))
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MySubscribedEvents)