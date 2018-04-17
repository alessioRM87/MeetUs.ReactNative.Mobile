import React from 'react';
import { View, StyleSheet, TextInput, Text} from 'react-native';
import { connect } from 'react-redux';
import { setDate } from '../../actions/actionEvents';

class TextInputDate extends React.Component{

    constructor(props){
        super(props);
    }

    handleOnChangeText(date){
        this.props.setDate(date);
    }

    render(){
        return (
            <View style={styles.main}>
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="Date"
                    placeholderTextColor={"#A9A9A9"}
                    value={this.props.date}
                    onChangeText={this.handleOnChangeText.bind(this)}/>       
                <Text
                    style={styles.textError}>{this.props.dateError}</Text> 
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
        date: state.eventsReducer.date,
        dateError: state.eventsReducer.dateError
    };
}
function mapDispatchToProps(dispatch){
    return {
        setDate: (date) => dispatch(setDate(date))
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TextInputDate)