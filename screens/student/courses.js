import React from 'react';
import {View,Text, SafeAreaView,Image, ScrollView,TextInput, TouchableOpacity, ActivityIndicator} from 'react-native';
import {useNavigation,useRoute} from '@react-navigation/native';
import { customRequest } from '../../functions/request';
import Header from '../../components/header';
import { colorPrimary } from '../../constants/colors';
import { width } from '../../constants/dimensions';

const StudentCoursesScreen = ()=>{
    const navigation = useNavigation();
    const route = useRoute();
    let [courses,setCourses] = React.useState(null);
    let [loading,setLoading] = React.useState(true);

    function handleFreeCourse(id){
        customRequest('joincourse',{'course_id':id}).then((res)=>{
            console.log(res);
        })
        navigation.navigate('CourseContentScreen',{id:id});
    }

    function handlePurchaseCourse(id,price,name){
        customRequest('createpaymentlink',{'course_id':id,'price':price,'course_name':name}).then((res)=>{
            if(res['msg'] === "success"){
                navigation.navigate('PaymentScreen',{link:res['payment_link'],callbackurl:res['callback_url']});
            }else{
                alert('Something went wrong!!!');
            }
        })
    }

    React.useEffect(()=>{
        customRequest('courses').then((res)=>{
            setLoading(false);
            if(res['courses'].length === 0 ){
                setCourses(
                    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <Text>Currently no any {'\n'}course available</Text>
                    </View>
                )
            }else{
                setCourses(
                    res['courses'].map((course)=>{
                        console.log(course['thumbnail']);
                        return (
                            <TouchableOpacity activeOpacity={0.8} key={course['id']}  onPress={()=>{navigation.navigate('CoursePreviewScreen',{id:course['id'],course:course})}}>
                                <View style={{marginBottom:8,height:200,width:width/2 - 12,borderRadius:5,overflow:"hidden",elevation:1,backgroundColor:"white"}}>
                                    <Image source={{uri:course['thumbnail']}} style={{width:"100%",height:110,resizeMode:"cover"}}/>
                                    <View style={{padding:6}}>
                                        <Text style={{fontSize:18,fontWeight:"bold"}} numberOfLines={1}>{course['name']}</Text>
                                        <Text style={{fontSize:18,fontWeight:"bold"}}>₹{course['sale_price']}<Text style={{textDecorationLine:"line-through",marginLeft:6,fontSize:12}}>₹{course['price']}</Text></Text>
                                        {
                                            course['sale_price'] === 0 ||course['sale_price'] === "0"  ?
                                            <TouchableOpacity activeOpacity={0.8} onPress={handleFreeCourse.bind(this,course['id'])}>
                                                <View style={{backgroundColor:colorPrimary,borderRadius:5,paddingVertical:4,justifyContent:"center",alignItems:"center"}}><Text style={{color:"white",fontWeight:"bold"}}>Join Course</Text></View>
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity activeOpacity={0.8} onPress={handlePurchaseCourse.bind(this,course['id'],course['sale_price'],course['name'])}>
                                                <View style={{backgroundColor:colorPrimary,borderRadius:5,paddingVertical:4,justifyContent:"center",alignItems:"center"}}><Text style={{color:"white",fontWeight:"bold"}}>Buy Now</Text></View>
                                            </TouchableOpacity>
                                        }
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
            <Header pagename="Available Courses"/>
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

export default StudentCoursesScreen;