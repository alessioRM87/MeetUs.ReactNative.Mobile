import React from 'react';
import { View, StyleSheet, ImageBackground, ProgressBarAndroid } from 'react-native';
import { connect } from 'react-redux';
import Header from '../common/header';
import ButtonBack from '../common/back';
import EventTitle from './eventTitle';
import EventSubtitle from './eventSubtitle';
import EventDescription from './eventDescription';
import EventMembers from './eventMembers';
import { getEventById } from '../../actions/actionEvents';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class Details extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){

        this.props.getEventById(this.props.navigation.state.params.eventID);
    }

    handleOnClickBack(){
        this.props.navigation.pop();
    }

    render(){
        return (
            <View style={styles.main}>
                <ImageBackground
                    source={require('../../images/main_background.jpeg')} 
                    style={styles.imageBackground}>
                    <Header headerText={(this.props.event) ? this.props.event.title.toUpperCase() : ""}/>
                    <ButtonBack navigateBack={this.handleOnClickBack.bind(this)}/>
                    <KeyboardAwareScrollView style={styles.scrollView}>
                        <EventTitle/>
                        <EventSubtitle/>
                        <EventDescription/>
                        <EventMembers/>
                    </KeyboardAwareScrollView>
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
    scrollView: {
        flex: 1
    },
    imageBackground: {
        flex: 1,
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
        event: state.eventsReducer.event,
        loading: state.eventsReducer.loading
    };
}
function mapDispatchToProps(dispatch){
    return {
        getEventById: (eventID) => dispatch(getEventById(eventID))
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Details)