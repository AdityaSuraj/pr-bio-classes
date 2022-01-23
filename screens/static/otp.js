import React from 'react';
import {View,Text, Image, TextInput, Button, ActivityIndicator} from 'react-native';
import Header from '../../components/header';
import { colorPrimary } from '../../constants/colors';
import {LinearGradient} from 'expo-linear-gradient';
import { height, width } from '../../constants/dimensions';
import Icon from 'react-native-vector-icons/Fontisto';
import { rootlink } from '../../constants/link';
import {useNavigation} from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  return result;
}

const OtpScreen = ()=>{
    const navigation = useNavigation();
    let [phone,setPhone] = React.useState('');
    let [isLoading,setIsLoading] = React.useState(false);
    let [otp,setOtp] = React.useState('');

    React.useEffect(()=>{
        getValueFor('phone').then((value)=>{
            setPhone(value);
        })
    },[]);

    function handlePhoneRegistration(){
        if(otp.length === 0){
            alert("Please Enter Valid OTP")
        }else if(otp.length < 3){
            alert('Enter 4 Digit Pin')
        }else{
            setIsLoading(true);
            fetch(`${rootlink}/verifyotp`,{method:"POST",
            mode:"same-origin",
            credentials:'same-origin',
            headers:{
                'Accept':'application/json',
                'Content-Type': 'application/json',
            }
            ,body:JSON.stringify({'phone':phone,'otp':otp})})
            .then(response => response.json())
            .then((json)=>{
                setIsLoading(false);
                console.log(json);
                if(json['msg'] === "success"){
                    save('studentid',json['data']['id'].toString());
                    save('studentdetail',JSON.stringify(json['data']));
                    save("otpended","yes");
                    if(json['screen'] == "detail"){
                        save('detailended','yes');
                        save('schools',JSON.stringify(json['schools']));
                        navigation.navigate('StudentDetailScreen');
                    }else{
                        navigation.navigate('TabNavigation');
                    }
                }else{
                    alert('Invalid Pin');
                }
            })
        }
    }

    return (
        <View style={{flex:1,backgroundColor:"rgba(255,165,0,0.05)",position:"relative"}}>
            <View style={{margin:10,borderRadius:5,backgroundColor:"white",alignItems:"center",padding:16}}>
                <Image source={require("../../assets/logo.png")} style={{resizeMode:"contain",height:120,width:width,alignSelf:"center"}}/>
                <Text style={{fontSize:18,fontWeight:"bold"}}>Enter 4 Digit Pin</Text>
                <View style={{borderRadius:5,borderWidth:1,borderColor:"gray",width:width-94,paddingHorizontal:12,paddingVertical:8,marginVertical:8,flexDirection:"row",alignItems:"center"}}>
                    <Icon name="passport" size={18}/>
                    <TextInput placeholder="Enter pin" style={{fontSize:16,marginLeft:12,flex:1}} onChangeText={(text)=>{setOtp(text);}} keyboardType="number-pad" maxLength={4}/>
                </View>
                <View style={{marginVertical:12}}>
                    <Button title="Submit" onPress={handlePhoneRegistration} color={colorPrimary}></Button>
                </View>
            </View>
            {isLoading ? 
            <View style={{position:"absolute",top:0,left:0,right:0,bottom:0,alignItems:"center",justifyContent:"center",backgroundColor:"rgba(0,0,0,0.2)"}}>
                <ActivityIndicator size='large' color={colorPrimary}/>
            </View> 
            : <View/> 
            }
        </View>
    )
}

export default OtpScreen;