import React from 'react';
import {View,Text, SafeAreaView,Image, ScrollView,TextInput, TouchableOpacity,ActivityIndicator} from 'react-native';
import Header from '../../../components/header';
import { height, width } from '../../../constants/dimensions';
import * as SecureStore from 'expo-secure-store';
import {useNavigation,useRoute} from '@react-navigation/native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { colorPrimary } from '../../../constants/colors';
import Icon from 'react-native-vector-icons/Fontisto';
import { customRequest } from '../../../functions/request';


function VideoCard(props){
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
                setVideoImg(json['items'][0]['snippet']['thumbnails']['maxres']['url'])
            });
    },[])

    return (
        <View style={{elevation:1,marginHorizontal:4,marginVertical:4,width:(width - 40 )/2,backgroundColor:"white",borderRadius:10}}>
            <Image source={{uri:videoImg == null ? "https://i.ytimg.com/vi/ZYjWfLnqVi8/maxresdefault.jpg" :videoImg}} style={{resizeMode:"cover",height:140,width:(width - 40 )/2,borderTopLeftRadius:10,borderTopRightRadius:10}}/>
            <View style={{flex:1,padding:8}}>
                <Text numberOfLines={2}>{props.description}</Text>
                <View style={{marginTop:4,alignItems:"center"}}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('WatchVideoScreen',{videolink:props.videolink})}}>
                        <View style={{borderRadius:10,paddingHorizontal:16,paddingVertical:6,width:(width - 40 )/2 - 16,backgroundColor:colorPrimary}}>
                            <Text style={{fontWeight:"bold",color:"white",textAlign:"center"}}>Watch</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const WatchVideoScreen = ()=>{
    const navigation = useNavigation();
    const route = useRoute();
    let [loading,setLoading] = React.useState(false);
    let [bookmarked,setBookmarked] = React.useState(false);

    React.useEffect(()=>{
        customRequest('isbookmarked',{'video_id':route.params.id}).then((res)=>{
            console.log(res);
            if(res['data'] === "yes"){
                setBookmarked(true);
            }else{
                setBookmarked(false);
            }
        })
    },[]);

    function handleBookmark(){
        setBookmarked(!bookmarked);
        if(bookmarked){
            customRequest('undobookmark',{'video_id':route.params.id}).then((res)=>{
                console.log(res);
            })
        }else{
            customRequest('dobookmark',{'video_id':route.params.id}).then((res)=>{
                console.log(res);
            })
        }
    }


    return (
        <View style={{flex:1}}>
            <Header pagename="Watch Video"/>
            <View style={{backgroundColor:"transparent",height:130,width:width,position:"absolute",zIndex:10}}/>
            <YoutubePlayer
                        height={200}
                        width={width}
                        play={true}
                        mute={false}
                        videoId={route.params.videolink}
                        initialPlayerParams={{controls:true,showClosedCaptions:false,rel:true,modestbranding:false}}
                        webViewProps={{accessible:false}}
                    /> 
            <TouchableOpacity activeOpacity={0.8} onPress={handleBookmark}>
                <View style={{padding:12,flexDirection:"row",alignItems:"center"}}>
                    <Icon name={bookmarked ? "bookmark-alt" : "bookmark"} size={28}/>
                    <Text style={{marginLeft:16,fontWeight:"bold",fontSize:18,marginBottom:8}}>Bookmark This Videos</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default WatchVideoScreen;