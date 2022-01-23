import React from 'react';
import {View,Text, SafeAreaView,Image, ScrollView, TextInput, Button, ActivityIndicator, TouchableOpacity} from 'react-native';
import Header from '../../components/header';
import { colorPrimary } from '../../constants/colors';
import {LinearGradient} from 'expo-linear-gradient';
import { height, width } from '../../constants/dimensions';
import Icon from 'react-native-vector-icons/Fontisto';
import { instituteRootlink, rootlink} from '../../constants/link';
import {useNavigation} from '@react-navigation/native';
import { deleteFromStorage, getPlainValueFromStorage, saveInStorage } from '../../functions/securestorage';

const StudentForgetPasswordScreen = ()=>{
    const navigation = useNavigation();
    let [email,setEmail] = React.useState('');
    let [password,setPassword] = React.useState('');
    let [isLoading,setIsLoading] = React.useState(false);

    React.useEffect(()=>{
        deleteFromStorage('studenttoken');
        getPlainValueFromStorage('studenttoken').then((res)=>{
            if(res !== null && res !== undefined){
                navigation.replace('TabNavigation');
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
            fetch(`${rootlink}/forgetpassword`,{method:"POST",
            headers:{
                'Accept':'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({'email':email})})
            .then(response => response.json())
            .then((json)=>{
                console.log(json);
                setIsLoading(false);
                if(json['message'] === "success"){
                    alert(json['data']);
                }else{
                    alert(json['data']);
                }
            })

        }
    }

    return (
        <View style={{flex:1,backgroundColor:"rgba(255,165,0,0.05)",position:"relative"}}>
            <View style={{margin:10,borderRadius:5,marginTop:40,backgroundColor:"white",alignItems:"center",padding:16}}>
                <Image source={require("../../assets/prlogo.png")} style={{resizeMode:"contain",height:120,width:width,alignSelf:"center"}}/>
                <Text style={{fontSize:20,fontWeight:"bold"}}>Forget Password</Text>
               
                <View style={{borderRadius:5,borderWidth:1,borderColor:"gray",width:width-94,paddingHorizontal:12,paddingVertical:8,marginVertical:8,flexDirection:"row",alignItems:"center"}}>
                    <Icon name="email" size={18}/>
                    <TextInput placeholder="Email" style={{fontSize:16,marginLeft:12,flex:1}} onChangeText={(text)=>{setEmail(text);}} keyboardType="email-address"/>
                </View>
                {/* <View style={{borderRadius:5,borderWidth:1,borderColor:"gray",width:width-94,paddingHorizontal:12,paddingVertical:8,marginVertical:8,flexDirection:"row",alignItems:"center"}}>
                    <Icon name="key" size={18}/>
                    <TextInput placeholder="Password" style={{fontSize:16,marginLeft:12,flex:1}} onChangeText={(text)=>{setPassword(text)}} keyboardType="web-search"/>
                </View> */}
                <View style={{marginVertical:12}}>
                    <Button title="Verify" onPress={handlePhoneRegistration} color={colorPrimary}></Button>
                </View>
                {/* <TouchableOpacity onPress={()=>{navigation.navigate('StudentRegistrationScreen')}}>
                    <Text style={{fontWeight:"bold"}}>New User? Create Account Here</Text>
                </TouchableOpacity> */}
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

export default StudentForgetPasswordScreen;