import React from 'react';
import { View, StyleSheet, Dimensions, ImageBackground, Text, ProgressBarAndroid } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class Create extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={styles.container}>
            <ImageBackground
            source={require('../../images/main_background.jpeg')} 
            style={styles.imageBackground}>
                <KeyboardAwareScrollView style={styles.scrollView}>
                    <Text style={styles.title} allowFontScaling={false}>MeetUs_create</Text>                   
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