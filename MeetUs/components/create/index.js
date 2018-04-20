import React from 'react';
import { View, StyleSheet, Dimensions, ImageBackground, Text, ProgressBarAndroid } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TextInputTitle from './textInputTitle';
import TextInputSubtitle from './textInputSubtitle';
import TextInputAddress from './textInputAddress';
import TextInputDate from './textInputDate';
import TextInputDesciption from './textInputDescription';
import ButtonCreate from './buttonCreate';

class Create extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={styles.container}>
                <ImageBackground
                source={require('../../images/main_background.jpg')} 
                style={styles.imageBackground}>
                    <KeyboardAwareScrollView style={styles.scrollView}>
                        <Text style={styles.title} allowFontScaling={false}>CREATE EVENT</Text>                   
                        <TextInputTitle/>
                        <TextInputSubtitle/>
                        <TextInputAddress/>
                        <TextInputDate/>
                        <TextInputDesciption/>
                        <ButtonCreate navigation={this.props.navigation}/>
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
        loading: state.eventsReducer.loading
    };
}
function mapDispatchToProps(dispatch){
    return {
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Create)