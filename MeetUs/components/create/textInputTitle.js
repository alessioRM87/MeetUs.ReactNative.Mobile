import React from 'react';
import { View, StyleSheet, TextInput, Text} from 'react-native';
import { connect } from 'react-redux';
import { setTitle } from '../../actions/actionEvents';

class TextInputTitle extends React.Component{

    constructor(props){
        super(props);
    }

    handleOnChangeText(title){
        this.props.setTitle(title);
    }

    render(){
        return (
            <View style={styles.main}>
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="Title"
                    placeholderTextColor={"#A9A9A9"}
                    value={this.props.title}
                    onChangeText={this.handleOnChangeText.bind(this)}/>       
                <Text
                    style={styles.textError}>{this.props.titleError}</Text> 
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
        title: state.eventsReducer.tile,
        titleError: state.eventsReducer.titleError
    };
}
function mapDispatchToProps(dispatch){
    return {
        setTitle: (title) => dispatch(setTitle(title))
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TextInputTitle)