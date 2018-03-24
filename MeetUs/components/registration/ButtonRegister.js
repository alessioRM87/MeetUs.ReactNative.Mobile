import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { setEmailError, setFirstNameError, setLastNameError, setPasswordError, setConfirmPasswordError, register } from '../../actions/ActionRegistration';

class ButtonRegister extends React.Component{

    constructor(props){
        super(props);
    }

    handleOnPressRegister(){

        this.props.setEmailError("");
        this.props.setFirstNameError("");
        this.props.setLastNameError("");
        this.props.setPasswordError("");
        this.props.setConfirmPasswordError("");

        if (this.props.email == "" || 
            this.props.firstName == "" ||  
            this.props.lastName == "" || 
            this.props.password == "" || 
            this.props.confirmPassword == ""){

            if (this.props.email == ""){
                this.props.setEmailError("Please insert email");
            }
            if (this.props.firstName == ""){
                this.props.setFirstNameError("Please insert first name");
            }
            if (this.props.lastName == ""){
                this.props.setLastNameError("Please insert last name");
            }
            if (this.props.password == ""){
                this.props.setPasswordError("Please insert password");
            } 
            if (this.props.confirmPassword == ""){
                this.props.setConfirmPasswordError("Please confirm password");
            }
        }
        else if (!this.validateEmail(this.props.email)){
            this.props.setEmailError("The email is not in the correct format");
        }
        else if (this.props.password != this.props.confirmPassword){
            this.props.setConfirmPasswordError("Passwords do not match!");
        }
        else{
            this.props.register(this.props.email, this.props.firstName, this.props.lastName, this.props.password, () => {
                this.props.navigation.navigate("Home");
            });
        }

    }

    validateEmail(email){
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        return reg.test(email);
    }

    render(){
        return (
            <View style={styles.main}>
                <TouchableOpacity
                style={styles.button}
                onPress={this.handleOnPressRegister.bind(this)}>
                    <Text style={styles.text} allowFontScaling={false}>REGISTER</Text>
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
        email: state.registrationReducer.email,
        firstName: state.registrationReducer.firstName,
        lastName: state.registrationReducer.lastName,
        password: state.registrationReducer.password,
        confirmPassword: state.registrationReducer.confirmPassword,
        error: state.registrationReducer.error
    };
}
function mapDispatchToProps(dispatch){
    return {
        setEmailError: (emailError) => dispatch(setEmailError(emailError)),
        setFirstNameError: (firstNameError) => dispatch(setFirstNameError(firstNameError)),
        setLastNameError: (lastNameError) => dispatch(setLastNameError(lastNameError)),
        setPasswordError: (passwordError) => dispatch(setPasswordError(passwordError)),
        setConfirmPasswordError: (confirmPasswordError) => dispatch(setConfirmPasswordError(confirmPasswordError)),
        register: (email, firstName, lastName, password, callback) => dispatch(register(email, firstName, lastName, password, callback))
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ButtonRegister)