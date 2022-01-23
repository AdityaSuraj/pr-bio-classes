import React from 'react';
import { View ,StatusBar,Text, ScrollView,Image, TextInput, TouchableOpacity, Button,Modal,ActivityIndicator, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import {useNavigation} from '@react-navigation/native';
import { colorPrimary } from '../../../constants/colors';
import * as ImagePicker from 'expo-image-picker';
import { insituteCustomRequestMultipart, instituteCustomRequest } from '../../../functions/request';
import {Picker} from '@react-native-picker/picker';
import { width } from '../../../constants/dimensions';


export default function AddVideoScreen(){
    const navigation = useNavigation();
    let [name,setName] = React.useState('');
    let [videolink,setVideolink] = React.useState('');
    let [modalVisible,setModalVisible] = React.useState(false);
    let [selectedCourse,setSelectedCourse] = React.useState('');
    let [pickerItems,setPickerItems] = React.useState(null);


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


    function handleCreateCourse(){
        if(name === "" ){
            alert('Fill all text fields!')
        }else{
            setModalVisible(true);
            let formData = new FormData();
            formData.append('description',name);
            formData.append('course_id',selectedCourse);
            formData.append('video_link',videolink);
            insituteCustomRequestMultipart('addvideo',formData).then((res)=>{
                console.log(res);
                setModalVisible(false);
                if(res['message'] === "success" ){
                    Alert.alert("Video Added","Hurray! Video added successfully to your list",[
                        {
                            text:"OK",
                            onPress:()=>{
                                navigation.replace('InstituteVideoScreen')
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
                <Text style={{fontSize:20,color:colorPrimary}}>Add Video</Text>
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
                            <Picker.Item  label="Free" value="free" />
                            {pickerItems}
                        </Picker>
                    </View>
                    <View style={{elevation:1,marginVertical:3,borderRadius:3,paddingHorizontal:12,paddingVertical:10,backgroundColor:"white"}}>
                        <Text style={{color:colorPrimary}}>Video Link</Text>
                        <TextInput style={{fontSize:16}} onChangeText={(text)=>{setVideolink(text)}}/>
                    </View>
                    
                    <View style={{elevation:1,marginVertical:3,borderRadius:3,paddingHorizontal:12,paddingVertical:10,backgroundColor:"white"}}>
                        <Text style={{color:colorPrimary}}>Video Description</Text>
                        <TextInput style={{fontSize:16}} onChangeText={(text)=>{setName(text)}} numberOfLines={4}/>
                    </View>
                    
                    <TouchableOpacity activeOpacity={0.8} onPress={handleCreateCourse}>
                        <View style={{alignSelf:"center",paddingHorizontal:16,paddingVertical:8,backgroundColor:colorPrimary,borderRadius:3,elevation:1,marginTop:8}}>
                            <Text style={{color:"white",fontSize:16}}>Add Video</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}