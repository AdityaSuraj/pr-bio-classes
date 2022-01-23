import React from 'react';
import {View,Text, SafeAreaView,Image, ScrollView, TextInput, Button, ActivityIndicator} from 'react-native';
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

const PhoneRegistrationScreen = ()=>{
    const navigation = useNavigation();
    let [phone,setPhone] = React.useState('');
    let [isLoading,setIsLoading] = React.useState(false);

    React.useEffect(()=>{
        getValueFor('phoneended').then((value)=>{
            if(value === "yes"){
                navigation.navigate('OtpScreen');
            }
        });
    },[]);

    function handlePhoneRegistration(){
        if(phone.length === 0){
            alert("Please Enter Valid Phone Number!")
        }else if(phone.length < 10){
            alert('Invalid Phone Number!!!')
        }else{
            setIsLoading(true);
            // const otp = Math.floor(Math.random() * 9000);
            // fetch(`http://sms.mkwebsolution.com/sms-panel/api/http/index.php?username=Trovelearning&apikey=06EDC-13E02&apirequest=Text&sender=TROVEL&mobile=${phone}&message=Your OTP is ${otp}. Use it to verify your mobile number on Trove Learning APP.&route=TRANS&TemplateID=1207162011575181483&format=JSON`,{method:"GET",
            // headers:{
            //     'Accept':'*/*',
            //     'Content-Type': 'application/json',
            // }})


            fetch(`${rootlink}/registerstudent`,{method:"POST",
            mode:"same-origin",
            credentials:'same-origin',
            headers:{
                'Accept':'application/json',
                'Content-Type': 'application/json',
            }
            ,body:JSON.stringify({'phone':phone})})
            .then(response => response.json())
            .then((json)=>{
                setIsLoading(false);
                if(json['msg'] === "otp sent"){
                    save('phone',phone);
                    save('token',json['token']);
                    navigation.navigate('OtpScreen');
                }else{
                    alert('Someting went wrong!!!');
                }
            })
        }
    }

    return (
        <View style={{flex:1,backgroundColor:"rgba(255,165,0,0.05)",position:"relative"}}>
            <View style={{margin:10,borderRadius:5,backgroundColor:"white",alignItems:"center",padding:16}}>
                <Image source={require("../../assets/logo.png")} style={{resizeMode:"contain",height:120,width:width,alignSelf:"center"}}/>
                <Text style={{fontSize:18,fontWeight:"bold"}}>Enter Phone Number</Text>
                <View style={{borderRadius:5,borderWidth:1,borderColor:"gray",width:width-94,paddingHorizontal:12,paddingVertical:8,marginVertical:8,flexDirection:"row",alignItems:"center"}}>
                    <Icon name="phone" size={18}/>
                    <TextInput placeholder="Phone Number" style={{fontSize:16,marginLeft:12,flex:1}} onChangeText={(text)=>{setPhone(text);}} keyboardType="phone-pad" maxLength={10}/>
                </View>
                <View style={{marginVertical:12}}>
                    <Button title="Proceed" onPress={handlePhoneRegistration} color={colorPrimary}></Button>
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

export default PhoneRegistrationScreen;