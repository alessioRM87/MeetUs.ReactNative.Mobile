import React from 'react';
import { View, StyleSheet, Dimensions, ImageBackground, Text, ProgressBarAndroid, TextInput, TouchableOpacity, AsyncStorage, Alert } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from '../common/header';
import ButtonBack from '../common/back';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { validateAddress, create } from '../../actions/actionEvents';

class Create extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            title: "",
            titleError: "",
            subtitle: "",
            subtitleError: "",
            description: "",
            descriptionError: "",
            address: "",
            addressError: "",
            date: "",
            dateError: "",
            error: "",
            isDateTimePickerVisible: false,
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

    handleOnClickBack(){
        this.props.navigation.pop();
    }

    handleOnPressCreate(){

        this.setState({
            titleError: "",
            subtitleError: "",
            descriptionError: "",
            addressError: "",
            dateError: "",
            error: ""
        });

        if (this.state.title == "" || 
            this.state.subtitle == "" ||  
            this.state.address == "" || 
            this.state.date == "" || 
            this.state.description == ""){

            if (this.state.title == ""){
                this.setState({
                    titleError: "Please insert title"
                });
            }
            if (this.state.subtitle == ""){
                this.setState({
                    subtitleError: "Please insert subtitle"
                });
            }
            if (this.state.address == ""){
                this.setState({
                    addressError: "Please insert address"
                });
            }
            if (this.state.date == ""){
                this.setState({
                    dateError: "Please choose date"
                });
            } 
            if (this.state.description == ""){
                this.setState({
                    descriptionError: "Please insert description"
                });
            }
        }
        else{

            this.props.validateAddress(this.state.address)
            .then(result => {
                let createRequest = {
                    user: this.props.user,
                    host_id: this.props.user._id,
                    title: this.state.title,
                    subtitle: this.state.subtitle,
                    description: this.state.description,
                    date: this.state.date,
                    address: result.address,
                    latitude: result.latitude,
                    longitude: result.longitude
                };

                this.props.create(createRequest)
                .then(event => {
                    this.props.navigation.pop(); 
                })
                .catch(error => {

                    if (error.response.status == 401){

                        Alert.alert(
                            'USER NOT LOGGED IN',
                            'You will be redirected to the login page',
                            [
                            {text: 'OK', onPress: () => {
                                AsyncStorage.clear(() => {
                                    this.props.navigation.navigate('Login');
                                });
                            }},
                            ],
                            { cancelable: false }
                        )
                    }
                    else{
                        this.setState({
                            error: "Error creating event: please try again"
                        });
                    }
                });
            })
            .catch(() => {
                this.setState({
                    addressError: "Error finding correct address"
                });
            })
        }

    }

    render(){
        return (
            <View style={styles.container}>
                <ImageBackground
                source={require('../../images/main_background.jpg')} 
                style={styles.imageBackground}>
                    <Header headerText="CREATE EVENT"/>
                    <ButtonBack navigateBack={this.handleOnClickBack.bind(this)}/>
                    <KeyboardAwareScrollView style={styles.scrollView}>
                        <View style={styles.main}>
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
                        <View style={styles.main}>
                            <TextInput
                                style={styles.input}
                                autoCapitalize="none"
                                placeholder="Subtitle"
                                placeholderTextColor={"#A9A9A9"}
                                value={this.state.subtitle}
                                onChangeText={this.handleOnChangeSubtitle.bind(this)}/>       
                            <Text
                                style={styles.textError}>{this.state.subtitleError}</Text> 
                        </View>
                        <View style={styles.main}>
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
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                            style={styles.button}
                            onPress={this.handleOnPressDate.bind(this)}>
                                <Text style={styles.buttonText} allowFontScaling={false}>{(this.state.date != "") ? this.state.date : "Choose Date"}</Text>
                            </TouchableOpacity>     
                            <Text
                                style={styles.textError}>{this.state.dateError}</Text>
                            <DateTimePicker
                                mode='datetime'
                                isVisible={this.state.isDateTimePickerVisible}
                                onConfirm={this.handleDatePicked.bind(this)}
                                onCancel={this.hideDateTimePicker.bind(this)}/> 
                        </View>
                        <View style={styles.main}>
                            <TextInput
                                multiline={true}
                                style={styles.input}
                                autoCapitalize="none"
                                placeholder="Description"
                                placeholderTextColor={"#A9A9A9"}
                                value={this.state.description}
                                onChangeText={this.handleOnChangeDescription.bind(this)}/>       
                            <Text
                                style={styles.textError}>{this.props.descriptionError}</Text> 
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                            style={styles.button}
                            onPress={this.handleOnPressCreate.bind(this)}>
                                <Text style={styles.buttonText} allowFontScaling={false}>CREATE EVENT</Text>
                            </TouchableOpacity>
                            <Text style={styles.textError}>{this.state.error}</Text>
                        </View>
                    </KeyboardAwareScrollView>
                </ImageBackground>
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
        color: '#FFFFFF',
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
    },
    buttonContainer: {
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
    buttonText: {
        height: 20,
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
});

function mapStateToProps (state) {
    return {
        loading: state.eventsReducer.loading,
        user: state.authenticationReducer.user
    };
}
function mapDispatchToProps(dispatch){
    return {
        validateAddress: (address) => dispatch(validateAddress(address)),
        create: (createRequest) => dispatch(create(createRequest))
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Create)