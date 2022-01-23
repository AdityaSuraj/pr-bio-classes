import React from 'react';
import {View,BackHandler,ActivityIndicator} from 'react-native';
import { colorPrimary } from '../../constants/colors';
import { height, width } from '../../constants/dimensions';
import WebView from 'react-native-webview';
import {useRoute,useNavigation} from '@react-navigation/native';
import { Audio } from 'expo-av';
import { Camera } from 'expo-camera';
import { rootlink } from '../../constants/link';

 


const JitsiScreen = ()=>{
    const route = useRoute();
    const navigation = useNavigation();
    const [roomname,setRoomname] = React.useState(null);
    const [loading,setLoading] = React.useState(true); 

    React.useEffect(()=>{
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
                <WebView startInLoadingState={true} renderLoading={loader} source={{uri:`https://meet.jit.si/${roomname}#userInfo.displayName="${'hello'}}"&config.remoteVideoMenu.disableKick=true&config.remoteVideoMenu.disableGrantModerator=true&config.disableProfile=true&config.disableDeepLinking=true&config.disableInitialGUM=true&config.prejoinPageEnabled=false&config.startWithVideoMuted=true&interfaceConfig.TOOLBAR_BUTTONS=%5B%22microphone%22%2C%22chat%22%2C%22camera%22%2C%22raisehand%22%2C%22desktop%22%2C%22tileview%22%2C%22fullscreen%22%2C%22profile%22%2C%22videoquality%22%5D`}} geolocationEnabled={true} mediaPlaybackRequiresUserAction={false} javaScriptEnabled={true}/>
            </View>
        </View>
    )
}

export default JitsiScreen;