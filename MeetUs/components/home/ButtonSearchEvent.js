import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';

class ButtonSearchEvent extends React.Component{

    constructor(props){
        console.log(props);
        super(props);
    }

    handleOnPressLogin(){

        this.props.navigation.navigate("Search");
    }

    render(){
        return (
            <View style={styles.main}>
                <TouchableOpacity
                style={styles.button}
                onPress={this.handleOnPressLogin.bind(this)}>
                    <Text style={styles.text} allowFontScaling={false}>SEARCH EVENT</Text>
                </TouchableOpacity>
                <Text style={styles.error}>{this.props.error}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        height: 90,
        marginTop: 16,
        marginRight: 16,
        marginLeft: 16,
    },
    button: {
        height: 70,
        padding: 10,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#FFFFFF",
        backgroundColor: "#FFFFFF22",
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        height: 20,
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
    error: {
        marginTop: 8,
        color: "#FF0000"
    }
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
)(ButtonSearchEvent)