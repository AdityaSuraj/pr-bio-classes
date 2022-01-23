import React from 'react';
import { View ,StatusBar,Text, ScrollView,Image, ActivityIndicator, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import {useNavigation} from '@react-navigation/native';
import { colorPrimary } from '../../../constants/colors';
import { instituteCustomRequest} from '../../../functions/request';
import { width } from '../../../constants/dimensions';

export default function InstituteContentScreen(){
    const navigation = useNavigation();
    let [courses,setCourses] = React.useState(null);
    let [loading,setLoading] = React.useState(true);

    React.useEffect(()=>{
        instituteCustomRequest('contents').then((res)=>{
            console.log(res);
            setLoading(false);
            if(res['data'].length === 0){
                setCourses(
                    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <Image source={require('../../../assets/booklover.png')} style={{height:240,width:260,resizeMode:"contain"}}/>
                        <Text style={{textAlign:"center",fontSize:16}}>You haven't added any{'\n'}content for any courses yet</Text>
                    </View>
                )
            }else{
                setCourses(
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{flex:1,marginHorizontal:6,flexWrap:"wrap",flexDirection:"row",justifyContent:"space-between"}}>
                        {
                            res['data'].map((schedule)=>{
                                return (
                                    <View key={schedule['id']} style={{width:(width - 12) / 2 - 3,elevation:1,borderRadius:5,overflow:"hidden",marginVertical:4,backgroundColor:"white"}}>
                                        <View style={{padding:6}}>
                                            <Icon name="acrobat-reader" size={64} style={{alignSelf:"center",marginVertical:6}}/>
                                            <Text style={{fontSize:18,fontWeight:"bold"}}>{schedule['title']}</Text>
                                            <Text style={{fontSize:14,paddingVertical:4,backgroundColor:"dodgerblue",alignSelf:"flex-start",borderRadius:5,fontWeight:"500",color:"white",paddingHorizontal:6,}}>{schedule['course_name']}</Text>
                                            <View style={{flexDirection:"row",alignItems:"center",marginVertical:4}}>
                                                <Text style={{fontSize:12,fontWeight:"bold"}}>{schedule['date']}</Text>
                                            </View>
                                            <TouchableOpacity onPress={()=>{navigation.navigate('ViewPDFScreen',{title:schedule['title'],path:schedule['file']})}} activeOpacity={0.8}>
                                                <View style={{paddingHorizontal:6,paddingVertical:6,backgroundColor:colorPrimary,justifyContent:"center",alignItems:"center",borderRadius:5}}>
                                                    <Text style={{fontSize:16,color:"white",fontWeight:"bold"}}>Read Now</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
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
                <Text style={{fontSize:20,color:colorPrimary}}>Contents</Text>
                <Icon  name="plus-a" size={24} color={colorPrimary} onPress={()=>{navigation.navigate('AddContentScreen')}}/>
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