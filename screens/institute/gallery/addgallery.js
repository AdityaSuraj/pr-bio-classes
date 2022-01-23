import React from 'react';
import { View ,StatusBar,Text, ScrollView,Image, TextInput, TouchableOpacity, Button,Modal,ActivityIndicator, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import {useNavigation} from '@react-navigation/native';
import { colorPrimary } from '../../../constants/colors';
import * as ImagePicker from 'expo-image-picker';
import { insituteCustomRequestMultipart, instituteCustomRequest } from '../../../functions/request';
import {Picker} from '@react-native-picker/picker';
import { width } from '../../../constants/dimensions';


export default function AddGalleryScreen(){
    const navigation = useNavigation();
    let [name,setName] = React.useState('');
    let [thumbnail,setThumbnail] = React.useState(null);
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

    function handlePickImage(){
        ImagePicker.launchImageLibraryAsync({mediaTypes:ImagePicker.MediaTypeOptions.Images,allowsEditing:true}).then((img)=>{
            console.log(img);
            setThumbnail(img);
        })
    }

    function handleCreateCourse(){
        if(name === "" || thumbnail === null){
            alert('Fill all text fields!')
        }else{
            setModalVisible(true);
            let formData = new FormData();
            formData.append('name',name);
            formData.append('course_id',selectedCourse);
            formData.append('thumbnail',{name:thumbnail.uri.toString().split('/')[thumbnail.uri.toString().split('/').length - 1],type:"image/jpg",uri:thumbnail.uri});
            insituteCustomRequestMultipart('addgallery',formData).then((res)=>{
                console.log(res);
                setModalVisible(false);
                if(res['message'] === "success" ){
                    Alert.alert("Gallery Item Added","Hurray! image added to your gallery successfully",[
                        {
                            text:"OK",
                            onPress:()=>{
                                navigation.replace('InstituteGalleryScreen')
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
                <Text style={{fontSize:20,color:colorPrimary}}>Add Course</Text>
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
                            <Picker.Item  label="Common" value="common" />
                            {pickerItems}
                        </Picker>
                    </View>
                    <View style={{elevation:1,marginVertical:3,borderRadius:3,paddingHorizontal:12,paddingVertical:10,backgroundColor:"white"}}>
                        <Text style={{color:colorPrimary}}>Gallery Title</Text>
                        <TextInput style={{fontSize:16}} onChangeText={(text)=>{setName(text)}}/>
                    </View>
                    {
                        thumbnail !== null  ?
                        <Image source={{uri:thumbnail.uri}} style={{height:140,width:width - 12,resizeMode:"cover",borderRadius:3}}/>
                        : <View/>
                    }
                    <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginVertical:3}}>
                        <Text numberOfLines={1} style={{width:160}}>{thumbnail == null ? "Empty"  : thumbnail.uri}</Text>
                        <Button title="Select Image" onPress={handlePickImage}></Button>
                    </View>
                    <TouchableOpacity activeOpacity={0.8} onPress={handleCreateCourse}>
                        <View style={{alignSelf:"center",paddingHorizontal:16,paddingVertical:8,backgroundColor:colorPrimary,borderRadius:3,elevation:1,marginTop:8}}>
                            <Text style={{color:"white",fontSize:16}}>Add To Gallery</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}