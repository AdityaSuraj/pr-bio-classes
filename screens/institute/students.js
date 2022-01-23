import React from 'react';
import { View ,StatusBar,Text, ScrollView,Image, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import { colorPrimary } from '../../constants/colors';
import { instituteCustomRequest} from '../../functions/request';
import { width } from '../../constants/dimensions';

export default function InstituteStudentsScreen(){
    const navigation = useNavigation();
    let [courses,setCourses] = React.useState(null);
    let [loading,setLoading] = React.useState(true);

    React.useEffect(()=>{
        instituteCustomRequest('students').then((res)=>{
            setLoading(false);
            if(res['students'].length === 0){
                setCourses(
                    <View style={{flex:1}} style={{justifyContent:"center",alignItems:"center"}}>
                        <Image source={require('../../assets/booklover.png')} style={{height:240,width:240,resizeMode:"contain"}}/>
                    </View>
                )
            }else{
                setCourses(
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {
                            res['students'].map((student)=>{
                                return (
                                    <View key={student['id']} style={{elevation:1,borderRadius:5,padding:6,overflow:"hidden",marginVertical:2,marginHorizontal:6,backgroundColor:"white"}}>
                                            <View style={{flexDirection:"row"}}>
                                                <Icon name="person" size={44}/>
                                                <View>
                                                    <Text style={{fontWeight:"bold"}}>{student['name']}</Text>
                                                    <Text>{student['email']}</Text>
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
                <Text style={{fontSize:20,color:colorPrimary}}>Students</Text>
                {/* <Icon  name="add" size={24} color={colorPrimary} onPress={()=>{navigation.navigate('AddCourseScreen')}}/> */}
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