import React from 'react';
import {View,Text, SafeAreaView, ScrollView,Image, TouchableOpacity, ActivityIndicator,RefreshControl} from 'react-native';
import Header from '../../components/header';
import { colorPrimary } from '../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { customRequest } from '../../functions/request';
import {useNavigation} from '@react-navigation/native';
import { height, width } from '../../constants/dimensions';


function StudyScreen(){
    const navigation = useNavigation();
    let [courses,setCourses] = React.useState(null);
    let [loading,setLoading] = React.useState(true);

    async function studeypagecontent(){
        customRequest('mycourses').then((res)=>{
            console.log(res);
            setLoading(false);
            if(res['courses'].length === 0 ){
                setCourses(
                    <View style={{flex:1,height:height- 124,justifyContent:"center",alignItems:"center"}}>
                        <Image source={require('../../assets/videocall.png')} style={{height:200,width:width,resizeMode:"contain"}}/>
                        <Text style={{textAlign:"center",fontSize:18,color:colorPrimary}}>You haven't {'\n'} purchased any course yet.</Text>
                    </View>
                )
            }else{
                setCourses(
                    res['courses'].map((course)=>{
                        return (
                            <View  key={Math.random()} style={{marginBottom:8,height:200,width:width/2 - 12,borderRadius:5,overflow:"hidden",elevation:1,backgroundColor:"white"}}>
                                <Image source={{uri:course['thumbnail']}} style={{width:"100%",height:110,resizeMode:"cover"}}/>
                                <View style={{padding:6}}>
                                    <Text style={{fontSize:18,fontWeight:"bold"}} numberOfLines={1}>{course['name']}</Text>
                                    <Text style={{fontSize:18,fontWeight:"bold"}}>₹{course['sale_price']}<Text style={{textDecorationLine:"line-through",marginLeft:6,fontSize:12}}>₹{course['price']}</Text></Text>
                                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{navigation.navigate('CourseContentScreen',{id:course['id'],name:course['name']})}}>
                                        <View style={{backgroundColor:colorPrimary,borderRadius:5,paddingVertical:4,justifyContent:"center",alignItems:"center"}}><Text style={{color:"white",fontWeight:"bold"}}>Explore</Text></View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })
                )

            }
        })
    }

    React.useEffect(()=>{
        studeypagecontent();
    },[])

    
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        studeypagecontent().then((v)=>{
            setRefreshing(false);
        })
    }, []);

    return (
        <View style={{flex:1}}>
            <Header pagename="My Courses"/>
            {
                loading ? 
                <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                    <ActivityIndicator size="large" color={colorPrimary}/>
                </View>
                :
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                    <View style={{padding:8,flexWrap:"wrap",flexDirection:"row",justifyContent:"space-between"}}>
                    {courses}
                    </View>
                </ScrollView>
            }
        </View>
    )
}

export default StudyScreen;