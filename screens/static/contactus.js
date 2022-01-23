import React from 'react';
import {View,Text, SafeAreaView,Image, ScrollView,TextInput,Button} from 'react-native';
import Header from '../../components/header';
import { colorPrimary } from '../../constants/colors';
import { width } from '../../constants/dimensions';
import Icon from 'react-native-vector-icons/Fontisto';
import { customRequest } from '../../functions/request';


const ContactUsScreen = ()=>{
    let [name,setName] = React.useState('');
    let [email,setEmail] = React.useState('');
    let [mobile,setMobile] = React.useState('');
    let [query,setQuery] =  React.useState('');

    function handleSendQuery(){
        if(name.length < 3 || email.length < 5 || mobile.length < 10 || query.length < 10){
            alert('Fill All Fields...');
        }else{
            customRequest('query',{
                'name':name,
                'email':email,
                'phone':mobile,
                'message':query,
            }).then((res)=>{
                console.log(res);
                if(res['message'] === 'success' ){
                    alert('Query Send Successfully.');
                }else{
                    alert('Something went wrong!!!');
                }
            });

        }
    }

    return (
        <View style={{flex:1,backgroundColor:"rbga(0,0,255,0.1)"}}>
            <Header pagename="Contact Us"/>
            <ScrollView >
                {/* <Image source={require('../../assets/prlogo.png')} style={{height:120,width:160,resizeMode:"contain"}}/> */}
                <View style={{paddingHorizontal:16,marginBottom:14}}>
                    <Text style={{fontWeight:"bold",fontSize:16,marginTop:12}}>
                        Mail: mail@prbioclasses.com{'\n'}
                        Mobile No: +91-7250578320
                    </Text>
                    <View style={{borderRadius:5,borderWidth:1,borderColor:"gray",width:width-44,paddingHorizontal:12,paddingVertical:8,marginVertical:8,flexDirection:"row",alignItems:"center"}}>
                        <Icon name="person" size={18}/>
                        <TextInput placeholder="Name" style={{fontSize:16,marginLeft:12,flex:1}} onChangeText={(text)=>{setName(text);}} keyboardType="email-address"/>
                    </View>
                    <View style={{borderRadius:5,borderWidth:1,borderColor:"gray",width:width-44,paddingHorizontal:12,paddingVertical:8,marginVertical:8,flexDirection:"row",alignItems:"center"}}>
                        <Icon name="email" size={18}/>
                        <TextInput placeholder="Email" style={{fontSize:16,marginLeft:12,flex:1}} onChangeText={(text)=>{setEmail(text);}} keyboardType="email-address"/>
                    </View>
                    <View style={{borderRadius:5,borderWidth:1,borderColor:"gray",width:width-44,paddingHorizontal:12,paddingVertical:8,marginVertical:8,flexDirection:"row",alignItems:"center"}}>
                        <Icon name="phone" size={18}/>
                        <TextInput placeholder="Mobile" maxLength={10} style={{fontSize:16,marginLeft:12,flex:1}} onChangeText={(text)=>{setMobile(text)}} keyboardType="web-search"/>
                    </View>
                    <View style={{borderRadius:5,borderWidth:1,borderColor:"gray",width:width-44,paddingHorizontal:12,paddingVertical:8,marginVertical:8,flexDirection:"row",alignItems:"center"}}>
                        <Icon name="comment" size={18}/>
                        <TextInput placeholder="Query" style={{fontSize:16,marginLeft:12,flex:1}} numberOfLines={3} onChangeText={(text)=>{setQuery(text)}} keyboardType="web-search"/>
                    </View>
                    <View style={{marginVertical:12,alignSelf:"center"}}>
                        <Button title="Send Message" onPress={handleSendQuery} color={colorPrimary}></Button>
                    </View>
                    
                </View>
            </ScrollView>
        </View>
    )
}

export default ContactUsScreen;