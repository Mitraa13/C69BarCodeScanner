import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal',
        }
    }
  
    getCameraPermission = async () => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermissions:status==='granted',
            scanned:false,
            buttonState:'clicked',
        })
    }

    handledBarCodeScanned = async({type,data})=>{
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState:'normal'
        })
    }

  render(){
    const hasCameraPermissions = this.state.hasCameraPermissions
    const scanned = this.state.scanned
    const buttonState = this.state.buttonState
    if(buttonState==='clicked' && hasCameraPermissions){
        return(
            <BarCodeScanner
            onBarCodeScanned={
                scanned?
                undefined
                : this.handledBarCodeScanned
            } 
            style={StyleSheet.absoluteFillObject}
            />
        );
    }
    else if(buttonState==='normal'){
       
    return(
        <View style={styles.container}>
            <Text style={styles.text}>
            {hasCameraPermissions===true?this.state.scannedData:"Request for Permission"}
            </Text>                

            <Image 
            style={{width:200, height:200}}
            source={require('../assets/camera.png')}
            />

            <TouchableOpacity
            style={styles.qrButton}
            onPress={this.getCameraPermission}
            title="Bar Code Scanner">
                <Text>Scan QR Code</Text>
            </TouchableOpacity>

        </View>
    );
    }
  }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"pink",
        justifyContent:"center",
        alignItems:"center",
        padding:100,
    },
    qrButton:{
        justifyContent:"center",
        alignItems:"center",
        alignSelf:"center",
        width:100,
        height:100,
        border:"2px solid black",
    },
    text:{
        fontSize:20,
        textAlign:"center",
    }
});
