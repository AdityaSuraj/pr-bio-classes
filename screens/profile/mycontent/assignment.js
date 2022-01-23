import React from 'react';
import {View,Text, RefreshControl,Image, ScrollView,TextInput, TouchableOpacity, ActivityIndicator} from 'react-native';
import Header from '../../../components/header';
import { colorPrimary } from '../../../constants/colors';
import {LinearGradient} from 'expo-linear-gradient';
import { height, width } from '../../../constants/dimensions';
import Icon from 'react-native-vector-icons/Fontisto';
import {Picker} from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import { getValueFromStorage } from '../../../functions/securestorage';
import { customRequestMultipart ,customRequest} from '../../../functions/request';
import {useNavigation} from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';


function PreviousSubmissions(){
    let [assignments,setAssignments] = React.useState(null);
    let [len,setLen] = React.useState(0);
    let [loading,setLoading] = React.useState(true);
    const [refreshing, setRefreshing] = React.useState(false); 



    async function getMyHomeworks(){
        getValueFromStorage('studentdetail').then((value)=>{
            customRequest('mysubmissions',{'user_id':value['id']}).then((assignments)=>{
                setLoading(false)
                setLen(assignments.length);
                setAssignments(
                    assignments.map((assignment)=>{
                        return (
                            <View key={assignment['id']} style={{backgroundColor:"white",padding:8,marginVertical:3,borderRadius:5}}>
                                <Text style={{fontWeight:"bold",fontSize:18}}>{assignment['subject_name']}</Text>
                                <Text style={{padding:4,fontSize:15}}><Text style={{fontWeight:"bold"}}>My Comment:</Text> {assignment['content']}</Text>
                                {/* <Text style={{fontSize:17,margin:6,padding:6,backgroundColor:colorPrimary,color:"white",borderRadius:5}}><Text style={{fontWeight:"bold",color:"yellow"}}>Teacher Response:</Text> {assignment['teacher_remarks'] === null ? "Pending" : assignment['teacher_remarks']}</Text> */}
                                <View style={{flexDirection:"row",alignItems:"center",paddingHorizontal:2,justifyContent:"space-between"}}>
                                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{navigation.navigate('ViewPDFScreen',{title:assignment['subject_name'],path:assignment['file_loc']})}}>
                                        <Text style={{width:width/2 - 18,paddingHorizontal:8,paddingVertical:8,textAlign:"center",backgroundColor:"dodgerblue",color:"white",fontWeight:"bold",borderRadius:3}}>View Assignment</Text>
                                    </TouchableOpacity>
                                    <Text style={{width:width/2 - 18,paddingHorizontal:8,paddingVertical:8,textAlign:"center",backgroundColor:"gray",color:"white",fontWeight:"bold",borderRadius:3}}>Total Marks: {assignment['total_marks']}</Text>
                                </View>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                {
                                    assignment['images'].map((img)=>{
                                        return (
                                            <Image key={Math.random()} source={{uri:img}} style={{height:120,width:70,resizeMode:"contain",marginHorizontal:2,marginVertical:4}}/>
                                        )
                                    })
                                }
                                </ScrollView>
                                {
                                    (assignment['marks_obtain'] === null || assignment['marks_obtain'] === "") ?
                                    <Text style={{paddingHorizontal:8,marginVertical:4,paddingVertical:8,backgroundColor:colorPrimary,textAlign:"center",color:"white",fontWeight:"bold",borderRadius:3}}>Pending Result</Text>
                                :
                                    <View>
                                        <Text style={{paddingHorizontal:8,marginVertical:4,paddingVertical:8,backgroundColor:"dodgerblue",color:"white",fontWeight:"bold",borderRadius:3}}>Teacher Remarks: {assignment['teacher_remarks']}</Text>
                                        <Text style={{width:width/2 - 18,paddingHorizontal:8,paddingVertical:8,textAlign:"center",backgroundColor:"gray",color:"white",fontWeight:"bold",borderRadius:3}}>Total Marks: {assignment['marks_obtain']}</Text>
                                    </View>
                                }
                                <View style={{flexDirection:"row",alignItems:"center",marginTop:3}}>
                                    <Text style={{marginLeft:6,fontWeight:"bold",fontSize:13}}>Date: {assignment['start_date']}</Text>
                                    <Text style={{marginLeft:'auto',fontWeight:"bold",fontSize:13}}>Last Date:{assignment['last_date']}</Text>
                                </View>
                            </View>
                        )
                    })
                )
            })
        })
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getMyHomeworks().then((v)=>{
            setRefreshing(false);
        })
    }, []);

    React.useEffect(()=>{
        getMyHomeworks();
    },[])

    if(loading){
        return (
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                <ActivityIndicator size="large" color={colorPrimary}/>
            </View>
        )
    }else{
        if(len === 0 ){
            return (
            <View style={{flex:1,alignItems:"center",justifyContent:"center",height:height - 240}}>
                <Icon name="yacht" size={64} color={colorPrimary}/>
                <Text style={{textAlign:"center",color:"gray",marginTop:12}}>There is no any {'\n'} new assignments for you!</Text>
            </View> 
            )
        }else{
            return (
                <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing}
                    onRefresh={onRefresh}/>}>
                    <View style={{padding:6}}>
                        {assignments}
                    </View>
                </ScrollView>
            )
        }
    }
}


function NewAssignments(){
    let [homeworks,setHomeworks] = React.useState(null);
    let [len,setLen] = React.useState(0);
    let [loading,setLoading] = React.useState(true);
    let navigation = useNavigation();
    
    const [refreshing, setRefreshing] = React.useState(false); 

  
    async function getMyHomeworks(){
        getValueFromStorage('studentdetail').then((value)=>{
            customRequest('assignments',{'user_id':value['id'],"class_id":value['class_id'],'school_id':value['school_id']}).then((assignments)=>{
                setLoading(false)
                setLen(assignments.length);
                setHomeworks(
                    assignments.map((assignment)=>{
                        return (
                            <View key={assignment['id']} style={{backgroundColor:"white",padding:8,marginVertical:3,borderRadius:5}}>
                                <Text style={{fontWeight:"bold",fontSize:18}}>{assignment['subject_name']}</Text>
                                <Text style={{padding:4,fontSize:16}}>{assignment['content']}</Text>
                                {/* <Text style={{fontSize:17,margin:6,padding:6,backgroundColor:colorPrimary,color:"white",borderRadius:5}}><Text style={{fontWeight:"bold",color:"yellow"}}>Teacher Response:</Text> {assignment['teacher_remarks'] === null ? "Pending" : assignment['teacher_remarks']}</Text> */}
                                <View style={{flexDirection:"row",alignItems:"center",paddingHorizontal:2,justifyContent:"space-between"}}>
                                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{navigation.navigate('ViewPDFScreen',{title:assignment['subject_name'],path:assignment['file_loc']})}}>
                                        <Text style={{width:width/2 - 18,paddingHorizontal:8,paddingVertical:8,textAlign:"center",backgroundColor:"dodgerblue",color:"white",fontWeight:"bold",borderRadius:3}}>View Assignment</Text>
                                    </TouchableOpacity>
                                    <Text style={{width:width/2 - 18,paddingHorizontal:8,paddingVertical:8,textAlign:"center",backgroundColor:"gray",color:"white",fontWeight:"bold",borderRadius:3}}>Total Marks: {assignment['total_marks']}</Text>
                                </View>
                                <TouchableOpacity activeOpacity={0.8} onPress={()=>{navigation.navigate('SubmitAssignmentScreen',{assignment_id:assignment['id'],subject:assignment['subject_name']})}}>
                                    <Text style={{paddingVertical:12,backgroundColor:colorPrimary,marginVertical:4,fontSize:16,fontWeight:"bold",textAlign:"center",color:"white",borderRadius:3}}>Submit Assignment</Text>
                                </TouchableOpacity>
                                <View style={{flexDirection:"row",alignItems:"center",marginTop:3}}>
                                    <Text style={{marginLeft:6,fontWeight:"bold",fontSize:13}}>Date: {assignment['start_date']}</Text>
                                    <Text style={{marginLeft:'auto',fontWeight:"bold",fontSize:13}}>Last Date:{assignment['last_date']}</Text>
                                </View>
                            </View>
                        )
                    })
                )
            })
        })
    }
    
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getMyHomeworks().then((v)=>{
            setRefreshing(false);
        })
    }, []);

    React.useEffect(()=>{
        getMyHomeworks();
    },[])

    if(loading){
        return (
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                <ActivityIndicator size="large" color={colorPrimary}/>
            </View>
        )
    }else{
        if(len === 0 ){
            return (
            <View style={{flex:1,alignItems:"center",justifyContent:"center",height:height - 240}}>
                <Icon name="yacht" size={64} color={colorPrimary}/>
                <Text style={{textAlign:"center",color:"gray",marginTop:12}}>There is no any {'\n'} new assignments for you!</Text>
            </View> 
            )
        }else{
            return (
                <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing}
                    onRefresh={onRefresh}/>}>
                    <View style={{padding:6}}>
                        {homeworks}
                    </View>
                </ScrollView>
            )
        }
    }
}


const AssignmentScreen = ()=>{
    let [isprev,setIsprev] = React.useState(true);
    

    return (
        <View style={{flex:1}}>
            <Header pagename="Assignment"/>
                <View style={{height:74,backgroundColor:"rgba(255,165,0,0.1)",flexDirection:"row",alignItems:"center",paddingHorizontal:16}}>
                    <TouchableOpacity onPress={()=>{setIsprev(true)}} activeOpacity={0.8}>
                        <View style={{paddingHorizontal:20,paddingVertical:6,backgroundColor:isprev ? colorPrimary : "white",borderRadius:60,marginHorizontal:4}}>
                            <Text style={{color:isprev? "white": colorPrimary}}>NEW</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{setIsprev(false)}} activeOpacity={0.8}>
                        <View style={{paddingHorizontal:20,paddingVertical:6,backgroundColor:!isprev ? colorPrimary : "white",borderRadius:60,marginHorizontal:4}}>
                            <Text style={{color:!isprev? "white" :colorPrimary}}>PREVIOUS</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            {isprev ?
                <NewAssignments/>
            : 
            // <ScrollView showsVerticalScrollIndicator={false}>
                <PreviousSubmissions />
            // </ScrollView>
            }
        </View>
    )
}

export default AssignmentScreen;