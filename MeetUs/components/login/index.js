import React from 'react';
import { View, StyleSheet, Dimensions, ImageBackground, Text, ProgressBarAndroid } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { autoLogin } from '../../actions/ActionAuthentication';
import TextInputEmail from './TextInputEmail';
import TextInputPassword from './TextInputPassword';
import ButtonLogin from './ButtonLogin';
import ButtonCreateAccount from './ButtonCreateAccount';

class Login extends React.Component{

    constructor(props){
        super(props);
        this.props.autoLogin(() => {
            this.props.navigation.navigate('Home');
        });
    }

    render(){
        return (
            <View style={styles.container}>
                <ImageBackground
                source={require('../../images/main_background.jpeg')} 
                style={styles.imageBackground}>
                    <KeyboardAwareScrollView style={styles.scrollView}>
                        <Text style={styles.title} allowFontScaling={false}>MeetUs</Text>
                        <TextInputEmail/>
                        <TextInputPassword/>
                        <ButtonLogin navigation={this.props.navigation}/>
                        <ButtonCreateAccount navigation={this.props.navigation}/>
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
        color: '#000000',
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
});

function mapStateToProps (state) {
    return {
        loading: state.authenticationReducer.loading
    };
}
function mapDispatchToProps(dispatch){
    return {
        autoLogin: (callback) => dispatch(autoLogin(callback))
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)