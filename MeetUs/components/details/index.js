import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { connect } from 'react-redux';

class Details extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <View>
                <ImageBackground
                    source={require('../../images/main_background.jpeg')} 
                    style={styles.imageBackground}>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
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
)(Details)