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



function SubmitNewHomework(props){
    let [selectedSubject,setSelectedSubject] = React.useState(null);
    let [comment,setComment] = React.useState("");
    let [file,setFile] = React.useState(new Array());
    let [images,setImages] = React.useState(null);
    let [user,setUser] = React.useState(null);
    let [loading,setLoading] = React.useState(false);
    let [subjects,setSubjects] = React.useState(null);

    React.useEffect(()=>{
        getValueFromStorage('studentdetail').then((value)=>{
            setUser(value);
        })
        customRequest('subjects').then((subjects)=>{
            setSelectedSubject(subjects[0]['id'])
            setSubjects(
                subjects.map((subject)=>{
                    return <Picker.Item key={subject['id']} value={subject['id']} label={subject['name']}/>
                })
            )
        })
    },[])

    const handleFilePick = ()=>{
        ImagePicker.launchImageLibraryAsync({mediaTypes:ImagePicker.MediaTypeOptions.Images,allowsEditing:true,allowsMultipleSelection:true}).then((res)=>{
           if(res.cancelled == false){
               let files = file;
               files.push(res);
                setFile(
                    files
                );
                setImages(
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {
                        file.map((img)=>{
                            return (
                                <Image key={Math.random()} source={{uri:img.uri}} style={{height:120,width:70,resizeMode:"contain"}}/>
                            )
                        })
                    }
                    </ScrollView>
                )
           }
        })
        console.log(file);
    }
    
    function handleSubmit(){
        if(selectedSubject === null || comment === ""){
            alert("Add comment to your homework");
        }else if(file.length === 0 ){
            alert('Select images to upload');
        }else{

            setLoading(true);
            let formData = new FormData();
            formData.append('user_id',user['id']);
            formData.append('school_id',user['school_id']);
            formData.append('class_id',user['class_id']);
            formData.append('comment',comment)
            formData.append('subject_id',selectedSubject);
            let index = 0;
            file.forEach((file)=>{
                formData.append(`file[${index}]`,{uri:file.uri,name:file.uri.toString().split('/')[file.uri.toString().split('/').length - 1],type:'image/jpg'});
                index = index + 1;
            })
            customRequestMultipart('submithomework',formData).then((res)=>{
                console.log(res);
                setLoading(false);
                if(res['msg'] === "success" ){
                    setComment("");
                    setFile(new Array());
                    setImages(<View/>);
                    alert('Homework submitted successfully');
    
                }else{
                    alert('Something went wrong! Kindly try to submit again');
                }
            })
        }
    }

    return (
        <View style={{flex:1,padding:8}}>
            {loading ? 
                <View style={{position:"absolute",zIndex:4,top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0,0,0,0.1)",justifyContent:"center",alignItems:"center"}}>
                    <ActivityIndicator color={colorPrimary} size="large"/>
                </View>
            : <View/>}
            <View style={{paddingHorizontal:8,paddingVertical:4,backgroundColor:"white",borderRadius:5}}>
                <Picker selectedValue={selectedSubject}
                    onValueChange={(value,index)=>{
                        setSelectedSubject(value);
                    }}
                >
                    {subjects}
                </Picker>
            </View>
            <View style={{marginLeft:"auto",width:width - 16,paddingHorizontal:16,paddingVertical:12,backgroundColor:"white",borderRadius:5,marginVertical:6}}>
                    <TextInput value={comment} numberOfLines={8} placeholder="Comment" onChangeText={(val)=>{setComment(val)}}/>
            </View>
            {file === null? <View/> : images}
            <TouchableOpacity onPress={handleFilePick} activeOpacity={0.6}>
                <View style={{marginLeft:"auto",width:width - 16,paddingHorizontal:16,paddingVertical:12,backgroundColor:"white",borderRadius:5,marginVertical:6}}>
                    <Text style={{color:colorPrimary,fontWeight:"bold",textAlign:"center"}}>Select Image One by One</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit} activeOpacity={0.6}>
                <View style={{marginLeft:"auto",marginRight:"auto",paddingHorizontal:16,paddingVertical:12,backgroundColor:colorPrimary,borderRadius:5,marginVertical:6}}>
                    <Text style={{color:"white",fontWeight:"bold",textAlign:"center"}}>Submit Homework</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

function MyHomeWorks(){
    let [homeworks,setHomeworks] = React.useState(null);
    let [len,setLen] = React.useState(0);
    let [loading,setLoading] = React.useState(true);
    let navigation = useNavigation();
    
    const [refreshing, setRefreshing] = React.useState(false); 

  
    async function getMyHomeworks(){
        getValueFromStorage('studentdetail').then((value)=>{
            customRequest('myhomeworks',{"user_id":value['id']}).then((homeworkslist)=>{
                setLoading(false)
                setLen(homeworkslist.length);
                setHomeworks(
                    homeworkslist.map((homework)=>{
                        return (
                            <View key={homework['id']} style={{backgroundColor:"white",padding:8,marginVertical:3,borderRadius:5}}>
                                <Text style={{fontWeight:"bold",fontSize:18}}>{homework['subject_name']}</Text>
                                <Text style={{padding:4,fontSize:16}}>{homework['comment']}</Text>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                {
                                    homework['images'].map((img)=>{
                                        return (
                                            <Image key={Math.random()} source={{uri:img}} style={{height:100,width:60,resizeMode:"contain",marginHorizontal:3}}/>
                                        )
                                    })
                                }
                                </ScrollView>
                                <Text style={{fontSize:17,margin:6,padding:6,backgroundColor:colorPrimary,color:"white",borderRadius:5}}><Text style={{fontWeight:"bold",color:"yellow"}}>Teacher Response:</Text> {homework['teacher_remarks'] === null ? "Pending" : homework['teacher_remarks']}</Text>
                                <View style={{flexDirection:"row",alignItems:"center",marginTop:3}}>
                                    <Icon name="clock" size={13}/>
                                    <Text style={{marginLeft:6,fontWeight:"600",fontSize:13}}>{homework['submit_ts']}</Text>
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
                <Text style={{textAlign:"center",color:"gray",marginTop:12}}>It seems you have not {'\n'} submitted any homework yet!</Text>
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


const HomeworkScreen = ()=>{
    let [isprev,setIsprev] = React.useState(true);
    

    return (
        <View style={{flex:1}}>
            <Header pagename="Homework"/>
                <View style={{height:74,backgroundColor:"rgba(255,165,0,0.1)",flexDirection:"row",alignItems:"center",paddingHorizontal:16}}>
                    <TouchableOpacity onPress={()=>{setIsprev(true)}} activeOpacity={0.8}>
                        <View style={{paddingHorizontal:20,paddingVertical:6,backgroundColor:isprev ? colorPrimary : "white",borderRadius:60,marginHorizontal:4}}>
                            <Text style={{color:isprev? "white": colorPrimary}}>PREVIOUS</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{setIsprev(false)}} activeOpacity={0.8}>
                        <View style={{paddingHorizontal:20,paddingVertical:6,backgroundColor:!isprev ? colorPrimary : "white",borderRadius:60,marginHorizontal:4}}>
                            <Text style={{color:!isprev? "white" :colorPrimary}}>SUBMIT</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            {isprev ?
                <MyHomeWorks/>
            : 
            <ScrollView showsVerticalScrollIndicator={false}>
                <SubmitNewHomework />
            </ScrollView>
            }
        </View>
    )
}

export default HomeworkScreen;