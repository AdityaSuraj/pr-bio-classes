import React from 'react';
import { ScrollView, View ,Text, TouchableOpacity,RefreshControl } from 'react-native';
import Header from '../../components/header';
import { width } from '../../constants/dimensions';
import { colorPrimary } from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import { instituteCustomRequest } from '../../functions/request';

function HomeCard(props){
    return(
        <View style={{backgroundColor:"white",margin:4,padding:8,overflow:"hidden",borderRadius:5,height:(width - 12 )/2 - 6,width:(width - 16 )/2 - 6}}>
            <Text style={{fontSize:28,fontWeight:"bold",color:colorPrimary}}>{props.title === undefined ? "Title" : props.title}</Text>
            <Text style={{fontSize:14,color:colorPrimary,paddingHorizontal:6}}>{props.description === undefined ? "Description of card" : props.description}</Text>
            <View style={{backgroundColor:colorPrimary,height:120,width:120,position:"absolute",bottom:-30,right:-30,borderRadius:120}}> 
                <Text style={{fontSize:28,fontWeight:"bold",color:"white",marginTop:30,marginLeft:30}}>{props.count === undefined ? "000" : props.count }</Text>
            </View>
        </View>
    )
}

export default function TeacherHomeScreen(){
    const navigation = useNavigation();
    let [data,setData] = React.useState(null);

    React.useEffect(()=>{
        instituteCustomRequest('home').then((res)=>{
            setData(res['data']);
        })

    },[])

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        instituteCustomRequest('home').then((res)=>{
            setData(res['data']);
            setRefreshing(false);
        });
    }, []);


    return(
        <View style={{flex:1}}>
            <Header pagename="PR Bio Classes"/>
            <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing}
            onRefresh={onRefresh}/>}>
                <View style={{paddingHorizontal:6,paddingVertical:6,flexDirection:"row",flexWrap:"wrap",justifyContent:"space-between"}}>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{navigation.navigate('InstituteCoursesScreen')}}>
                        <HomeCard title="Courses" description="Courses you have created" count={data == null ? "0" : data['courses']}/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{navigation.navigate('InstituteStudentsScreen')}}>
                        <HomeCard title="Students" description="Students registered on your app" count={data == null ? "0" : data['students']}/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{navigation.navigate('InstituteScheduleScreen')}}>
                        <HomeCard title="Classes" description="Live And Upcoming classes by you" count={data == null ? "0" : data['schedules']}/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{navigation.navigate('InstituteContentScreen')}}>
                        <HomeCard title="Contents" description="PDFs, sample papers, test series etc." count={data == null ? "0" : data['contents']}/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{navigation.navigate('InstituteGalleryScreen')}}>
                        <HomeCard title="Gallery" description="Total images in your gallery" count={data == null ? "0" : data['gallery']}/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{navigation.navigate('InstituteVideoScreen')}}>
                        <HomeCard title="Videos" description="Videos by you" count={data == null ? "0" : data['videos']}/>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}