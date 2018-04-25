import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { getUserByID } from '../../actions/actionAuthentication';

class EventMembers extends React.Component{

    constructor(props){
        super(props);
    }

    renderMembers(){

        return this.props.event.users.map((member, i) => {
            return <Text key={i} style={styles.text}>{member.name}</Text>
        });
    }

    render(){
        return (
            <View
            style={styles.main}>
                <View style={styles.containerMainText}>
                    <Text style={styles.textMain}>Members</Text>
                </View>

                {
                    (this.props.event)
                    &&
                    this.renderMembers()
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        marginTop: 10,
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
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
    text: {
        marginLeft: 20,
        marginRight: 20,
        fontSize: 18,
        fontFamily: 'Helvetica'
    }
});

function mapStateToProps (state) {
    return {
        event: state.eventsReducer.event,
        memberLoaded: state.eventsReducer.memberLoaded
    };
}
function mapDispatchToProps(dispatch){
    return {
        getUserByID: (userID) => dispatch(getUserByID(userID))
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventMembers)