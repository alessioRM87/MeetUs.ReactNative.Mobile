import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

class Header extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.headerText} allowFontScaling={false}>{this.props.headerText}</Text>            
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: "#009800",
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        color: '#FFFFFF',
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Helvetica'
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
)(Header)