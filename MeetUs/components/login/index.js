import React from 'react';
import { View, StyleSheet, Dimensions, ImageBackground, Text, ProgressBarAndroid, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { autoLogin, login } from '../../actions/actionAuthentication';

class Login extends React.Component{

    constructor(props){
        super(props);
        this.props.autoLogin().then(user => {
            this.props.navigation.navigate('Home');
        })
        .catch(error => {

        })

        this.state = {
            email: "",
            emailError: "",
            password: "",
            passwordError: "",
            error: ""
        };
    }

    handleOnChangeEmail(email){
        this.setState({
            email: email
        });
    }

    handleOnChangePassword(password){
        this.setState({
            password: password
        });
    }

    handleOnPressLogin(){

        this.setState({
            emailError: "",
            passwordError: "",
            error: "",
        });

        if (this.state.email == "" || this.state.password == ""){
            if (this.state.email == ""){
                this.setState({
                    emailError: "Please insert email"
                });
            }
            if (this.state.password == ""){
                this.setState({
                    passwordError: "Please insert password"
                })
            } 
        }
        else{
            this.props.login(this.state.email, this.state.password).then((user) => {
                this.props.navigation.navigate("Home");
            })
            .catch((error) => {

                this.setState({
                    error: error
                });
            });

           
        }
    }

    handleOnPressCreateAccount(){
        this.props.navigation.navigate("Registration");
    }

    render(){
        return (
            <View style={styles.container}>
                <ImageBackground
                source={require('../../images/main_background.jpg')} 
                style={styles.imageBackground}>
                    <KeyboardAwareScrollView style={styles.scrollView}>
                        <Text style={styles.title} allowFontScaling={false}>MeetUs</Text>
                        <View
                            style={styles.main}>
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
                        <View
                            style={styles.main}>
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
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                            style={styles.button}
                            onPress={this.handleOnPressLogin.bind(this)}>
                                <Text style={styles.buttonText} allowFontScaling={false}>LOGIN</Text>
                            </TouchableOpacity>
                            <Text style={styles.error}>{this.state.error}</Text>
                        </View>
                        <View style={styles.containerCreateAccount}>
                            <Text style={styles.text}>Don't have an account?</Text>
                            <TouchableOpacity
                            style={styles.button}
                            onPress={this.handleOnPressCreateAccount.bind(this)}>
                                <Text style={styles.text} allowFontScaling={false}>CREATE NEW ACCOUNT</Text>
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
        height: 90,
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
    text: {
        alignSelf: 'center',
        color: "#FFFFFF"
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
    containerCreateAccount: {
        height: 70,
        marginTop: 32,
        marginLeft: 16,
        flexDirection: 'row'
    }
});

function mapStateToProps (state) {
    return {
        loading: state.authenticationReducer.loading,
    };
}
function mapDispatchToProps(dispatch){
    return {
        autoLogin: (callback) => dispatch(autoLogin(callback)),
        login: (email, password) => dispatch(login(email, password))
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)