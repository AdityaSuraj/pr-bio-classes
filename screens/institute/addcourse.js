import React from 'react';
import { View ,StatusBar,Text, ScrollView, TextInput, TouchableOpacity, Button,Modal,ActivityIndicator, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import {useNavigation} from '@react-navigation/native';
import { colorPrimary } from '../../constants/colors';
import * as ImagePicker from 'expo-image-picker';
import { insituteCustomRequestMultipart } from '../../functions/request';

export default function AddCoursesScreen(){
    const navigation = useNavigation();
    let [name,setName] = React.useState('');
    let [price,setPrice] = React.useState('');
    let [salePrice,setSalePrice] = React.useState('');
    let [duration,setDuration] = React.useState('');
    let [about,setAbout] = React.useState('');
    let [thumbnail,setThumbnail] = React.useState(null);
    let [modalVisible,setModalVisible] = React.useState(false);

    function handlePickImage(){
        ImagePicker.launchImageLibraryAsync({mediaTypes:ImagePicker.MediaTypeOptions.Images,allowsEditing:true}).then((img)=>{
            console.log(img);
            setThumbnail(img);
        })
    }

    function handleCreateCourse(){
        if(name === "" || price === "" || salePrice === "" || about === "" ||duration === ""){
            alert('Fill all text fields!')
        }else{
            setModalVisible(true);
            let formData = new FormData();
            formData.append('name',name);
            formData.append('price',price);
            formData.append('sale_price',salePrice);
            formData.append('about',about);
            formData.append('duration',duration);
            formData.append('thumbnail',{name:thumbnail.uri.toString().split('/')[thumbnail.uri.toString().split('/').length - 1],type:"image/jpg",uri:thumbnail.uri});
            insituteCustomRequestMultipart('addcourse',formData).then((res)=>{
                setModalVisible(false);
                if(res['message'] === "success" ){
                    Alert.alert("Course created","Hurray! Course created successfully",[
                        {
                            text:"OK",
                            onPress:()=>{
                                navigation.replace('InstituteCoursesScreen')
                            }
                        }
                    ])
                }else{
                    console.log(res);
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
                        <Text style={{color:colorPrimary}}>Course Name</Text>
                        <TextInput style={{fontSize:16}} onChangeText={(text)=>{setName(text)}}/>
                    </View>
                    <View style={{elevation:1,marginVertical:3,borderRadius:3,paddingHorizontal:12,paddingVertical:10,backgroundColor:"white"}}>
                        <Text style={{color:colorPrimary}}>Price</Text>
                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <Icon name="inr" size={16}/>
                            <TextInput style={{fontSize:16,marginLeft:6,flex:1,height:40}} keyboardType="numeric" onChangeText={(text)=>{setPrice(text)}}/>
                        </View>
                    </View>
                    <View style={{elevation:1,marginVertical:3,borderRadius:3,paddingHorizontal:12,paddingVertical:10,backgroundColor:"white"}}>
                        <Text style={{color:colorPrimary}}>Sale Price</Text>
                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <Icon name="inr" size={16}/>
                            <TextInput style={{fontSize:16,marginLeft:6,flex:1,height:40}} keyboardType="numeric" onChangeText={(text)=>{setSalePrice(text)}} />
                        </View>
                    </View>
                    <View style={{elevation:1,marginVertical:3,borderRadius:3,paddingHorizontal:12,paddingVertical:10,backgroundColor:"white"}}>
                        <Text style={{color:colorPrimary}}>Duration</Text>
                        <TextInput style={{fontSize:16}} onChangeText={(text)=>{setDuration(text)}} />
                    </View>
                    <View style={{elevation:1,marginVertical:3,borderRadius:3,paddingHorizontal:12,paddingVertical:10,backgroundColor:"white"}}>
                        <Text style={{color:colorPrimary}}>About Course</Text>
                        <TextInput style={{fontSize:16}} numberOfLines={6} onChangeText={(text)=>{setAbout(text)}} multiline={true} />
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginVertical:3}}>
                        <Text numberOfLines={1} style={{width:160}}>{thumbnail == null ? "Empty"  : thumbnail.uri}</Text>
                        <Button title="Select Thumbnail" onPress={handlePickImage}></Button>
                    </View>
                    <TouchableOpacity activeOpacity={0.8} onPress={handleCreateCourse}>
                        <View style={{alignSelf:"center",paddingHorizontal:16,paddingVertical:8,backgroundColor:colorPrimary,borderRadius:3,elevation:1,marginTop:8}}>
                            <Text style={{color:"white",fontSize:16}}>Create Course</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}