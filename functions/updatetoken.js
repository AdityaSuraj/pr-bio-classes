import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { customRequest } from './request';
import { getValueFromStorage } from './securestorage';


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

export default function updatetoken(){
    getValueFromStorage('studentdetail').then((val)=>{
        registerForPushNotificationsAsync().then((token)=>{
            customRequest('updatetoken',{'token':token,'user_id':val['id']}).then((res)=>{
                
            })
        })
    })
}