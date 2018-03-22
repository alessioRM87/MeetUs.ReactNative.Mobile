import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { setEmailError, setPasswordError, login } from '../../actions/ActionLogin';

class ButtonLogin extends React.Component{

    constructor(props){
        super(props);
    }

    handleOnPressLogin(){

        this.props.setEmailError("");
        this.props.setPasswordError("");

        if (this.props.email == "" || this.props.password == ""){
            if (this.props.email == ""){
                this.props.setEmailError("Please insert email");
            }
            if (this.props.password == ""){
                this.props.setPasswordError("Please insert password");
            } 
        }
        else{
            this.props.login(this.props.email, this.props.password, () => {
                this.props.setEmailError("LOGIN SUCCESSFULL!!!");
            });
        }

       
    }

    render(){
        return (
            <View style={styles.main}>
                <TouchableOpacity
                style={styles.button}
                onPress={this.handleOnPressLogin.bind(this)}>
                    <Text style={styles.text} allowFontScaling={false}>LOGIN</Text>
                </TouchableOpacity>
                <Text style={styles.error}>{this.props.error}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        height: 50,
        marginTop: 16,
        marginRight: 16,
        marginLeft: 16,
        marginBottom: 16
    },
    button: {
        flex: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: "#FFFFFF",
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
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
        email: state.loginReducer.email,
        password: state.loginReducer.password,
        error: state.loginReducer.error
    };
}
function mapDispatchToProps(dispatch){
    return {
        setEmailError: (emailError) => dispatch(setEmailError(emailError)),
        setPasswordError: (passwordError) => dispatch(setPasswordError(passwordError)),
        login: (email, password, callback) => dispatch(login(email, password, callback))
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ButtonLogin)