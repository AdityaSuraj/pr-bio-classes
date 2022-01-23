import React from 'react';
import {View,BackHandler,ActivityIndicator} from 'react-native';
import { colorPrimary } from '../../constants/colors';
import { height, width } from '../../constants/dimensions';
import WebView from 'react-native-webview';
import {useRoute,useNavigation} from '@react-navigation/native';
import { Audio } from 'expo-av';
import { Camera } from 'expo-camera';
import * as SecureStore from 'expo-secure-store';
import { rootlink } from '../../constants/link';
import { instituteCustomRequest } from '../../functions/request';

  
async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    return result;
}


const InstituteJitsiScreen = ()=>{
    const route = useRoute();
    const navigation = useNavigation();
    const [loading,setLoading] = React.useState(true); 
    const [roomname,setRoomname] = React.useState('');

    React.useEffect(()=>{
        instituteCustomRequest('setschedulelive',{'id':route.params.meetingid  }).then((res)=>{
            console.log(res);
        })
        setRoomname(route.params.meetingid);
        Audio.getPermissionsAsync().then((value)=>{
            if(value['granted'] === false){
                Audio.requestPermissionsAsync().then((val)=>{
                    console.log(val);
                })
            }
        });
        Camera.getPermissionsAsync().then((value)=>{
            if(value['granted'] === false ){
                Camera.requestPermissionsAsync().then((val)=>{
                    console.log(val);
                })
            }
        })
        
    },[])

    function loader(){
        return  (
            <View style={{height:height,width:width,flex:1,justifyContent:"center",alignItems:"center",position:"absolute",left:0,right:0,bottom:0,top:0}}>
                <ActivityIndicator color={colorPrimary} size="large"/>
            </View> 
        )
    }

    return (
        <View style={{flex:1,backgroundColor: loading ? "red" :"rgba(255,165,0,0.05)"}}>
            <View style={{flex:1}}>
                <View style={{backgroundColor:"transparent",height:120,width:width/2,position:"absolute",zIndex:10}}/>
                <WebView startInLoadingState={true} renderLoading={loader} source={{uri:`https://meet.jit.si/${roomname}#userInfo.displayName="PR Sir"&config.disableProfile=true&config.disableDeepLinking=true&config.disableInitialGUM=true&config.prejoinPageEnabled=false`}} geolocationEnabled={true} mediaPlaybackRequiresUserAction={false} javaScriptEnabled={true}/>
            </View>
        </View>
    )
}

export default InstituteJitsiScreen;