import React from 'react';
import { View ,StatusBar,Text, ScrollView,Image, ActivityIndicator, TouchableOpacity,RefreshControl} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import { colorPrimary } from '../../../constants/colors';
import { instituteCustomRequest} from '../../../functions/request';
import { width } from '../../../constants/dimensions';

export default function InstituteScheduleScreen(){
    const navigation = useNavigation();
    let [courses,setCourses] = React.useState(null);
    let [loading,setLoading] = React.useState(true);

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        instituteCustomRequest('schedules').then((res)=>{
            setRefreshing(false);
        });
    }, []);

    function handleClassCompleted(id){
        instituteCustomRequest('setcompleted',{'id':id}).then((res)=>{
            navigation.navigate('InstituteScheduleScreen');
        })
    }

    function handleDeleteSchedule(id){
        instituteCustomRequest('deleteschedule',{'id':id}).then((res)=>{
            navigation.navigate('InstituteScheduleScreen');
        })
    }

    React.useEffect(()=>{
        instituteCustomRequest('schedules').then((res)=>{
            // console.log(res);
            setLoading(false);
            if(res['data'].length === 0){
                setCourses(
                    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <Image source={require('../../../assets/booklover.png')} style={{height:240,width:260,resizeMode:"contain"}}/>
                        <Text style={{textAlign:"center",fontSize:16}}>You haven't created any{'\n'}live classes for any courses yet</Text>
                    </View>
                )
            }else{
                setCourses(
                    <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing}
                    onRefresh={onRefresh}/>}>
                        {
                            res['data'].map((schedule)=>{
                                return (
                                    <View key={schedule['id']} style={{elevation:1,borderRadius:5,overflow:"hidden",marginVertical:4,marginHorizontal:6,backgroundColor:"white"}}>
                                        <Image source={{uri:schedule['thumbnail']}} style={{height:160,width:width-12,resizeMode:"cover"}}/>
                                        <View style={{padding:6}}>
                                            <Text style={{fontSize:18,fontWeight:"bold"}}>{schedule['title']}</Text>
                                            <Text style={{fontSize:15}} numberOfLines={2}>{schedule['description']}</Text>
                                            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginVertical:4}}>
                                                <Text style={{fontSize:16}}>Time: {schedule['classtime']}</Text>
                                                <Text style={{marginLeft:8,fontSize:16}}>Date: {schedule['classdate']}</Text>
                                            </View>
                                            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginVertical:4}}>
                                                <Text style=   {{fontSize:16,backgroundColor:"rgba(125,125,125,0.1)",paddingHorizontal:6,paddingVertical:3,borderRadius:3}}>Duration: {schedule['duration']}</Text>
                                                <Text style={{fontSize:14,fontWeight:"bold",marginLeft:"auto"}}>{schedule['date']}</Text>
                                            </View>
                                            <View style={{flexDirection:"row",alignItems:"center"}}>
                                                <Text style={{marginRight:"auto",textTransform:"uppercase",paddingHorizontal:8,paddingVertical:6,backgroundColor:"rgba(0,0,0,0.1)",borderRadius:3}}>{schedule['status']}</Text>
                                                {
                                                    schedule['status'] !== "completed" ?  
                                                        <TouchableOpacity activeOpacity={0.8} onPress={()=>{navigation.navigate('InstituteJitsiScreen',{'meetingid':schedule['meetingid']})}}>
                                                            <Text style={{marginRight:10,textTransform:"uppercase",paddingHorizontal:8,paddingVertical:6,backgroundColor:"red",color:"white",borderRadius:3}}>Go Live</Text>
                                                        </TouchableOpacity>
                                                    : <View/>
                                                }

                                                {
                                                    schedule['status'] !== "completed" ?  
                                                        <Icon onPress={handleClassCompleted.bind(this,schedule['id'])} style={{marginHorizontal:16}} name="done" size={28} color="black"/>
                                                    : <View/>
                                                }
                                                
                                                <Icon onPress={handleDeleteSchedule.bind(this,schedule['id'])} name="delete" size={28} color="red"/>

                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                )
            }
        })
    },[]);

    return (
        <View style={{flex:1}}>
            <View style={{height:60,backgroundColor:"white",flexDirection:"row",justifyContent:"space-between",alignItems:"center",paddingHorizontal:16,elevation:1}}>
                <StatusBar backgroundColor={colorPrimary}/>
                <Text style={{fontSize:20,color:colorPrimary}}>Class Schedules</Text>
                <Icon  name="add" size={24} color={colorPrimary} onPress={()=>{navigation.navigate('AddScheduleScreen')}}/>
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