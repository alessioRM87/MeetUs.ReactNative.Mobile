import React from 'react';
import { View, StyleSheet, ImageBackground, Text, ScrollView, Image, TouchableOpacity, ProgressBarAndroid} from 'react-native';
import { connect } from 'react-redux';
import { getHostedEvents } from '../../actions/actionEvents';
import Header from '../common/header';
import ButtonBack from '../common/back';

class MyHostedEvents extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.getHostedEvents(this.props.user._id).then(events => {

        })
        .catch(error => {
            
        });
    }

    handleOnPressRow(event){
        this.props.navigation.navigate('Details', {eventID: event._id});
    }

    handleOnClickBack(){
        this.props.navigation.pop();
    }

    renderEvents(){
        return this.props.myHostedEvents.map((event, i) => {
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
                        <View style={styles.container}>
                            <Image style={styles.icon} source={require('../../images/ic_person_black_24dp.png')}/>
                            <Text style={styles.text}>{this.props.user.name}</Text>
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
                <Header headerText="MY HOSTED EVENTS"/>
                <ButtonBack navigateBack={this.handleOnClickBack.bind(this)}/>
                <ScrollView style={styles.scrollView}>
                {
                    (this.props.myHostedEvents && this.props.myHostedEventsLoaded)
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
        myHostedEvents: state.eventsReducer.myHostedEvents,
        myHostedEventsLoaded: state.eventsReducer.myHostedEventsLoaded,
        user: state.authenticationReducer.user,
        loading: state.eventsReducer.loading
    };
}
function mapDispatchToProps(dispatch){
    return {
        getHostedEvents: (hostID) => dispatch(getHostedEvents(hostID))
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyHostedEvents)