import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';

class Login extends React.Component{

    constructor(props){
        super(props);
    }

    handleOnPressClickHere(){
        this.props.navigation.navigate("Registration");
    }

    render(){
        return (
            <Image
            source={require('../../images/main_background.jpeg')} 
            style={styles.imageBackground}>
                
            </Image>
        );
    }
}

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        resizeMode: 'cover'
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
)(Login)