import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

class ButtonAlreadyAccount extends React.Component{

    constructor(props){
        super(props);
    }

    handleOnPressAlreadyAccount(){
        this.props.navigation.navigate("Login");
    }

    render(){
        return (
            <View
            style={styles.main}>
            <Text style={styles.text}>Already have an account?</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={this.handleOnPressAlreadyAccount.bind(this)}>
                    <Text style={styles.text} allowFontScaling={false}>SIGN IN</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        height: 70,
        marginTop: 32,
        marginLeft: 16,
        flexDirection: 'row'
    },
    text: {
        alignSelf: 'center',
        color: "#FFFFFF"
    },
    button: {
        marginLeft: 16,
        height: 70,
        padding: 10,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#FFFFFF",
        backgroundColor: "#FFFFFF22",
        justifyContent: 'center'
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
)(ButtonAlreadyAccount)