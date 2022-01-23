import React from 'react';
import {View,Text,StatusBar, RefreshControl,ScrollView,Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import Header from '../../components/header';
import { colorPrimary } from '../../constants/colors';
import { height, width } from '../../constants/dimensions';
import Icon from 'react-native-vector-icons/Fontisto';
import { rootlink } from '../../constants/link';
import VideoCard from '../../components/videocard';
import * as SecureStore from 'expo-secure-store';
import { customRequest} from '../../functions/request';

async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }
  
async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    return result;
}

const UpcomingLectureCard = (props)=>{

    const [interested,setInterested] = React.useState(null);

    React.useEffect(()=>{
        setInterested(props.interested);
    },[]);

    function handleInterested(){
        customRequest('interested',{'schedule_id':props.id}).then((res)=>{
            if(res['msg'] !== "Already added in your interested list"){
                let cinterested = interested;
                cinterested = cinterested + 1;
                setInterested(cinterested);
            }
            alert(res['msg']);
        })
    }
   
    return (
        <View style={{backgroundColor:"white",borderColor:"rgba(0,0,0,0.1)",elevation:1,borderRadius:5,paddingVertical:8,marginVertical:3}}>
            <View style={{flexDirection:"row",paddingHorizontal:8,paddingBottom:8}}>
                <View style={{width:90,borderRadius:10,alignItems:"center",overflow:"hidden",backgroundColor:"rgba(0,0,0,0.05)"}}>
                    <Image source={props.thumb == null ? require('../../assets/keyboard.jpg') :{uri:props.thumb}} style={{height:70,width:90}}/>
                    <Text style={{color:"dodgerblue",fontWeight:"bold"}}>{props.classtime}</Text>
                </View>
                <View style={{flex:1}}>
                    <Text style={{marginHorizontal:6,fontSize:14,fontWeight:"bold",color:"gray",textTransform:"uppercase"}}>{props.subject == null ? "SUBJECT": props.subject} <Icon name="star"/> {interested} Interested</Text>
                    <Text numberOfLines={2} style={{marginHorizontal:6,fontSize:16,fontWeight:"bold"}}>{props.description}</Text>
                    <Text numberOfLines={2} style={{marginHorizontal:6,fontSize:12,color:"gray"}}>{props.duration} By {props.teacher}</Text>
                </View>
                <Icon onPress={handleInterested} name="bell-alt" size={18} style={{marginLeft:"auto",alignSelf:"flex-start",borderRadius:10,borderColor:"rgba(0,0,0,0.3)",borderWidth:1,padding:6,textAlign:"center"}} color="rgba(0,0,0,0.3)"/>
            </View>
            <View style={{height:1,backgroundColor:"rgba(0,0,0,0.1)"}}/>
            <View style={{flexDirection:"row",alignItems:"center",paddingHorizontal:6,paddingTop:6}}>
                <Icon name="calendar" color="gray"/>
                <Text style={{fontSize:12,marginLeft:6,color:"gray",fontWeight:"bold"}}>{props.date}</Text>
            </View>
        </View>
    )
}

export default function UpcomingClassesScreen(){
    let [loading,setLoading] = React.useState(true);
    let [classes,setClasses] = React.useState(null);


    async function getUpcomingClasses(){

        customRequest('allupcomingclasses').then((res)=>{
            setLoading(false);
            if(res['classes'].length === 0){
                setClasses(
                    <View style={{height:height- 88 ,width:width ,backgroundColor:"white",borderRadius:10,alignItems:"center",justifyContent:"center"}}>
                          <Image source={require('../../assets/upcoming_video.png')} style={{resizeMode:"contain",height:240,width:"100%"}}/>
                        <Text style={{fontWeight:"bold",textAlign:"center",fontSize:16,color:colorPrimary}}>Oops! Currently no any {'\n'}upcoming classes scheduled</Text>
                    </View>
                )
            }else{
                setClasses(
                    res['classes'].map((ele)=>{
                        return (
                            <UpcomingLectureCard key={ele['id']} id={ele['id']} date={ele['date']} interested={ele['interested']} thumb={ele['thumbnail']} description={ele['description']} duration={ele['duration']} classtime={ele['classtime']} teacher={ele['teacher_name']}/>
                        )
                    })
                )
            }
        })
        
    }

    React.useEffect(()=>{
        getUpcomingClasses()
    },[]);

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getUpcomingClasses().then((v)=>{
            setRefreshing(false);
        })
    }, []);


    return(
        <View style={{flex:1}}>
            <Header pagename="Upcoming Classes"/>
            {loading ?
            <View style={{flex:1,justifyContent:"center"}}>
                <ActivityIndicator size="large" color={colorPrimary}/>
            </View> 
            :
            <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing}
            onRefresh={onRefresh}/>}>
                <View style={{paddingHorizontal:4}}>
                    {classes}
                </View>
            </ScrollView>
            }
        </View>
    )
}