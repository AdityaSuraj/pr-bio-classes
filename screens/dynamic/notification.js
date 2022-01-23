import React from 'react';
import {View,Image,Text, ScrollView, ActivityIndicator} from 'react-native';
import Header from '../../components/header';
import { colorPrimary } from '../../constants/colors';
import { width } from '../../constants/dimensions';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { customRequest, instituteCustomRequest } from '../../functions/request';
import { getPlainValueFromStorage, getValueFromStorage } from '../../functions/securestorage';
import Icon from 'react-native-vector-icons/MaterialIcons';



export default function NotificationScreen(){
    let [notification,setNotification] = React.useState(null);
    let [loading,setLoading] = React.useState(true);

    React.useEffect(()=>{
        // registerForPushNotificationsAsync().then((token)=>{
        // })
        getPlainValueFromStorage('token').then((tok)=>{
          if(tok === null){
            customRequest("notification").then((data)=>{
              console.log(data);
              setLoading(false);
              if(data['notifications'].length === 0){
                setNotification(
                  <View style={{flex:1,justifyContent:"center"}}>
                      <Image source={require('../../assets/booklover.png')} style={{resizeMode:"contain",height:240,width:width-24}}/>
                      <Text style={{fontWeight:"bold",color:colorPrimary,textAlign:"center",fontSize:16}}>No any notification</Text>
                  </View>
                )
              }else{
                setNotification(
                  <ScrollView showsVerticalScrollIndicator={false}>
                  {
                    data['notifications'].map((noti)=>{
                      return (
                        <View key={noti['id']} style={{backgroundColor:"white",padding:8,marginHorizontal:4,borderRadius:5,marginVertical:2}}>
                          <Text style={{fontSize:18,fontWeight:"bold"}}>{noti['title']}</Text>
                          <Text style={{fontSize:16}}>{noti['content']}</Text>
                          <View style={{flexDirection:"row",alignItems:"center",marginVertical:6}}>
                              <Icon name="schedule" size={18}/>
                              <Text style={{fontWeight:"bold",marginLeft:8,marginRight:16}}>{noti['time']}</Text>
                              <Icon name="today" size={18}/>
                              <Text style={{fontWeight:"bold",marginLeft:8}}>{noti['date']}</Text>
                          </View>
                        </View>
                      )
                    })
                  }
                  </ScrollView>
                )
              }
            })
          }else{
            instituteCustomRequest('notifications').then((res)=>{
              setLoading(false);
              if(res['notifications'].length === 0){
                setNotification(
                  <View style={{flex:1,justifyContent:"center"}}>
                      <Image source={require('../../assets/booklover.png')} style={{resizeMode:"contain",height:240,width:width-24}}/>
                      <Text style={{fontWeight:"bold",color:colorPrimary,textAlign:"center",fontSize:16}}>No any notification</Text>
                  </View>
                )
              }else{
                setNotification(
                  <ScrollView showsVerticalScrollIndicator={false}>
                  {
                    res['notifications'].map((noti)=>{
                      return (
                        <View key={noti['id']} style={{backgroundColor:"white",padding:8,marginHorizontal:4,borderRadius:5,marginVertical:2}}>
                          <Text style={{fontSize:18,fontWeight:"bold"}}>{noti['title']}</Text>
                          <Text style={{fontSize:16}}>{noti['content']}</Text>
                          <View style={{flexDirection:"row",alignItems:"center",marginVertical:6}}>
                              <Icon name="schedule" size={18}/>
                              <Text style={{fontWeight:"bold",marginLeft:8,marginRight:16}}>{noti['time']}</Text>
                              <Icon name="today" size={18}/>
                              <Text style={{fontWeight:"bold",marginLeft:8}}>{noti['date']}</Text>
                          </View>
                        </View>
                      )
                    })
                  }
                  </ScrollView>
                )
              }
            })
          }
        })
        
       
    },[])

    return (
        <View style={{flex:1}}>
            <Header pagename="Notifications" isShowNotiBell={false}/>
            {loading ? 
              <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                <ActivityIndicator size="large" color={colorPrimary}/>
              </View>
            : notification}
        </View> 
    )
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#ff6600',
      });
    }
  
    return token;
  }

