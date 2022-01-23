import React from 'react';
import {View} from 'react-native';
import WebView from 'react-native-webview';
import {useRoute,useNavigation} from '@react-navigation/native';
import { customRequest } from '../../functions/request';

export default function  PaymentScreen(){
    const route = useRoute();
    const navigation = useNavigation();

    React.useEffect(()=>{
        console.log(route.params.callbackurl);
    },[])
    
    return (
        <View style={{flex:1}}>
            <WebView source={{uri:route.params.link}} onNavigationStateChange={(webviewStat)=>{
                console.log(webviewStat.url);
                if(webviewStat.url.toString().split('?')[0] === route.params.callbackurl){
                    console.log("yes on the way");
                    // customRequest('setpaid',{'url':route.params.link});
                    navigation.replace('TabNavigation');
                }
            }}/>
        </View>
    )
}