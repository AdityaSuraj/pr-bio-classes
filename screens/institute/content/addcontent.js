import React from 'react';
import { View ,StatusBar,Text, ScrollView,Image, TextInput, TouchableOpacity, Button,Modal,ActivityIndicator, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import {useNavigation} from '@react-navigation/native';
import { colorPrimary } from '../../../constants/colors';
import * as ImagePicker from 'expo-image-picker';
import { insituteCustomRequestMultipart, instituteCustomRequest } from '../../../functions/request';
import {Picker} from '@react-native-picker/picker';
import { width } from '../../../constants/dimensions';
import * as DocumentPicker from 'expo-document-picker';



export default function AddContentScreen(){
    const navigation = useNavigation();
    let [name,setName] = React.useState('');
    let [files,setFiles] = React.useState(null);
    let [modalVisible,setModalVisible] = React.useState(false);
    let [selectedCourse,setSelectedCourse] = React.useState('');
    let [pickerItems,setPickerItems] = React.useState(null);
    let [selectedContentType,setSelectedContentType] = React.useState('study_material');
    let [selectedContentFileType,setSelectedContentFileType] = React.useState('pdf');


    React.useEffect(()=>{
        instituteCustomRequest('courses').then((res)=>{
            setSelectedCourse(res['data'][0]['id']);
            setPickerItems(
                res['data'].map((course)=>{
                    return (
                        <Picker.Item key={course['id']} label={course['name']} value={course['id']}/>
                    )
                })
            )
        })
    },[])

    function handlePickImage(){
        // if(selectedContentFileType === "image"){
        //     ImagePicker.launchImageLibraryAsync({mediaTypes:ImagePicker.MediaTypeOptions.Images,allowsEditing:true}).then((img)=>{
        //         if(img.cancelled === false){
        //             let files = files;
        //             files.push(res);
        //              setFiles(
        //                  files
        //              );
        //             //  setImages(
        //             //      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        //             //          {
        //             //          file.map((img)=>{
        //             //              return (
        //             //                  <Image key={Math.random()} source={{uri:img.uri}} style={{height:120,width:70,resizeMode:"contain"}}/>
        //             //              )
        //             //          })
        //             //      }
        //             //      </ScrollView>
        //             //  )
        //         }
        //     })
        // }else if(selectedContentFileType === "pdf"){
            
        // }
        DocumentPicker.getDocumentAsync({type:"application/pdf",multiple:false}).then((file)=>{
            console.log(file);
            setFiles(
                file
            );
        })
    }

    function handleCreateCourse(){
        if(name === "" || files.length === 0){
            alert('Fill all text fields!')
        }else{
            setModalVisible(true);
            let formData = new FormData();
            formData.append('title',name);
            formData.append('course_id',selectedCourse);
            formData.append('content_type',selectedContentType);
            // let index = 0;
            // files.forEach((file)=>{
            //     if(selectedContentType === "pdf"){
            //         formData.append(`files[${index}]`,{uri:file.uri,name:file.uri.toString().split('/')[file.uri.toString().split('/').length - 1],type:'application/pdf'});
            //     }else{
            //         formData.append(`files[${index}]`,{uri:file.uri,name:file.uri.toString().split('/')[file.uri.toString().split('/').length - 1],type:'image/jpg'});

            //     }
            //     index = index + 1;
            // })
            formData.append("files",{uri:files.uri,name:files.name,type:'application/pdf'});
            insituteCustomRequestMultipart('addcontent',formData).then((res)=>{
                console.log(res);
                setModalVisible(false);
                if(res['message'] === "success" ){
                    Alert.alert("Content Added","Hurray! Your content has been added successfully",[
                        {
                            text:"OK",
                            onPress:()=>{
                                navigation.goBack();
                            }
                        }
                    ])
                }else{
                    alert('Something went wrong!');
                }
            })
        }
    }

    return (
        <View style={{flex:1}}>
            <Modal
                animationType="none"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
                >
                    <View style={{flex:1,alignItems:"center",justifyContent:"center",'alignItems':"center"}}>
                        <View style={{height:94,width:94,backgroundColor:"white",padding:12,borderRadius:5,elevation:2,justifyContent:"center"}}>
                            <ActivityIndicator color={colorPrimary} size="large"/>
                            <Text style={{color:colorPrimary,marginTop:6,textAlign:"center"}}>Creating</Text>
                        </View>
                    </View>
            </Modal>
            <View style={{height:60,backgroundColor:"white",flexDirection:"row",justifyContent:"space-between",alignItems:"center",paddingHorizontal:16,elevation:1}}>
                <StatusBar backgroundColor={colorPrimary}/>
                <Text style={{fontSize:20,color:colorPrimary}}>Add Course Content</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{paddingHorizontal:8,paddingVertical:8}}>
                    <View style={{elevation:1,marginVertical:3,borderRadius:3,paddingHorizontal:12,paddingVertical:10,backgroundColor:"white"}}>
                        <Text style={{color:colorPrimary}}>Select Course</Text>
                        <Picker 
                            selectedValue={selectedCourse}
                            onValueChange={(course)=>{
                                setSelectedCourse(course);
                            }}
                        >
                            <Picker.Item label="Free" value="free"/>
                            {pickerItems}
                        </Picker>
                    </View>
                    {/* <View style={{elevation:1,marginVertical:3,borderRadius:3,paddingHorizontal:12,paddingVertical:10,backgroundColor:"white"}}>
                        <Text style={{color:colorPrimary}}>Select Content File Type</Text>
                        <Picker 
                            selectedValue={selectedContentFileType}
                            onValueChange={(type)=>{
                                setSelectedContentFileType(type);
                            }}
                        >
                            <Picker.Item label="PDF" value="pdf"/>
                            <Picker.Item label="Image" value="image"/>
                        </Picker>
                    </View> */}
                    <View style={{elevation:1,marginVertical:3,borderRadius:3,paddingHorizontal:12,paddingVertical:10,backgroundColor:"white"}}>
                        <Text style={{color:colorPrimary}}>Select Content Type</Text>
                        <Picker 
                            selectedValue={selectedContentType}
                            onValueChange={(type)=>{
                                setSelectedContentType(type);
                            }}
                        >
                            <Picker.Item label="PDF" value="pdf"/>
                        </Picker>
                    </View>
                    <View style={{elevation:1,marginVertical:3,borderRadius:3,paddingHorizontal:12,paddingVertical:10,backgroundColor:"white"}}>
                        <Text style={{color:colorPrimary}}>Content Title</Text>
                        <TextInput style={{fontSize:16}} onChangeText={(text)=>{setName(text)}}/>
                    </View>
                    
                    <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginVertical:3}}>
                        <Text numberOfLines={1} style={{width:160}}>{files === null ? "Empty"  : files.uri}</Text>
                        <Button title={selectedContentFileType === "pdf" ? "Select PDF" : "Select Image"} onPress={handlePickImage}></Button>
                    </View>
                    <TouchableOpacity activeOpacity={0.8} onPress={handleCreateCourse}>
                        <View style={{alignSelf:"center",paddingHorizontal:16,paddingVertical:8,backgroundColor:colorPrimary,borderRadius:3,elevation:1,marginTop:8}}>
                            <Text style={{color:"white",fontSize:16}}>Add Content</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}