import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import Header from '../common/header';
import ButtonBack from '../common/back';
import EventTitle from './eventTitle';
import { getEventById } from '../../actions/actionEvents';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class Details extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){

        console.log("EVENT ID: ", this.props.navigation.state.params.eventID);

        this.props.getEventById(this.props.navigation.state.params.eventID).then(() => {

        })
        .catch(error => {

        });
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
                    <Header headerText={(this.props.event) ? this.props.event.title : ""}/>
                    <ButtonBack navigateBack={this.handleOnClickBack.bind(this)}/>
                    <EventTitle/>
                    <KeyboardAwareScrollView style={styles.scrollView}>
                    </KeyboardAwareScrollView>
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
});

function mapStateToProps (state) {
    return {
        event: state.eventsReducer.event
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