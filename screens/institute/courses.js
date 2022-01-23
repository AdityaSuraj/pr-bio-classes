import React from 'react';
import { View ,StatusBar,Text, ScrollView,Image, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import { colorPrimary } from '../../constants/colors';
import { instituteCustomRequest} from '../../functions/request';
import { width } from '../../constants/dimensions';

export default function InstituteCoursesScreen(){
    const navigation = useNavigation();
    let [courses,setCourses] = React.useState(null);
    let [loading,setLoading] = React.useState(true);

    React.useEffect(()=>{
        instituteCustomRequest('courses').then((res)=>{
            setLoading(false);
            if(res['data'].length === 0){
                setCourses(
                    <View style={{flex:1}} style={{justifyContent:"center",alignItems:"center"}}>
                        <Image source={require('../../assets/booklover.png')} style={{height:240,width:240,resizeMode:"contain"}}/>
                    </View>
                )
            }else{
                setCourses(
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {
                            res['data'].map((course)=>{
                                return (
                                    <View key={course['id']} style={{elevation:1,borderRadius:5,overflow:"hidden",marginVertical:4,marginHorizontal:6,backgroundColor:"white"}}>
                                        <Image source={{uri:course['thumbnail']}} style={{height:160,width:width-12,resizeMode:"cover"}}/>
                                        <View style={{padding:6}}>
                                            <Text style={{fontSize:18,fontWeight:"bold"}}>{course['name']}</Text>
                                            <Text style={{fontSize:15}} numberOfLines={2}>{course['description']}</Text>
                                            <View style={{flexDirection:"row",alignItems:"center",marginVertical:4}}>
                                                <Text style={{fontSize:16,fontWeight:"bold",textDecorationLine:"line-through"}}>₹{course['price']}</Text>
                                                <Text style={{marginLeft:6,fontSize:24,fontWeight:"bold"}}>₹{course['sale_price']}</Text>
                                                <Text style={{fontSize:16,marginLeft:"auto",backgroundColor:"rgba(125,125,125,0.1)",paddingHorizontal:6,paddingVertical:3,borderRadius:3}}>Duration: {course['duration']}</Text>
                                            </View>
                                            <View style={{flexDirection:"row",alignItems:"center",marginVertical:4}}>
                                                <Text style={{fontSize:14,fontWeight:"bold"}}>Students: {course['students']}</Text>
                                                <Text style={{fontSize:14,fontWeight:"bold",marginLeft:"auto"}}>Created On: {course['date']}</Text>
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
                <Text style={{fontSize:20,color:colorPrimary}}>Courses</Text>
                <Icon  name="add" size={24} color={colorPrimary} onPress={()=>{navigation.navigate('AddCourseScreen')}}/>
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