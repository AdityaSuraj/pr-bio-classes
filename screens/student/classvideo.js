import React from 'react';
import {View,Text, SafeAreaView,Image, ScrollView,TextInput, TouchableOpacity, ActivityIndicator} from 'react-native';
import {useNavigation,useRoute} from '@react-navigation/native';
import { customRequest } from '../../functions/request';
import Header from '../../components/header';
import { colorPrimary } from '../../constants/colors';
import { width } from '../../constants/dimensions';

const StudentClassVideoScreen = ()=>{
    const navigation = useNavigation();
    const route = useRoute();
    let [courses,setCourses] = React.useState(null);
    let [loading,setLoading] = React.useState(true);

    React.useEffect(()=>{
        // console.log(route.params.course);
        customRequest('videos',{'course':route.params.course}).then((res)=>{
            setLoading(false);
            if(res['videos'].length === 0 ){
                setCourses(
                    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <Text>Currently no any {'\n'}vidoes available</Text>
                    </View>
                )
            }else{
                setCourses(
                    res['videos'].map((video)=>{
                        return (
                            <TouchableOpacity activeOpacity={0.8} key={video['video_id']}  onPress={()=>{navigation.navigate('WatchVideoScreen',{videolink:video['video_id'],id:video['id']})}}>
                                <View  style={{minHeight:200,width:(width-12)/2 - 7,borderRadius:5,overflow:"hidden",marginVertical:4,backgroundColor:"white"}}>
                                    <Image source={{uri:video['video_link']}} style={{height:120,width:(width-12)/2 - 3,resizeMode:"cover"}}/>
                                    <View style={{padding:8}}>
                                        <Text numberOfLines={1} ellipsizeMode="clip">{video['description']}</Text>
                                        <Text style={{paddingHorizontal:6,paddingVertical:4,backgroundColor:"dodgerblue",color:"white",fontSize:12,alignSelf:"flex-start",borderRadius:5}}>{video['course_id']}</Text>
                                        <Text style={{fontSize:12,fontWeight:"700"}}>{video['date']}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                )

            }
        });
    },[])

    return (
        <View style={{flex:1}}>
            <Header pagename="Classroom Videos"/>
            {
                loading ? 
                <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                    <ActivityIndicator size="large" color={colorPrimary}/>
                </View>
                :
                <ScrollView >
                    <View style={{padding:8,flexWrap:"wrap",flexDirection:"row",justifyContent:"space-between"}}>
                        {courses}
                    </View>
                </ScrollView>
            }
        </View>
    )
}

export default StudentClassVideoScreen;