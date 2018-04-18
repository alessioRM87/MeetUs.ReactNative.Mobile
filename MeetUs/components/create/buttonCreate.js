import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { setTitleError, setSubtitleError, setAddressError, setDateError, setDescriptionError, create } from '../../actions/actionEvents';

class ButtonCreate extends React.Component{

    constructor(props){
        super(props);
    }

    handleOnPressCreate(){

        this.props.setTitleError("");
        this.props.setSubtitleError("");
        this.props.setAddressError("");
        this.props.setDateError("");
        this.props.setDescriptionError("");

        if (this.props.title == "" || 
            this.props.subtitle == "" ||  
            this.props.address == "" || 
            this.props.date == "" || 
            this.props.description == ""){

            if (this.props.title == ""){
                this.props.setTitleError("Please insert title");
            }
            if (this.props.subtitle == ""){
                this.props.setSubtitleError("Please insert subtitle");
            }
            if (this.props.address == ""){
                this.props.setAddressError("Please insert address");
            }
            if (this.props.date == ""){
                this.props.setDateError("Please insert date");
            } 
            if (this.props.description == ""){
                this.props.setDescriptionError("Please insert description");
            }
        }
        else{
            this.props.create(this.props.title, this.props.subtitle, this.props.address, this.props.date, this.props.description, () => {
                this.props.navigation.navigate("Home");
            });
        }

    }

    render(){
        return (
            <View style={styles.main}>
                <TouchableOpacity
                style={styles.button}
                onPress={this.handleOnPressCreate.bind(this)}>
                    <Text style={styles.text} allowFontScaling={false}>CREATE EVENT</Text>
                </TouchableOpacity>
                <Text style={styles.error}>{this.props.error}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        height: 90,
        marginTop: 16,
        marginRight: 16,
        marginLeft: 16,
    },
    button: {
        height: 70,
        padding: 10,
        borderWidth: 1,
        borderRadius: 8,
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
    error: {
        marginTop: 8,
        color: "#FF0000"
    }
});

function mapStateToProps (state) {
    return {
        title: state.eventsReducer.title,
        subTtiel: state.eventsReducer.subtitle,
        address: state.eventsReducer.address,
        date: state.eventsReducer.date,
        description: state.eventsReducer.description,
        error: state.eventsReducer.error
    };
}
function mapDispatchToProps(dispatch){
    return {
        setTitleError: (titleError) => dispatch(setTitleError(titleError)),
        setSubtitleError: (subtitleError) => dispatch(setSubtitleError(subtitleError)),
        setAddressaError: (addressError) => dispatch(setAddressaError(addressError)),
        setDateError: (dateError) => dispatch(setDateError(dateError)),
        setDescriptionError: (dateError) => dispatch(setDescriptionError(dateError)),
        create: (title, subtitle, address, date, description, callback) => dispatch(create(title, subtitle, address, date, description, callback))
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ButtonCreate)