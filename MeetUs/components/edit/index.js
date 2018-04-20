import React from 'react';
import { View, StyleSheet, ImageBackground, Text, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { updateEvent } from '../../actions/actionEvents';
import Header from '../common/header';
import ButtonBack from '../common/back';

class Edit extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            title: this.props.event.title,
            titleError: "",
            subTitle: this.props.event.subtitle,
            subTitleError: "",
            description: this.props.event.description,
            descriptionError: "",
            address: this.props.event.address,
            addressError: "",
            date: this.props.event.date,
            dateError: "",
            error: "",
            isDateTimePickerVisible: false
        }
    }

    handleOnChangeTitle(title){
        this.setState({
            title: title
        });
    }

    handleOnChangeSubtitle(subtitle){
        this.setState({
            subtitle: subtitle
        });
    }

    handleOnChangeDescription(description){
        this.setState({
            description: description
        });
    }

    handleOnChangeAddress(address){
        this.setState({
            address: address
        });
    }

    handleOnPressDate(){
        this.setState({
            isDateTimePickerVisible: true
        });
    }

    handleDatePicked(date){
        this.setState({
            isDateTimePickerVisible: false,
            date: date.toString()
        });
    }

    hideDateTimePicker(){
        this.setState({
            isDateTimePickerVisible: false
        });
    }

    handleOnPressEdit(){

    }

    handleOnClickBack(){
        this.props.navigation.pop();
    }

    render(){
        return (
            <View style={styles.container}>
                <ImageBackground
                source={require('../../images/main_background.jpg')} 
                style={styles.imageBackground}>
                    <Header headerText="UPDATE EVENT"/>
                    <ButtonBack navigateBack={this.handleOnClickBack.bind(this)}/>
                    <KeyboardAwareScrollView style={styles.scrollView}>
                        <Text style={styles.title} allowFontScaling={false}>UPDATE EVENT</Text>                   
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                autoCapitalize="none"
                                placeholder="Title"
                                placeholderTextColor={"#A9A9A9"}
                                value={this.state.title}
                                onChangeText={this.handleOnChangeTitle.bind(this)}/>       
                            <Text
                                style={styles.textError}>{this.state.titleError}</Text> 
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                autoCapitalize="none"
                                placeholder="Subtitle"
                                placeholderTextColor={"#A9A9A9"}
                                value={this.state.subtitle}
                                onChangeText={this.handleOnChangeSubtitle.bind(this)}/>       
                            <Text
                                style={styles.textError}>{this.state.subTitleError}</Text> 
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                multiline={true}
                                style={styles.inputDescription}
                                autoCapitalize="none"
                                placeholder="Description"
                                placeholderTextColor={"#A9A9A9"}
                                value={this.state.description}
                                onChangeText={this.handleOnChangeDescription.bind(this)}/>       
                            <Text
                                style={styles.textError}>{this.state.descriptionError}</Text> 
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                autoCapitalize="none"
                                placeholder="Address"
                                placeholderTextColor={"#A9A9A9"}
                                value={this.state.address}
                                onChangeText={this.handleOnChangeAddress.bind(this)}/>       
                            <Text
                                style={styles.textError}>{this.state.addressError}</Text> 
                        </View>
                        <View style={styles.main}>
                            <TouchableOpacity
                            style={styles.button}
                            onPress={this.handleOnPressDate.bind(this)}>
                                <Text style={styles.text} allowFontScaling={false}>{(this.state.date != "") ? this.state.date : "Choose Date"}</Text>
                            </TouchableOpacity>     
                            <Text style={styles.textError}>{this.state.dateError}</Text> 
                        </View>
                        <View style={styles.main}>
                            <TouchableOpacity
                            style={styles.button}
                            onPress={this.handleOnPressEdit.bind(this)}>
                                <Text style={styles.text} allowFontScaling={false}>UPDATE EVENT</Text>
                            </TouchableOpacity>
                            <Text style={styles.error}>{this.state.error}</Text>
                        </View>
                    </KeyboardAwareScrollView>
                </ImageBackground>
                <DateTimePicker
                    mode='datetime'
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked.bind(this)}
                    onCancel={this.hideDateTimePicker.bind(this)}/>
                {
                    this.props.loading
                    &&
                    <View style={styles.containerLoading}>
                        <ProgressBarAndroid/>
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollView: {
        flex: 1
    },
    imageBackground: {
        flex: 1,
    },
    title:{
        color: '#000000',
        textAlign: 'center',
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 15,
        fontFamily: 'Helvetica'
    },
    containerLoading: {
        left: 0,
        top: 0,
        bottom: 0,
        right: 0, 
        position: 'absolute',
        backgroundColor: 'black',
        opacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        flex: 1,
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16,
        height: 90
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
    inputDescription:{
        height: 200,
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
    },
    main: {
        flex: 1,
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16,
        height: 90
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
    error: {
        marginTop: 8,
        color: "#FF0000"
    }
});

function mapStateToProps (state) {
    return {
        event: state.eventsReducer.event,
        loading: state.eventsReducer.loading
    };
}
function mapDispatchToProps(dispatch){
    return {
        updateEvent: (updateRequest) => dispatch(updateEvent(updateRequest))
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Edit)