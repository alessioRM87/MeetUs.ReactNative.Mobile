import React from 'react';
import { View, StyleSheet, TextInput, Text} from 'react-native';
import { connect } from 'react-redux';
import { setFirstName } from '../../actions/ActionAuthentication';

class TextInputFirstName extends React.Component{

    constructor(props){
        super(props);
    }

    handleOnChangeText(firstName){
        this.props.setFirstName(firstName);
    }

    render(){
        return (
            <View style={styles.main}>
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="First Name"
                    placeholderTextColor={"#A9A9A9"}
                    value={this.props.firstName}
                    onChangeText={this.handleOnChangeText.bind(this)}/>       
                <Text
                    style={styles.textError}>{this.props.firstNameError}</Text> 
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
    }
});

function mapStateToProps (state) {
    return {
        firstName: state.authenticationReducer.firstName,
        firstNameError: state.authenticationReducer.firstNameError
    };
}
function mapDispatchToProps(dispatch){
    return {
        setFirstName: (firstName) => dispatch(setFirstName(firstName))
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TextInputFirstName)