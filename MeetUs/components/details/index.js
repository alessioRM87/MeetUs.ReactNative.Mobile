import React from 'react';
import { View, StyleSheet, ImageBackground, ProgressBarAndroid, Alert, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Header from '../common/header';
import ButtonBack from '../common/back';
import ButtonSubscribe from './subscribe';
import ButtonUnsubscribe from './unsubscribe';
import EventTitle from './eventTitle';
import EventSubtitle from './eventSubtitle';
import EventDescription from './eventDescription';
import EventMembers from './eventMembers';
import ButtonEditDelete from './editDelete';
import { getEventById, getMembers, setMembers } from '../../actions/actionEvents';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class Details extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){

        this.props.getEventById(this.props.navigation.state.params.eventID).then(event => {

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
        })
    }

    handleOnClickBack(){
        this.props.navigation.pop();
    }

    handleOnClickEdit(){
        this.props.navigation.navigate("Edit");
    }

    renderButtons(){
        var isMember = false;

        if (this.props.user._id != this.props.event.host_id){

            console.log("User is not host: ", this.props.user._id, this.props.event.host_id);

            for (var i = 0; i < this.props.event.members.length; i++){
                if (this.props.user._id == this.props.event.members[i]){
                    isMember = true;
                }
            }
    
            if (isMember){
                return <ButtonUnsubscribe/>
            }
            else{
                return <ButtonSubscribe/>
            }
        }
        else{
            return <ButtonEditDelete navigation={this.props.navigation}/>
        }
    }

    render(){
        return (
            <View style={styles.main}>
                <ImageBackground
                    source={require('../../images/main_background.jpg')} 
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
                        (this.props.event)
                        &&
                        this.renderButtons()
                    }
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
        user: state.authenticationReducer.user,
        event: state.eventsReducer.event,
        loading: state.eventsReducer.loading,
    };
}
function mapDispatchToProps(dispatch){
    return {
        getEventById: (eventID) => dispatch(getEventById(eventID)),
        getMembers: (memberIDs) => dispatch(getMembers(memberIDs)),
        setMembers: (members) => dispatch(setMembers(members))
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Details)