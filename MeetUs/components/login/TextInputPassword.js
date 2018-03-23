import React from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { connect } from 'react-redux';
import { setPassword } from '../../actions/ActionLogin';

class TextInputPassword extends React.Component{

    constructor(props){
        super(props);
    }

    handleOnChangeText(password){
        this.props.setPassword(password);
      }

    render(){
        return (
            <View
                style={styles.main}>
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    placeholder="Password"
                    placeholderTextColor={"#A9A9A9"}
                    value={this.props.password}
                    onChangeText={this.handleOnChangeText.bind(this)}/>       
                <Text
                    style={styles.textError}>{this.props.passwordError}</Text> 
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
        password: state.loginReducer.password,
        passwordError: state.loginReducer.passwordError
    };
}
function mapDispatchToProps(dispatch){
    return {
        setPassword: (password) => dispatch(setPassword(password))
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TextInputPassword)