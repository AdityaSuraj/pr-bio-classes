import React from 'react';
import {View,Text, RefreshControl,ScrollView,Image, TouchableOpacity, ActivityIndicator,Modal} from 'react-native';
import Header from '../../../components/header';
import { colorPrimary } from '../../../constants/colors';
import { height, width } from '../../../constants/dimensions';
import Icon from 'react-native-vector-icons/Fontisto';
import {useNavigation,useRoute} from '@react-navigation/native';
import { customRequest } from '../../../functions/request';


const LiveLectureCard = (props)=>{
    const navigation = useNavigation();
    return (
        <View style={{position:"relative",borderRadius:5,overflow:"hidden",borderColor:"rgba(0,0,0,0.1)",marginVertical:6,elevation:1,backgroundColor:"white"}}>
            <Image source={props.thumb == null ? require('../../../assets/keyboard.jpg') :{uri:props.thumb}} style={{height:190,width:"auto",resizeMode:"cover"}}/>
            <Text style={{position:"absolute",top:10,right:10,paddingHorizontal:12,paddingVertical:6,backgroundColor:colorPrimary,color:"white",fontWeight:"bold",borderRadius:6}}>Live</Text>
            <View style={{paddingHorizontal:8,paddingVertical:6}}>
                <Text style={{color:"gray",textTransform:"uppercase"}}>{props.subject == null ? "SUBJECT": props.subject}</Text>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                    <View style={{width: 210,backgroundColor:""}}>
                        <Text style={{fontWeight:"bold",fontSize:16}} numberOfLines={3} ellipsizeMode="clip">{props.description}</Text>
                    </View>
                </View>
                <Text style={{color:"gray",marginBottom:6,fontSize:12}}>{props.duration} By {props.teacher}</Text>
                <View style={{height:1,backgroundColor:"rgba(0,0,0,0.1)"}}/>
                <View style={{flexDirection:"row",alignItems:"center",marginTop:4}}>
                    <Icon name="clock" color="gray" style={{marginRight:4}}/>
                    <Text style={{fontWeight:"bold",color:"gray"}}>Commence at {props.classtime}</Text>
                </View>
            </View>
        </View>
    )
}

function UpcomingLectureCard(props){

    const [modalVisible, setModalVisible] = React.useState(false);
    const [interested,setInterested] = React.useState(null);

    React.useEffect(()=>{
        setInterested(props.interested);
    },[]);

    function handleInterested(){
        setModalVisible(true)
        customRequest('interested',{'schedule_id':props.id}).then((res)=>{
            if(res['msg'] !== "Already added in your interested list"){
                let cinterested = interested;
                cinterested = cinterested + 1;
                setInterested(cinterested);
            }
            setModalVisible(false);
            alert(res['msg']);
        })
    }

    return (
        <View style={{backgroundColor:"white",borderColor:"rgba(0,0,0,0.1)",elevation:1,borderRadius:5,paddingVertical:8,marginVertical:3}}>
            <Modal
                animationType="none"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
                }}
                >
                    <View style={{flex:1,alignItems:"center",justifyContent:"center",'alignItems':"center"}}>
                        <View style={{height:94,width:94,backgroundColor:"white",padding:12,borderRadius:5,elevation:2,justifyContent:"center"}}>
                            <ActivityIndicator color={colorPrimary} size="large"/>
                            <Text style={{color:colorPrimary,marginTop:6}}>Processing</Text>
                        </View>
                    </View>
            </Modal>
            <View style={{flexDirection:"row",paddingHorizontal:8,paddingBottom:8}}>
                <View style={{width:90,borderRadius:10,alignItems:"center",overflow:"hidden",backgroundColor:"rgba(0,0,0,0.05)"}}>
                    <Image source={props.thumb == null ? require('../../../assets/keyboard.jpg') :{uri:props.thumb}} style={{height:70,width:90}}/>
                    <Text style={{color:"dodgerblue",fontWeight:"bold"}}>{props.classtime}</Text>
                </View>
                <View style={{flex:1}}>
                    <Text style={{marginHorizontal:6,fontSize:14,fontWeight:"bold",color:"gray",textTransform:"uppercase"}}>{props.subject == null ? "SUBJECT": props.subject} <Icon name="star"/> {interested} Interested</Text>
                    <Text numberOfLines={2} style={{marginHorizontal:6,fontSize:16,fontWeight:"bold"}}>{props.description}</Text>
                    <Text numberOfLines={2} style={{marginHorizontal:6,fontSize:12,color:"gray"}}>{props.duration} By {props.teacher}</Text>
                </View>
                <Icon onPress={handleInterested} name="bell-alt" size={20} style={{marginLeft:"auto",alignSelf:"flex-start",textAlign:"center",borderRadius:10,borderColor:"rgba(0,0,0,0.3)",borderWidth:1,padding:6}} color="rgba(0,0,0,0.3)"/>
            </View>
            <View style={{height:1,backgroundColor:"rgba(0,0,0,0.1)"}}/>
            <View style={{flexDirection:"row",alignItems:"center",paddingHorizontal:6,paddingTop:6}}>
                <Icon name="calendar" color="gray"/>
                <Text style={{fontSize:12,marginLeft:6,color:"gray",fontWeight:"bold"}}>{props.date}</Text>
            </View>
        </View>
    )
}



const CoursePreviewScreen = ()=>{
    const navigation = useNavigation();
    const route = useRoute();
    let [loading,setLoading] = React.useState(true);
    let [homedata,setHomeData] = React.useState(null);
    let [liveclasses,setLiveclasses] = React.useState(null);
    let [upcomingClasses,setUpcomingClasses] = React.useState(null);
    let [pdfs,setPDFs] = React.useState(null);
    let [videos,setVideos] = React.useState(null);
    

    async function getHomePageContent(){
        customRequest('coursecontent',{'course_id':route.params.id}).then((res)=>{
            setLoading(false);
            setHomeData(res);
            
            if(res['live_classes'].length === 0){
                setLiveclasses(
                    <View style={{elevation:1,height:200,width:width - 24,backgroundColor:"white",borderRadius:10,alignItems:"center",justifyContent:"center"}}>
                         <Image source={require('../../../assets/video_call.png')} style={{resizeMode:"contain",height:"100%",width:"100%",position:"absolute"}}/>
                        <Text style={{fontWeight:"bold",fontSize:16,position:"absolute",textAlign:"right",color:colorPrimary,top:6}}>No any live class right Now</Text>
                    </View>
                );
            }else{
            setLiveclasses(
                    res['live_classes'].map((llecture)=>{
                        return <LiveLectureCard key={llecture['id']} classtime={llecture['classtime']} classid={llecture['id']} teacher={llecture['teacher_name']} meetingid={llecture['meetingid']} description={llecture['description']} subject={llecture['subject_name']} duration={llecture['duration']} thumb={llecture['thumbnail']}/>
                    })
                );
            }
            if(res['upcoming_classes'].length === 0){
                setUpcomingClasses(
                    <View style={{elevation:1,height:200,width:width - 24,backgroundColor:"white",borderRadius:10,alignItems:"center",justifyContent:"center"}}>
                        <Image source={require('../../../assets/upcoming_video.png')} style={{resizeMode:"contain",height:"100%",width:"100%",position:"absolute"}}/>
                        <Text style={{fontWeight:"bold",fontSize:16,position:"absolute",textAlign:"right",color:colorPrimary,top:18,right:18}}>Currently no any{'\n'}Upcoming Classes{'\n'}Scheduled</Text>
                    </View>
                )
            }else{
                setUpcomingClasses(
                    res['upcoming_classes'].map((uclass)=>{
                        return <UpcomingLectureCard key={uclass['id']} id={uclass['id']} interested={uclass['interested']} date={uclass['date']} subject={uclass['subject_name']} description={uclass['description']} duration={uclass['duration']} teacher={uclass['teacher_name']} classtime={uclass['classtime']} thumb={uclass['thumbnail']}/>
                    })
                )
            }
    
            if(res['pdfs'].length === 0){
                setPDFs(
                    <View style={{elevation:1,height:200,width:width - 24,backgroundColor:"white",borderRadius:10,alignItems:"center",justifyContent:"center"}}>
                        <Image source={require('../../../assets/online_video.png')} style={{resizeMode:"contain",height:"100%",width:"100%",position:"absolute"}}/>
                        <Text style={{fontWeight:"bold",fontSize:16,position:"absolute",color:colorPrimary,bottom:18,left:18}}>Currently no any free{'\n'}PDFs for your class</Text>
                    </View>
                )
            }else{
                setPDFs(
                    res['pdfs'].map((pdf)=>{
                        return (
                            <View key={pdf['id']} id={pdf['id']} style={{alignItems:"center",padding:8,width:160,borderRadius:10,overflow:"hidden",elevation:2,backgroundColor:"white",marginRight:10}}>
                                <Icon name="acrobat-reader" size={64}/>
                                <Text>{pdf['title']}</Text>
                               
                            </View>
                        )
                    })
                )
            }

            if(res['videos'].length === 0){
                setVideos(
                    <View style={{elevation:1,height:200,width:width - 24,backgroundColor:"white",borderRadius:10,alignItems:"center",justifyContent:"center"}}>
                        <Image source={require('../../../assets/online_video.png')} style={{resizeMode:"contain",height:"100%",width:"100%",position:"absolute"}}/>
                        <Text style={{fontWeight:"bold",fontSize:16,position:"absolute",color:colorPrimary,bottom:18,left:18}}>Currently no any videos{'\n'}for your class</Text>
                    </View>
                )
            }else{
                setVideos(
                    res['videos'].map((video)=>{
                       return (
                            <View   key={video['video_id']} style={{minHeight:210,width:(width-12)/2 - 3,elevation:1,borderRadius:5,overflow:"hidden",marginVertical:4,backgroundColor:"white"}}>
                                <Image source={{uri:video['video_link']}} style={{height:120,width:(width-12)/2 - 3,resizeMode:"cover"}}/>
                                <View style={{padding:8}}>
                                    <Text numberOfLines={2} ellipsizeMode="clip">{video['description']}</Text>
                                    <Text style={{paddingHorizontal:6,paddingVertical:4,backgroundColor:"dodgerblue",color:"white",fontSize:12,alignSelf:"flex-start",borderRadius:5}}>{video['course_id']}</Text>
                                    <Text style={{fontSize:12,fontWeight:"700"}}>{video['date']}</Text>
                                </View>
                            </View>
                       )
                    })
                )
            }
        });
    }

    React.useEffect(()=>{
        getHomePageContent();
    },[]);

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getHomePageContent().then((v)=>{
            setRefreshing(false);
        })
    }, []);

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



    return (
        <View style={{flex:1}}>
            <Header pagename={route.params.course['name']} isShowNotiBell={false}/>
            {loading ? <View style={{height:height - 60,flex:1,justifyContent:"center"}}>
                <ActivityIndicator color={colorPrimary} size="large"/>
            </View> :
            <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing}
            onRefresh={onRefresh}/>}>
                <View style={{paddingHorizontal:12,paddingVertical:12}}>
                    
                    <View style={{flex:1}}>
                        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                            <Text style={{fontSize:18,paddingVertical:8,fontWeight:"bold"}}>Live Classes</Text>
                            {/* <TouchableOpacity activeOpacity={0.7} onPress={()=>{navigation.navigate('LiveClassesScreen')}}>
                                <Text style={{fontSize:18,paddingVertical:8,fontWeight:"bold",color:colorPrimary,marginLeft:"auto"}}>View All</Text>
                            </TouchableOpacity> */}
                        </View>
                        {liveclasses}
                        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                            <Text style={{fontSize:18,paddingVertical:8,fontWeight:"bold"}}>Upcoming Classes</Text>
                            {/* <TouchableOpacity activeOpacity={0.7} onPress={()=>{navigation.navigate('UpcomingClassesScreen')}}>
                                <Text style={{fontSize:18,paddingVertical:8,fontWeight:"bold",color:colorPrimary,marginLeft:"auto"}}>View All</Text>
                            </TouchableOpacity> */}
                        </View>
                        {upcomingClasses}
                    </View>
                    
                    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                        <Text style={{fontSize:18,paddingVertical:8,fontWeight:"bold"}}>Study Materials</Text>
                        {/* <TouchableOpacity onPress={()=>{navigation.navigate('StudentPDFScreen')}} activeOpacity={0.6}>
                            <Text style={{fontSize:18,paddingVertical:8,fontWeight:"bold",color:colorPrimary,marginLeft:"auto"}}>View All</Text>
                        </TouchableOpacity> */}
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {pdfs}
                    </ScrollView>
                    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                        <Text style={{fontSize:18,paddingVertical:8,fontWeight:"bold"}}>Videos</Text>
                        {/* <TouchableOpacity onPress={()=>{navigation.navigate('StudentClassVideoScreen')}} activeOpacity={0.6}>
                            <Text style={{fontSize:18,paddingVertical:8,fontWeight:"bold",color:colorPrimary,marginLeft:"auto"}}>View All</Text>
                        </TouchableOpacity> */}
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {videos}
                    </ScrollView>
                </View>
                <Text style={{marginHorizontal:16,fontSize:18}}>{route.params.course['description']}</Text>
                <Text style={{marginHorizontal:16,fontSize:18,marginBottom:16,fontWeight:"bold"}}>Duration: {route.params.course['duration']}</Text>

            </ScrollView>
            }
            <View style={{width:width,height:60,backgroundColor:colorPrimary,justifyContent:"center",alignItems:"center"}}>
                {
                    route.params.course['sale_price'] === 0 
                    ? 
                    <TouchableOpacity activeOpacity={0.8} onPress={handleFreeCourse.bind(this,route.params.course['id'])}>
                        <View style={{backgroundColor:colorPrimary,borderRadius:5,paddingVertical:4,justifyContent:"center",alignItems:"center"}}><Text style={{color:"white",fontWeight:"bold",fontSize:18}}>Join Course</Text></View>
                    </TouchableOpacity>
                :
                    <TouchableOpacity activeOpacity={0.8} onPress={handlePurchaseCourse.bind(this,route.params.course['id'],route.params.course['sale_price'],route.params.course['name'])}>
                        <View style={{backgroundColor:colorPrimary,borderRadius:5,paddingVertical:4,justifyContent:"center",alignItems:"center"}}><Text style={{color:"white",fontWeight:"bold",fontSize:18}}>Buy Now</Text></View>
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

export default CoursePreviewScreen;