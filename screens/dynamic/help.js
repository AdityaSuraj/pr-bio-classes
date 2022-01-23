import React from 'react';
import {View,Text, SafeAreaView,Image, ScrollView,TextInput, TouchableOpacity, ActivityIndicator} from 'react-native';
import Header from '../../components/header';
import { colorPrimary } from '../../constants/colors';
import {LinearGradient} from 'expo-linear-gradient';
import { height, width } from '../../constants/dimensions';
import Icon from 'react-native-vector-icons/Fontisto';
import { getValueFromStorage } from '../../functions/securestorage';
import { customRequest } from '../../functions/request';

const HelpScreen = ()=>{
    let [email,setEmail] = React.useState('');
    let [msg,setMsg] = React.useState(null);
    let [loading,setLoading] = React.useState(false);

    React.useEffect(()=>{
        getValueFromStorage('studentdetail').then((value)=>{
            setEmail(value['email']);
        })
    },[])

    function handleSend(){
        if(msg === "" || msg == null){
            alert('Write something to send!')
        }else{
            setLoading(true);
            customRequest('helpmessage',{'message':msg,'email':email})
            .then((res)=>{
                setLoading(false);
                setMsg("");
                if(res['msg'] == "success"){
                    alert("Message sent successfully");
                }else{
                    alert("Someting went wrong!");
                }
            })
        }
    }

    return (
        <View style={{flex:1,backgroundColor:"rgba(255,165,0,0.05)"}}>
            <Header pagename="Help"/>
            {loading ? 
                <View style={{position:"absolute",top:0,left:0,right:0,bottom:0,alignItems:"center",justifyContent:"center",backgroundColor:"rgba(0,0,0,0.3)"}}>
                    <ActivityIndicator size="large" color={colorPrimary}/>
                </View>
            : <View/>
            }
            <ScrollView >
                <View style={{paddingHorizontal:12,paddingVertical:12}}>
                    <View style={{flexDirection:"row",alignItems:"center",padding:6,borderRadius:5,borderWidth:1,borderColor:"gray"}}>
                        <Icon name="person" size={16}/>
                        <TextInput style={{marginLeft:8,flex:1,fontSize:16,color:'black'}} placeholder="example@gmail.com" value={email} editable={false}/>
                    </View>
                    <View style={{flexDirection:"row",alignItems:"center",padding:6,borderRadius:5,borderWidth:1,borderColor:"gray",marginTop:16}}>
                        <TextInput value={msg} style={{marginLeft:6,flex:1,fontSize:16}} placeholder="Message" onChangeText={(val)=>{setMsg(val)}} numberOfLines={9}/>
                    </View>
                    <TouchableOpacity onPress={handleSend} activeOpacity={0.8}>
                        <View style={{paddingHorizontal:16,paddingVertical:8,backgroundColor:colorPrimary,alignSelf:"center",borderRadius:5,marginTop:18}}>
                            <Text style={{fontWeight:"bold",color:"white"}}>SEND</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default HelpScreen;