import React from 'react';
import { View, StyleSheet, ImageBackground, Text } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TextInputEmail from './TextInputEmail';
import TextInputPassword from './TextInputPassword';
import ButtonLogin from './ButtonLogin';

class Login extends React.Component{

    constructor(props){
        super(props);
    }

    handleOnPressClickHere(){
        this.props.navigation.navigate("Registration");
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
                        <ButtonLogin/>
                    </KeyboardAwareScrollView>
                </ImageBackground>
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
)(Login)