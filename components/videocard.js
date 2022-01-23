import * as React from 'react'
import { View ,Text,Image, TouchableOpacity} from 'react-native'
import {useRoute,useNavigation} from '@react-navigation/native';
import { colorPrimary } from '../constants/colors';


export default function VideoCard(props){
    const navigation = useNavigation();
    let [videoImg,setVideoImg] = React.useState('');

    React.useEffect(()=>{
        fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${props.videolink}&key=AIzaSyAopYKNjqdlRPNtucp_zxjsFqWwMYe1Xq0`,{method:"GET",
            headers:{
                'Accept':'application/json',
                'Content-Type': 'application/json',
            }})
            .then(response => response.json())
            .then((json)=>{
                setVideoImg(json['items'][0]['snippet']['thumbnails']['standard']['url'])
            });
    },[])

    return (
        <View style={{elevation:1,marginHorizontal:4,width:200,backgroundColor:"white",borderRadius:10}}>
            <Image source={videoImg == null ? require('../assets/logo.png') : {uri:videoImg}} style={{resizeMode:"cover",height:140,width:200,borderTopLeftRadius:10,borderTopRightRadius:10}}/>
            <View style={{flex:1,padding:8}}>
                <Text numberOfLines={2}>{props.description}</Text>
                <View style={{paddingVertical:6,alignItems:"center",flexDirection:"row",justifyContent:"space-between"}}>
                    <Text style={{fontWeight:"bold"}}>{props.date}</Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{navigation.navigate('WatchVideoScreen',{videolink:props.videolink,relatedVideos:props.related})}}>
                        <View style={{borderRadius:10,paddingHorizontal:16,paddingVertical:6,backgroundColor:colorPrimary}}>
                            <Text style={{fontWeight:"bold",color:"white"}}>Watch</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}