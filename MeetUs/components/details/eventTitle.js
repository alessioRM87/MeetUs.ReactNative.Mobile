import React from 'react';
import { View, StyleSheet, Image, Text} from 'react-native';
import { connect } from 'react-redux';

class EventTitle extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <View
            style={styles.main}>
                <View style={styles.blueSpace}/>
                <View style={styles.container}>
                    <Image style={styles.icon} source={require('../../images/ic_place_black_24dp.png')}/>
                    <Text style={styles.text}>{(this.props.event) ? this.props.event.address : ""}</Text>
                </View>
                <View style={styles.container}>
                    <Image style={styles.icon} source={require('../../images/ic_today_black_24dp.png')}/>
                    <Text style={styles.text}>{(this.props.event) ? this.props.event.date : ""}</Text>
                </View>
                <View style={styles.container}>
                    <Image style={styles.icon} source={require('../../images/ic_person_black_24dp.png')}/>
                    <Text style={styles.text}>{(this.props.event && this.props.event.host) ? this.props.event.host.name : ""}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column'
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
)(EventTitle)