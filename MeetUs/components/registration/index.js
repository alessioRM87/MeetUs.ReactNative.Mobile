import React from 'react';
import { View, StyleSheet, Text, ImageBackground, ProgressBarAndroid, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { register } from '../../actions/actionAuthentication'; 

class Registration extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            email: "",
            emailError: "",
            firstName: "",
            firstNameError: "",
            lastName: "",
            lastNameError: "",
            password: "",
            passwordError: "",
            confirmPassword: "",
            confirmPasswordError: "",
            error: ""
        }
    }

    handleOnChangeEmail(email){
        this.setState({
            email: email
        });
    }

    handleOnChangeFirstName(firstName){
        this.setState({
            firstName: firstName
        });
    }

    handleOnChangeLastName(lastName){
        this.setState({
            lastName: lastName
        });
    }

    handleOnChangePassword(password){
        this.setState({
            password: password
        });
    }

    handleOnChangeConfirmPassword(confirmPassword){
        this.setState({
            confirmPassword: confirmPassword
        });
    }

    handleOnPressRegister(){

        this.setState({
            emailError: "",
            firstNameError: "",
            lastNameError: "",
            passwordError: "",
            confirmPasswordError: "",
            error: "", 
        });

        if (this.state.email == "" || 
            this.state.firstName == "" ||  
            this.state.lastName == "" || 
            this.state.password == "" || 
            this.state.confirmPassword == ""){

            if (this.state.email == ""){

                this.setState({
                    emailError: "Please insert email"
                });

            }
            if (this.state.firstName == ""){

                this.setState({
                    firstNameError: "Please insert first name"
                });
            }
            if (this.state.lastName == ""){

                this.setState({
                    lastNameError: "Please insert last name"
                });
            }
            if (this.state.password == ""){

                this.setState({
                    passwordError: "Please insert password"
                });
            } 
            if (this.state.confirmPassword == ""){

                this.setState({
                    confirmPasswordError: "Please confirm password"
                });
            }
        }
        else if (!this.validateEmail(this.state.email)){

            this.setState({
                emailError: "Email is not in the correct format"
            });
        }
        else if (this.state.password != this.state.confirmPassword){

            this.setState({
                confirmPasswordError: "Passwords do not match"
            });
        }
        else{
            this.props.register(this.state.email, this.state.firstName, this.state.lastName, this.state.password).then((user) => {
                this.props.navigation.navigate("Home");
            })
            .catch(error => {
                this.setState({
                    error: error
                });
            })
        }

    }

    validateEmail(email){
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        return reg.test(email);
    }

    handleOnPressAlreadyAccount(){
        this.props.navigation.navigate("Login");
    }

    render(){
        return (
            <View style={styles.container}>
                <ImageBackground
                source={require('../../images/main_background.jpg')} 
                style={styles.imageBackground}>
                    <KeyboardAwareScrollView style={styles.scrollView}>
                        <Text style={styles.title} allowFontScaling={false}>MeetUs</Text>
                        <View style={styles.main}>
                            <TextInput
                                style={styles.input}
                                autoCapitalize="none"
                                placeholder="Email"
                                placeholderTextColor={"#A9A9A9"}
                                value={this.state.email}
                                onChangeText={this.handleOnChangeEmail.bind(this)}/>       
                            <Text
                                style={styles.textError}>{this.state.emailError}</Text> 
                        </View>
                        <View style={styles.main}>
                            <TextInput
                                style={styles.input}
                                autoCapitalize="none"
                                placeholder="First Name"
                                placeholderTextColor={"#A9A9A9"}
                                value={this.state.firstName}
                                onChangeText={this.handleOnChangeFirstName.bind(this)}/>       
                            <Text
                                style={styles.textError}>{this.state.firstNameError}</Text> 
                        </View>
                        <View style={styles.main}>
                            <TextInput
                                style={styles.input}
                                autoCapitalize="none"
                                placeholder="Last Name"
                                placeholderTextColor={"#A9A9A9"}
                                value={this.state.lastName}
                                onChangeText={this.handleOnChangeLastName.bind(this)}/>       
                            <Text
                                style={styles.textError}>{this.state.lastNameError}</Text> 
                        </View>
                        <View style={styles.main}>
                            <TextInput
                                style={styles.input}
                                autoCapitalize="none"
                                secureTextEntry={true}
                                placeholder="Password"
                                placeholderTextColor={"#A9A9A9"}
                                value={this.state.password}
                                onChangeText={this.handleOnChangePassword.bind(this)}/>       
                            <Text
                                style={styles.textError}>{this.state.passwordError}</Text> 
                        </View>
                        <View style={styles.main}>
                            <TextInput
                                style={styles.input}
                                autoCapitalize="none"
                                secureTextEntry={true}
                                placeholder="Confirm Password"
                                placeholderTextColor={"#A9A9A9"}
                                value={this.state.confirmPassword}
                                onChangeText={this.handleOnChangeConfirmPassword.bind(this)}/>       
                            <Text
                                style={styles.textError}>{this.state.confirmPasswordError}</Text> 
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                            style={styles.button}
                            onPress={this.handleOnPressRegister.bind(this)}>
                                <Text style={styles.buttonText} allowFontScaling={false}>REGISTER</Text>
                            </TouchableOpacity>
                            <Text style={styles.error}>{this.state.error}</Text>
                        </View>
                        <View style={styles.containerSignIn}>
                            <Text style={styles.text}>Already have an account?</Text>
                            <TouchableOpacity
                            style={styles.button}
                            onPress={this.handleOnPressAlreadyAccount.bind(this)}>
                                <Text style={styles.text} allowFontScaling={false}>SIGN IN</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAwareScrollView>
                </ImageBackground>
                {
                    this.props.loading
                    &&
                    <View style={styles.containerLoading}>
                        <ProgressBarAndroid/>
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollView: {
        flex: 1
    },
    imageBackground: {
        flex: 1,
    },
    title:{
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 15,
        fontFamily: 'Helvetica'
    },
    containerLoading: {
        left: 0,
        top: 0,
        bottom: 0,
        right: 0, 
        position: 'absolute',
        backgroundColor: 'black',
        opacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
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
    },
    buttonContainer: {
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
    buttonText: {
        height: 20,
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
    error: {
        marginTop: 8,
        color: "#FF0000"
    },
    containerSignIn: {
        height: 70,
        marginTop: 32,
        marginLeft: 16,
        flexDirection: 'row'
    },
    text: {
        alignSelf: 'center',
        color: "#FFFFFF"
    },
    
});

function mapStateToProps (state) {
    return {
        loading: state.authenticationReducer.loading
    };
}
function mapDispatchToProps(dispatch){
    return {
        register: (email, firstName, lastName, password) => dispatch(register(email, firstName, lastName, password))
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Registration)