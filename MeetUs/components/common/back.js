import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';

class ButtonBack extends React.Component{

    constructor(props){
        super(props);
    }

    handleOnPress(){
        this.props.navigateBack();
    }

    render(){
        return (
            <TouchableOpacity style={styles.backButton} onPress={this.handleOnPress.bind(this)}>
                <Image style={styles.backArrow} source={require('../../images/back.jpg')}/>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        height: 60,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center'
      },
      backArrow: {
        height: 60,
        width: 60,
        resizeMode: 'contain'
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
)(ButtonBack)