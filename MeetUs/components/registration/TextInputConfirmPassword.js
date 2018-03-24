import React from 'react';
import { View, StyleSheet, TextInput, Text} from 'react-native';
import { connect } from 'react-redux';
import { setConfirmPassword } from '../../actions/ActionRegistration';

class TextInputConfirmPassword extends React.Component{

    constructor(props){
        super(props);
    }

    handleOnChangeText(confirmPassword){
        this.props.setConfirmPassword(confirmPassword);
    }

    render(){
        return (
            <View style={styles.main}>
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    placeholder="Confirm Password"
                    placeholderTextColor={"#A9A9A9"}
                    value={this.props.confirmPassword}
                    onChangeText={this.handleOnChangeText.bind(this)}/>       
                <Text
                    style={styles.textError}>{this.props.confirmPasswordError}</Text> 
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16,
        height: 90
    },
    containerInput: {
       
    },
    input:{
        height: 70,
        borderRadius: 8,
        flex: 1,
        fontWeight: 'bold',
        fontFamily: "Helvetica",
        color: "#FFFFFF",
        backgroundColor: "#FFFFFF22",
        fontSize: 16
    },
    textError: {
        height: 20,
        marginTop: 8,
        fontSize: 16,
        color: '#FF0000'
    }
});

function mapStateToProps (state) {
    return {
        confirmPassword: state.registrationReducer.confirmPassword,
        confirmPasswordError: state.registrationReducer.confirmPasswordError
    };
}
function mapDispatchToProps(dispatch){
    return {
        setConfirmPassword: (confirmPassword) => dispatch(setConfirmPassword(confirmPassword))
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TextInputConfirmPassword)