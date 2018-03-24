import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

class ClassName extends React.Component{

    constructor(props){
        super(props);
    }

    handleOnPressCreateAccount(){
        this.props.navigation.navigate("Registration");
    }

    render(){
        return (
            <View
            style={styles.main}>
            <Text style={styles.text}>Don't have an account?</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={this.handleOnPressCreateAccount.bind(this)}>
                    <Text style={styles.text} allowFontScaling={false}>CREATE NEW ACCOUNT</Text>
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
)(ClassName)