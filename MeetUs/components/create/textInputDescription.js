import React from 'react';
import { View, StyleSheet, TextInput, Text} from 'react-native';
import { connect } from 'react-redux';
import { setDescription } from '../../actions/actionEvents';

class TextInputDescription extends React.Component{

    constructor(props){
        super(props);
    }

    handleOnChangeText(description){
        this.props.setDescription(description);
    }

    render(){
        return (
            <View style={styles.main}>
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="Description"
                    placeholderTextColor={"#A9A9A9"}
                    value={this.props.description}
                    onChangeText={this.handleOnChangeText.bind(this)}/>       
                <Text
                    style={styles.textError}>{this.props.descriptionError}</Text> 
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
        description: state.eventsReducer.description,
        descriptionError: state.eventsReducer.descriptionError
    };
}
function mapDispatchToProps(dispatch){
    return {
        setDescription: (description) => dispatch(setDescription(description))
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TextInputDescription)