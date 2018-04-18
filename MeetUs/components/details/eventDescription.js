import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

class EventDescription extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <View
            style={styles.main}>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
});

function mapStateToProps (state) {
    return {
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