import React from 'react';
import * as Permissions from 'expo-permissions';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class Booktransaction extends React.Component{
    constructor(){
        super()
        this.state={
            hasCameraPermissions: null,
            scannedState: false,
            scannedData: '',
            buttonState: 'normal',
        }
    }

    getCameraPermissions = async() =>{
      const {status} = await Permissions.askAsync(Permissions.CAMERA)
      this.setState({
        hasCameraPermissions: status === "granted"
      })
    }

    handleBarcodeScanned = async({type,data}) =>{
      this.setState({
        scannedState: true,
      scannedData: data,
      buttonState: 'clicked',
      })
    }

    render(){
    const hasCameraPermissions = this.state.hasCameraPermissions
    const scanned = this.state.scannedState
    const buttonState = this.state.buttonState
    if(buttonState === "clicked" && hasCameraPermissions){
      return(
        <BarCodeScanner onBarCodeScanned= {scanned?undefined :this.handleBarcodeScanned}/>
      )
      }
    else if(buttonState === "normal"){
      return(<View styles = {styles.container}>
        <Text> {hasCameraPermissions === true? this.state.scannedData: "request camera permission"} </Text>
    <TouchableOpacity styles = {styles.scanButton} onPress = {this.getCameraPermissions}>
        <Text styles={styles.buttonText}> Scan the QR code </Text>
    </TouchableOpacity>      )
    </View>
    )}
    }
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 20,
    }
  });