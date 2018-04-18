import React from 'react';
import { View, StyleSheet, Dimensions, ImageBackground, Text, ProgressBarAndroid, TouchableOpacity, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class Home extends React.Component{

    constructor(props){
        super(props);
    }

    handleOnPressSearchEvent(){
        this.props.navigation.navigate('Search');
    }

    handleOnPressMySubscribedEVents(){

    }

    handleOnPressCreateEvent(){
        this.props.navigation.navigate('Create');
    }

    handleOnPressMyHostedEvents(){
        
    }

    handleOnPressLogout(){
        AsyncStorage.clear(() => {
            this.props.navigation.navigate('Login');
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
                        <TouchableOpacity
                        style={styles.button}
                        onPress={this.handleOnPressSearchEvent.bind(this)}>
                            <Text style={styles.text} allowFontScaling={false}>SEARCH EVENT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={styles.button}
                        onPress={this.handleOnPressMySubscribedEVents.bind(this)}>
                            <Text style={styles.text} allowFontScaling={false}>MY SUBSCRIBED EVENTS</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={styles.button}
                        onPress={this.handleOnPressCreateEvent.bind(this)}>
                            <Text style={styles.text} allowFontScaling={false}>CREATE EVENT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={styles.button}
                        onPress={this.handleOnPressMyHostedEvents.bind(this)}>
                            <Text style={styles.text} allowFontScaling={false}>MY HOSTED EVENTS</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={styles.button}
                        onPress={this.handleOnPressLogout.bind(this)}>
                            <Text style={styles.text} allowFontScaling={false}>LOGOUT</Text>
                        </TouchableOpacity>
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
    button: {
        height: 70,
        marginTop: 16,
        marginRight: 16,
        marginLeft: 16,
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
});

function mapStateToProps (state) {
    return {
    };
}
function mapDispatchToProps(dispatch){
    return {
        logout: (callback) => dispatch(logout(callback))
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)