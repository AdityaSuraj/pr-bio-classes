import React from 'react';
import {View,Text, RefreshControl,ScrollView,Image, TouchableOpacity, ActivityIndicator,Modal} from 'react-native';
import Header from '../../components/header';
import { colorPrimary } from '../../constants/colors';
import { height, width } from '../../constants/dimensions';
import Icon from 'react-native-vector-icons/Fontisto';
import Carousel from 'react-native-snap-carousel';
import {useNavigation} from '@react-navigation/native';
import { customRequest } from '../../functions/request';



const LiveLectureCard = (props)=>{
    const navigation = useNavigation();
    return (
        <View style={{position:"relative",borderRadius:5,overflow:"hidden",borderColor:"rgba(0,0,0,0.1)",marginVertical:6,backgroundColor:"white"}}>
            <Image source={props.thumb == null ? require('../../assets/keyboard.jpg') :{uri:props.thumb}} style={{height:190,width:"auto",resizeMode:"cover"}}/>
            <Text style={{position:"absolute",top:10,right:10,paddingHorizontal:12,paddingVertical:6,backgroundColor:colorPrimary,color:"white",fontWeight:"bold",borderRadius:6}}>Live</Text>
            <View style={{paddingHorizontal:8,paddingVertical:6}}>
                <Text style={{color:"gray",textTransform:"uppercase"}}>{props.subject == null ? "SUBJECT": props.subject}</Text>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                    <View style={{width: 210,backgroundColor:""}}>
                        <Text style={{fontWeight:"bold",fontSize:16}} numberOfLines={3} ellipsizeMode="clip">{props.description}</Text>
                    </View>
                    <TouchableOpacity onPress={()=>{navigation.navigate('JitsiScreen',{meetingid:props.meetingid,classid:props.classid})}} activeOpacity={0.8}>
                        <View style={{backgroundColor:colorPrimary,paddingHorizontal:16,paddingVertical:8,borderRadius:50}}>
                            <Text style={{color:"white"}}>Join Now</Text>
                        </View>
                    </TouchableOpacity>
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
        <View style={{backgroundColor:"white",borderColor:"rgba(0,0,0,0.1)",borderRadius:5,paddingVertical:8,marginVertical:3}}>
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
                        <View style={{height:94,width:94,backgroundColor:"white",padding:12,borderRadius:5,justifyContent:"center"}}>
                            <ActivityIndicator color={colorPrimary} size="large"/>
                            <Text style={{color:colorPrimary,marginTop:6}}>Processing</Text>
                        </View>
                    </View>
            </Modal>
            <View style={{flexDirection:"row",paddingHorizontal:8,paddingBottom:8}}>
                <View style={{width:90,borderRadius:10,alignItems:"center",overflow:"hidden",backgroundColor:"rgba(0,0,0,0.05)"}}>
                    <Image source={props.thumb == null ? require('../../assets/keyboard.jpg') :{uri:props.thumb}} style={{height:70,width:90}}/>
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

const carouselitem = ({item,index})=>{
    return (
        <View style={{borderRadius:10,overflow:"hidden"}}>
            <Image source={{uri:item.img}} style={{width:width,height:160,resizeMode:"cover",backgroundColor:"white",borderRadius:10}}/>
        </View>
    )
}


const HomeScreen = ()=>{
    const navigation = useNavigation();
    let [loading,setLoading] = React.useState(true);
    let [homedata,setHomeData] = React.useState(null);
    let [liveclasses,setLiveclasses] = React.useState(null);
    let [upcomingClasses,setUpcomingClasses] = React.useState(null);
    let [homeCourses,setHomeCourses] = React.useState(null);
    let [carouselData,setCarouselData] = React.useState([]);
    let [accessible,setAccessible] = React.useState(true);
    let [pdfs,setPDFs] = React.useState(null);
    let [videos,setVideos] = React.useState(null);
    

    async function getHomePageContent(){
        customRequest('homepagecontent').then((res)=>{
            setLoading(false);
            setHomeData(res);
            res['banners'].forEach((ban)=>{
                carouselData.push({"img":ban['img']})
            })
            
            if(res['live_classes'].length === 0){
                setLiveclasses(
                    <View style={{height:200,width:width - 24,backgroundColor:"white",borderRadius:10,alignItems:"center",justifyContent:"center"}}>
                         <Image source={require('../../assets/video_call.png')} style={{resizeMode:"contain",height:"100%",width:"100%",position:"absolute"}}/>
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
                    <View style={{height:200,width:width - 24,backgroundColor:"white",borderRadius:10,alignItems:"center",justifyContent:"center"}}>
                        <Image source={require('../../assets/upcoming_video.png')} style={{resizeMode:"contain",height:"100%",width:"100%",position:"absolute"}}/>
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
            if(res['courses'].length === 0){
                setHomeCourses(
                    <View style={{height:200,width:width - 24,backgroundColor:"white",borderRadius:10,alignItems:"center",justifyContent:"center"}}>
                        <Image source={require('../../assets/online_video.png')} style={{resizeMode:"contain",height:"100%",width:"100%",position:"absolute"}}/>
                        <Text style={{fontWeight:"bold",fontSize:16,position:"absolute",color:colorPrimary,bottom:18,left:18}}>Currently no any videos{'\n'}for your class</Text>
                    </View>
                )
            }else{
                setHomeCourses(
                    res['courses'].map((course)=>{
                        return (
                            <View key={course['id']} style={{height:180,width:160,borderRadius:10,overflow:"hidden",backgroundColor:"white",marginRight:10}}>
                                <Image source={{uri:course['thumbnail']}} style={{width:"100%",height:90,resizeMode:"cover"}}/>
                                <View style={{padding:6}}>
                                    <Text style={{fontSize:18,fontWeight:"bold"}} numberOfLines={1}>{course['name']}</Text>
                                    <Text style={{fontSize:18,fontWeight:"bold"}}>₹{course['sale_price']}<Text style={{textDecorationLine:"line-through",marginLeft:6,fontSize:12}}>₹{course['price']}</Text></Text>
                                    <TouchableOpacity onPress={()=>{navigation.navigate('CoursePreviewScreen',{id:course['id'],course:course})}} activeOpacity={0.6}>
                                        <View style={{backgroundColor:colorPrimary,borderRadius:5,paddingVertical:4,justifyContent:"center",alignItems:"center"}}><Text style={{color:"white",fontWeight:"bold"}}>View And Buy</Text></View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })
                )
            }
    
            if(res['pdfs'].length === 0){
                setPDFs(
                    <View style={{height:200,width:width - 24,backgroundColor:"white",borderRadius:10,alignItems:"center",justifyContent:"center"}}>
                        <Image source={require('../../assets/online_video.png')} style={{resizeMode:"contain",height:"100%",width:"100%",position:"absolute"}}/>
                        <Text style={{fontWeight:"bold",fontSize:16,position:"absolute",color:colorPrimary,bottom:18,left:18}}>Currently no any free{'\n'}PDFs for your class</Text>
                    </View>
                )
            }else{
                setPDFs(
                    res['pdfs'].map((pdf)=>{
                        return (
                            <View key={pdf['id']} id={pdf['id']} style={{alignItems:"center",padding:8,width:160,borderRadius:10,overflow:"hidden",backgroundColor:"white",marginRight:10}}>
                                <Icon name="acrobat-reader" size={64}/>
                                <Text>{pdf['title']}</Text>
                                <TouchableOpacity activeOpacity={0.8} onPress={()=>{navigation.navigate('ViewPDFScreen',{title:pdf['title'],path:pdf['files']})}}>
                                    <View style={{width:160 - 16,marginTop:8,backgroundColor:colorPrimary,borderRadius:5,paddingVertical:4,justifyContent:"center",alignItems:"center"}}><Text style={{color:"white",fontWeight:"bold"}}>Read Now</Text></View>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                )
            }

            if(res['videos'].length === 0){
                setVideos(
                    <View style={{height:200,width:width - 24,backgroundColor:"white",borderRadius:10,alignItems:"center",justifyContent:"center"}}>
                        <Image source={require('../../assets/online_video.png')} style={{resizeMode:"contain",height:"100%",width:"100%",position:"absolute"}}/>
                        <Text style={{fontWeight:"bold",fontSize:16,position:"absolute",color:colorPrimary,bottom:18,left:18}}>Currently no any videos{'\n'}for your class</Text>
                    </View>
                )
            }else{
                setVideos(
                    res['videos'].map((video)=>{
                       return (
                            <TouchableOpacity activeOpacity={0.8} key={video['video_id']} style={{marginRight:10}} onPress={()=>{navigation.navigate('WatchVideoScreen',{videolink:video['video_id'],id:video['id']})}}>
                                <View  style={{minHeight:210,width:(width-12)/2 - 3,borderRadius:5,overflow:"hidden",marginVertical:4,backgroundColor:"white"}}>
                                    <Image source={{uri:video['video_link']}} style={{height:120,width:(width-12)/2 - 3,resizeMode:"cover"}}/>
                                    <View style={{padding:8,justifyContent:"space-between",height: 90}}>
                                        <Text numberOfLines={2} ellipsizeMode="clip">{video['description']}</Text>
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


    return (
        <View style={{flex:1}}>
            <Header pagename="PR Bio Classes"/>
            {loading ? <View style={{height:height - 60,flex:1,justifyContent:"center"}}>
                <ActivityIndicator color={colorPrimary} size="large"/>
            </View> :
            <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing}
            onRefresh={onRefresh}/>}>
                <View style={{paddingHorizontal:12,paddingVertical:12}}>
                    <View style={{height:180,alignItems:"center"}}>
                        <Carousel
                            layout="default"
                            autoplay={true}
                            loop={true}
                            data={carouselData}
                            renderItem={carouselitem}
                            itemWidth={width - 24}
                            sliderWidth={width}
                        /> 
                    </View>
                    {
                        !accessible ? 
                        <View style={{width:width - 24,backgroundColor:"white",borderRadius:5,overflow:"hidden",marginVertical:16}}>
                            <Image source={require("../../assets/logo.png")} style={{height:160,width:width-24,resizeMode:"contain"}}/>
                            <Text style={{textAlign:"center",fontSize:20,color:colorPrimary}}>Your plan has been expired{'\n'}Buy new plan to continue learning</Text>
                            <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:10}}>
                                <TouchableOpacity activeOpacity={0.8} onPress={()=>{navigation.navigate("StudyPlanScreen")}}>
                                    <View style={{width:width - 24,backgroundColor:colorPrimary,paddingVertical:10,justifyContent:"center",alignItems:"center"}}>
                                        <Text style={{color:"white",fontSize:18,fontWeight:"bold"}}>Buy Plan</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        :
                    
                    <View style={{flex:1}}>
                        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                            <Text style={{fontSize:18,paddingVertical:8,fontWeight:"bold"}}>Live Classes</Text>
                            {/* <TouchableOpacity activeOpacity={0.7} onPress={()=>{navigation.navigate('LiveClassesScreen')}}>
                                <Text style={{fontSize:18,paddingVertical:8,fontWeight:"bold",color:colorPrimary,marginLeft:"auto"}}>View All</Text>
                            </TouchableOpacity> */}
                        </View>
                        {liveclasses}
                        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                            <Text style={{fontSize:18,paddingVertical:8,fontWeight:"bold"}}>Upcoming Batch</Text>
                            <TouchableOpacity activeOpacity={0.7} onPress={()=>{navigation.navigate('UpcomingClassesScreen')}}>
                                <Text style={{fontSize:18,paddingVertical:8,fontWeight:"bold",color:colorPrimary,marginLeft:"auto"}}>View All</Text>
                            </TouchableOpacity>
                        </View>
                        {upcomingClasses}
                        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                            <Text style={{fontSize:18,paddingVertical:8,fontWeight:"bold"}}>Courses</Text>
                            <TouchableOpacity onPress={()=>{navigation.navigate('StudentCourseScreen')}} activeOpacity={0.6}>
                                <Text style={{fontSize:18,paddingVertical:8,fontWeight:"bold",color:colorPrimary,marginLeft:"auto"}}>View And Buy</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    }
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {homeCourses}
                    </ScrollView>
                    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                        <Text style={{fontSize:18,paddingVertical:8,fontWeight:"bold"}}>Study Materials</Text>
                        <TouchableOpacity onPress={()=>{navigation.navigate('StudentPDFScreen',{course:"free"})}} activeOpacity={0.6}>
                            <Text style={{fontSize:18,paddingVertical:8,fontWeight:"bold",color:colorPrimary,marginLeft:"auto"}}>View All</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {pdfs}
                    </ScrollView>
                    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                        <Text style={{fontSize:18,paddingVertical:8,fontWeight:"bold"}}>Free Learning</Text>
                        <TouchableOpacity onPress={()=>{navigation.navigate('StudentClassVideoScreen',{course:"free"})}} activeOpacity={0.6}>
                            <Text style={{fontSize:18,paddingVertical:8,fontWeight:"bold",color:colorPrimary,marginLeft:"auto"}}>View All</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {videos}
                    </ScrollView>
                </View>
            </ScrollView>
            }
        </View>
    )
}

export default HomeScreen;