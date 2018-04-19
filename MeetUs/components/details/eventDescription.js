import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';

class EventDescription extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <View
            style={styles.main}>
                <View style={styles.containerMainText}>
                    <Text style={styles.textMain}>Description</Text>
                </View>     
                <Text style={styles.text}>{(this.props.event) ? this.props.event.description : ""}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        marginTop: 20,
        height: 120,
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
    },
    containerMainText: {
        backgroundColor: "#000080",
    },
    textMain: {
        marginLeft: 20,
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Helvetica'
    },
    text: {
        marginLeft: 20,
        fontSize: 18,
        fontFamily: 'Helvetica'
    }
});

function mapStateToProps (state) {
    return {
        event: state.eventsReducer.event
    };
}
function mapDispatchToProps(dispatch){
    return {
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventDescription)