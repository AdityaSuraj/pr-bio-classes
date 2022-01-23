import React from 'react';
import {View,Text, RefreshControl,Image, ScrollView,TextInput, TouchableOpacity, ActivityIndicator, Alert} from 'react-native';
import Header from '../../../components/header';
import { colorPrimary } from '../../../constants/colors';
import {LinearGradient} from 'expo-linear-gradient';
import { height, width } from '../../../constants/dimensions';
import Icon from 'react-native-vector-icons/Fontisto';
import {Picker} from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import { getValueFromStorage } from '../../../functions/securestorage';
import { customRequestMultipart ,customRequest} from '../../../functions/request';
import {useNavigation,useRoute} from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';




export default function SubmitAssignment(props){
    let route = useRoute();
    let navigation = useNavigation();
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
        });
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
        if(comment === ""){
            alert("Add comment to your assignment");
        }else if(file.length === 0 ){
            alert('Select images to upload');
        }else{

            setLoading(true);
            let formData = new FormData();
            formData.append('user_id',user['id']);
            formData.append('assignment_id',route.params.assignment_id);
            formData.append('comment',comment)
            let index = 0;
            file.forEach((file)=>{
                formData.append(`file[${index}]`,{uri:file.uri,name:file.uri.toString().split('/')[file.uri.toString().split('/').length - 1],type:'image/jpg'});
                index = index + 1;
            })
            customRequestMultipart('submitassignment',formData).then((res)=>{
                setLoading(false);
                if(res['msg'] === "success" ){
                    setComment("");
                    setFile(new Array());
                    setImages(<View/>);
                    Alert.alert('Assignment Submission','Your asssignment has been submitted successfully.',[
                        {
                            text:'OK',
                            onPress:()=>{
                                navigation.goBack();
                            }
                        }
                    ])
    
                }else if(res['msg'] == "already submitted"){
                    Alert.alert('Assignment Submission','You have already submitted you assignment.Cannot submit again.',[
                        {
                            text:'OK',
                            onPress:()=>{
                                navigation.goBack();
                            }
                        }
                    ])
                }else{
                    alert('Something went wrong! Kindly try to submit again');
                }
            })
        }
    }

    return (
        <View style={{flex:1}}>
            <Header pagename={route.params.subject + " Assignment"}/>
            {
                loading ? 
                    <View style={{position:"absolute",top:0,left:0,right:0,bottom:0,zIndex:5,flex:1,backgroundColor:"rgba(0,0,0,0.3)",alignItems:"center",justifyContent:"center"}}>
                        <ActivityIndicator size="large" color={colorPrimary}/>
                    </View>
                : <View/>
            }
            <View style={{alignItems:"center"}}>
                <View style={{width:width - 16,paddingHorizontal:16,paddingVertical:12,backgroundColor:"white",borderRadius:5,marginVertical:6}}>
                        <TextInput multiline={true} value={comment} numberOfLines={12} placeholder="Comment" onChangeText={(val)=>{setComment(val)}}/>
                </View>
                {file === null? <View/> : images}
                <TouchableOpacity onPress={handleFilePick} activeOpacity={0.6}>
                    <View style={{marginLeft:"auto",width:width - 16,paddingHorizontal:16,paddingVertical:12,backgroundColor:"white",borderRadius:5,marginVertical:6}}>
                        <Text style={{color:colorPrimary,fontWeight:"bold",textAlign:"center"}}>Select Image One by One</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSubmit} activeOpacity={0.6}>
                    <View style={{marginLeft:"auto",marginRight:"auto",paddingHorizontal:16,paddingVertical:12,backgroundColor:colorPrimary,borderRadius:5,marginVertical:6}}>
                        <Text style={{color:"white",fontWeight:"bold",textAlign:"center"}}>Submit Assignment</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}
