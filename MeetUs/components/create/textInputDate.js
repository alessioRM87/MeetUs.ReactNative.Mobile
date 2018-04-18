import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { connect } from 'react-redux';
import { setDate } from '../../actions/actionEvents';
import DateTimePicker from 'react-native-modal-datetime-picker';

class TextInputDate extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            isDateTimePickerVisible: false,
        }
    }

    handleOnPressDate(){
        this.setState({
            isDateTimePickerVisible: true
        });
    }

    handleOnPress(){
        this.props.setDate(date);
    }

    handleDatePicked(date){
        this.setState({
            isDateTimePickerVisible: false,
        });

        console.log("SELECTED DATE: ", date);

        this.props.setDate(date.toString());
    }

    hideDateTimePicker(){
        this.setState({
            isDateTimePickerVisible: false
        });
    }

    render(){
        return (
            <View style={styles.main}>
                <TouchableOpacity
                style={styles.button}
                onPress={this.handleOnPressDate.bind(this)}>
                    <Text style={styles.text} allowFontScaling={false}>{(this.props.date != "") ? this.props.date : "Choose Date"}</Text>
                </TouchableOpacity>     
                <Text
                    style={styles.textError}>{this.props.dateError}</Text>
                <DateTimePicker
                    mode='datetime'
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked.bind(this)}
                    onCancel={this.hideDateTimePicker.bind(this)}/> 
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
    button:{
        height: 70,
        padding: 10,
        borderWidth: 1,
        borderRadius: 8,
        flex: 1,
        borderColor: "#FFFFFF",
        backgroundColor: "#FFFFFF22",
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        height: 20,
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: 'bold'
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