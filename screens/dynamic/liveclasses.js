import React from 'react';
import {View,Text,StatusBar, RefreshControl,ScrollView,Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import Header from '../../components/header';
import { colorPrimary } from '../../constants/colors';
import { height, width } from '../../constants/dimensions';
import Icon from 'react-native-vector-icons/Fontisto';
import {useNavigation} from '@react-navigation/native';
import { rootlink } from '../../constants/link';
import * as SecureStore from 'expo-secure-store';
import { customRequest } from '../../functions/request';


const LiveLectureCard = (props)=>{
    const navigation = useNavigation();
    return (
        <View style={{position:"relative",borderRadius:5,overflow:"hidden",borderColor:"rgba(0,0,0,0.1)",marginVertical:6,elevation:1,backgroundColor:"white"}}>
            <Image source={props.thumb == null ? require('../../assets/keyboard.jpg') :{uri:props.thumb}} style={{height:190,width:"auto",resizeMode:"cover"}}/>
            <Text style={{position:"absolute",top:10,right:10,paddingHorizontal:12,paddingVertical:6,backgroundColor:colorPrimary,color:"white",fontWeight:"bold",borderRadius:6}}>Live</Text>
            <View style={{paddingHorizontal:8,paddingVertical:6}}>
                <Text style={{color:"gray",textTransform:"uppercase"}}>{props.subject == null ? "SUBJECT": props.subject}</Text>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                    <View style={{width: 210,backgroundColor:""}}>
                        <Text style={{fontWeight:"bold",fontSize:16}} numberOfLines={3} ellipsizeMode="clip">{props.description}</Text>
                    </View>
                    <TouchableOpacity onPress={()=>{navigation.navigate('JitsiScreen',{meetingid:props.meetingid})}} activeOpacity={0.8}>
                        <View style={{backgroundColor:colorPrimary,paddingHorizontal:16,paddingVertical:8,borderRadius:50}}>
                            <Text style={{color:"white"}}>Join Now</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Text style={{color:"gray",marginBottom:6,fontSize:12}}>{props.duration} By {props.teacher}</Text>
                <View style={{height:1,backgroundColor:"rgba(0,0,0,0.1)"}}/>
                <View style={{flexDirection:"row",alignItems:"center",marginTop:4}}>
                    <Icon name="clock" color="gray" style={{marginRight:4}}/>
                    <Text style={{fontWeight:"bold",color:"gray"}}>Commence at {props.classtime}</Text>
                </View>
            </View>
        </View>
    )
}


export default function LiveClassesScreen(){
    let [loading,setLoading] = React.useState(true);
    let [classes,setClasses] = React.useState(null);

    React.useEffect(()=>{
        customRequest('allliveclasses').then((res)=>{
            console.log(res['classes']);
            setLoading(false);
            if(res.length === 0){
                setClasses(
                    <View style={{height:height- 88 -16 ,width:width - 16,marginTop:8,backgroundColor:"white",alignItems:"center",justifyContent:"center"}}>
                         <Image source={require('../../assets/video_call.png')} style={{resizeMode:"contain",height:240,width:"100%"}}/>
                        <Text style={{fontWeight:"bold",fontSize:16,textAlign:"right",color:colorPrimary}}>No any live class right Now</Text>
                    </View>
                )
            }else{
                setClasses(
                    res['classes'].map((ele)=>{
                        return (
                            <LiveLectureCard key={ele['id']} meetingid={ele['meetingid']} thumb={ele['thumbnail']} description={ele['description']} duration={ele['duration']} classtime={ele['classtime']} teacher={ele['teacher_name']} subject={ele['subject_name']}/>
                        )
                    })
                )
            }
        })
    },[]);


    return(
        <View style={{flex:1}}>
            <Header pagename="Live Classes"/>
            {loading ?
            <View style={{flex:1,justifyContent:"center"}}>
                <ActivityIndicator size="large" color={colorPrimary}/>
            </View> 
            :
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{paddingHorizontal:8}}>
                    {classes}
                </View>
            </ScrollView>
            }
        </View>
    )
}