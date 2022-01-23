import React from 'react';
import { View ,StatusBar,Text, ScrollView,Image, ActivityIndicator,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import { colorPrimary } from '../../../constants/colors';
import { instituteCustomRequest} from '../../../functions/request';
import { width } from '../../../constants/dimensions';

export default function InstituteVideoScreen(){
    const navigation = useNavigation();
    let [courses,setCourses] = React.useState(null);
    let [loading,setLoading] = React.useState(true);

    React.useEffect(()=>{
        instituteCustomRequest('videos').then((res)=>{
            setLoading(false);
            console.log(res);
            if(res['data'].length === 0){
                setCourses(
                    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <Image source={require('../../../assets/booklover.png')} style={{height:240,width:260,resizeMode:"contain"}}/>
                        <Text style={{textAlign:"center",fontSize:16}}>You haven't added any{'\n'}video of your classes</Text>
                    </View>
                )
            }else{
                setCourses(
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{flex:1,marginHorizontal:6,flexDirection:"row",justifyContent:"space-between",width:width - 12,flexWrap:"wrap"}}>
                        {
                            res['data'].map((video)=>{
                                return (
                                    <TouchableOpacity key={video['id']} onPress={()=>{navigation.navigate('WatchVideoScreen',{videolink:video['video_id']})}} activeOpacity={0.8}>
                                        <View  style={{minHeight:210,width:(width-12)/2 - 3,borderRadius:5,overflow:"hidden",marginVertical:4,backgroundColor:"white"}}>
                                            <Image source={{uri:video['video_link']}} style={{height:120,width:(width-12)/2 - 3,resizeMode:"cover"}}/>
                                            <View style={{flex:1,padding:8,justifyContent:"space-between"}}>
                                                <Text numberOfLines={2} ellipsizeMode="clip">{video['description']}</Text>
                                                <Text style={{paddingHorizontal:6,paddingVertical:4,backgroundColor:"dodgerblue",color:"white",fontSize:12,alignSelf:"flex-start",borderRadius:5}}>{video['course_id']}</Text>
                                                <Text style={{fontSize:12,fontWeight:"700"}}>{video['date']}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                        </View>
                    </ScrollView>
                )
            }
        })
    },[]);

    return (
        <View style={{flex:1}}>
            <View style={{height:60,backgroundColor:"white",flexDirection:"row",justifyContent:"space-between",alignItems:"center",paddingHorizontal:16,elevation:1}}>
                <StatusBar backgroundColor={colorPrimary}/>
                <Text style={{fontSize:20,color:colorPrimary}}>Videos</Text>
                <Icon  name="add" size={24} color={colorPrimary} onPress={()=>{navigation.navigate('AddVideoScreen')}}/>
            </View>
            <View style={{flex:1}}>
                {loading ? 
                    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <ActivityIndicator size="large" color={colorPrimary}/>
                    </View>
                : courses}
            </View>
        </View>
    )
}