import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { participateToEvent } from '../../actions/actionEvents';

class ButtonSubscribe extends React.Component{

    constructor(props){
        super(props);
    }

    handleOnPress(){
        this.props.participateToEvent(this.props.user._id, this.props.event._id);
    }

    render(){
        return (
            <TouchableOpacity style={styles.button} onPress={this.handleOnPress.bind(this)}>
                <Image style={styles.image} source={require('../../images/ic_person_add_white_18dp.png')}/>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        right: 20,
        bottom: 20,
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
        user: state.authenticationReducer.user,
        event: state.eventsReducer.event
    };
}
function mapDispatchToProps(dispatch){
    return {
        participateToEvent: (user_id, event_id) => dispatch(participateToEvent(user_id, event_id))
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ButtonSubscribe)