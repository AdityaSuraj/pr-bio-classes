import React from 'react';
import {View,Text, Image, TextInput, Button, ActivityIndicator} from 'react-native';
import { colorPrimary } from '../../constants/colors';
import {  width } from '../../constants/dimensions';
import Icon from 'react-native-vector-icons/Fontisto';
import {  rootlink} from '../../constants/link';
import {useNavigation} from '@react-navigation/native';
import { getPlainValueFromStorage, getValueFromStorage, saveInStorage } from '../../functions/securestorage';

const StudentRegistrationScreen = ()=>{
    const navigation = useNavigation();
    let [name,setName] = React.useState('');
    let [email,setEmail] = React.useState('');
    let [phone,setPhone] = React.useState('');
    let [password,setPassword] = React.useState('');
    let [isLoading,setIsLoading] = React.useState(false);

    React.useEffect(()=>{
        getPlainValueFromStorage('studenttoken').then((res)=>{
            if(res !== null && res !== undefined){
                navigation.navigate('TabNavigation');
            }
        })
    },[]);

    function handlePhoneRegistration(){
        if(email.length === 0){
            alert("Please Enter Valid Email Id!")
        }else if(email.split('@').length === 1){
            alert('Invalid Email Id!!!')
        }else{
            setIsLoading(true);
            fetch(`${rootlink}/registration`,{
            method:"POST",
            headers:{
                'Accept':'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({'email':email,'password':password,'name':name,'phone':phone})})
            .then(response => response.json())
            .then((json)=>{
                console.log(json);
                setIsLoading(false);
                if(json['message'] === "success"){
                    saveInStorage('studentname',json['name']);
                    saveInStorage('studenttoken',json['token']);
                    navigation.navigate('TabNavigation')
                }else{
                    alert(json['message']);
                }
            })

        }
    }

    return (
        <View style={{flex:1,backgroundColor:"rgba(255,165,0,0.05)",position:"relative"}}>
            <View style={{margin:10,borderRadius:5,marginTop:40,backgroundColor:"white",alignItems:"center",padding:16}}>
                <Image source={require("../../assets/prlogo.png")} style={{resizeMode:"contain",height:120,width:width,alignSelf:"center"}}/>
                <Text style={{fontSize:20,fontWeight:"bold"}}>Create Your Account</Text>
                <View style={{borderRadius:5,borderWidth:1,borderColor:"gray",width:width-94,paddingHorizontal:12,paddingVertical:8,marginVertical:8,flexDirection:"row",alignItems:"center"}}>
                    <Icon name="person" size={18}/>
                    <TextInput placeholder="Name" style={{fontSize:16,marginLeft:12,flex:1}} onChangeText={(text)=>{setName(text);}} keyboardType="web-search"/>
                </View>
                <View style={{borderRadius:5,borderWidth:1,borderColor:"gray",width:width-94,paddingHorizontal:12,paddingVertical:8,marginVertical:8,flexDirection:"row",alignItems:"center"}}>
                    <Icon name="email" size={18}/>
                    <TextInput placeholder="Email" style={{fontSize:16,marginLeft:12,flex:1}} onChangeText={(text)=>{setEmail(text);}} keyboardType="email-address"/>
                </View>
                <View style={{borderRadius:5,borderWidth:1,borderColor:"gray",width:width-94,paddingHorizontal:12,paddingVertical:8,marginVertical:8,flexDirection:"row",alignItems:"center"}}>
                    <Icon name="phone" size={18}/>
                    <TextInput maxLength={10} placeholder="Phone Number" style={{fontSize:16,marginLeft:12,flex:1}} onChangeText={(text)=>{setPhone(text);}} keyboardType="phone-pad"/>
                </View>
                <View style={{borderRadius:5,borderWidth:1,borderColor:"gray",width:width-94,paddingHorizontal:12,paddingVertical:8,marginVertical:8,flexDirection:"row",alignItems:"center"}}>
                    <Icon name="key" size={18}/>
                    <TextInput placeholder="Password" style={{fontSize:16,marginLeft:12,flex:1}} onChangeText={(text)=>{setPassword(text)}} keyboardType="web-search"/>
                </View>
                <View style={{marginVertical:12}}>
                    <Button title="Create Account" onPress={handlePhoneRegistration} color={colorPrimary}></Button>
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

export default StudentRegistrationScreen;