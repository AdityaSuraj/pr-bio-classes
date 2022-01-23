import React from 'react';
import {View,Text, Image, ScrollView, TouchableHighlight, Share, Button, TouchableOpacity, TextInput,Modal,ActivityIndicator} from 'react-native';
import { colorPrimary } from '../../constants/colors';
import Icon from 'react-native-vector-icons/Fontisto';
import { width } from '../../constants/dimensions';
import {useNavigation} from '@react-navigation/native';
import { customRequest, customRequestMultipart } from '../../functions/request';
import { getPlainValueFromStorage, getValueFromStorage, saveInStorage } from '../../functions/securestorage';
import * as ImagePicker from 'expo-image-picker';


function EditProfileScreen (){
    let [user,setUsername] = React.useState(null);
    let [img,setImg] = React.useState(null);
    let [password,setPassword] = React.useState('');
    let [confirmPassword,setConfirmPassword] = React.useState('');
    let [pin,setPin] = React.useState(null);
    const [modalVisible, setModalVisible] = React.useState(false);

    React.useEffect(()=>{
        getPlainValueFromStorage('studentname').then((res)=>{
            setUsername(res);
        })
    },[])

    function handleImagePick(){
        ImagePicker.launchImageLibraryAsync({mediaTypes:ImagePicker.MediaTypeOptions.Images,allowsEditing:true,allowsMultipleSelection:true}).then((res)=>{
            setImg(res);
        })
    }

    function handleSaveDate(){
        if(password.length < 8 || confirmPassword < 8){
            alert('Minimum 8 characters required!!');
        }else if(password !== confirmPassword){
            alert('Password didn\'t matched...');
        }else{
            setModalVisible(true);
            let formData = new FormData();
            // formData.append('img',{name:img.uri.toString().split('/')[img.uri.toString().split('/').length - 1],uri:img.uri,type:'image/jpg'});
            formData.append('password',password);
            customRequestMultipart('updateprofile',formData).then((res)=>{
                setModalVisible(false);
                // saveInStorage('studentdetail',JSON.stringify(res['data']))
                alert('Updated Successfully');
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
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
                }}
                >
                    <View style={{flex:1,alignItems:"center",justifyContent:"center",'alignItems':"center"}}>
                        <View style={{height:94,width:94,backgroundColor:"white",padding:12,borderRadius:5,elevation:2,justifyContent:"center"}}>
                            <ActivityIndicator color={colorPrimary} size="large"/>
                            <Text style={{color:colorPrimary,marginTop:6}}>Updating</Text>
                        </View>
                    </View>
            </Modal>
            <View style={{height:124 + 62,width:width}}>
                <View style={{backgroundColor:colorPrimary,height:124,width:width,position:"absolute",zIndex:-1}}/>
                <View style={{backgroundColor:"white",height:124,width:124,top:64,left:24,borderRadius:124,justifyContent:"center"}}>
                    {/* <TouchableOpacity onPress={handleImagePick}> */}
                    {/* <Image source={ require('../../assets/appicon.png')} style={{resizeMode:"cover",height:124,width:124,borderRadius:124}}/> */}
                        {/* <View style={{alignItems:"center",justifyContent:"center",height:44,width:44,backgroundColor:"white",position:"absolute",bottom:-5,right:-5,elevation:2,borderRadius:24}}>
                            <Icon name="file-1" size={20} style={{textAlign:"center"}}/>
                        </View> */}
                    {/* </TouchableOpacity> */}
                    <Icon name="person" size={74} style={{color:colorPrimary,alignSelf:"center"}}/>
                </View>
                <Text style={{position:"absolute",bottom: 64,right:24,color:'white',fontSize:24,left:width - 124 - 48 - 24}} numberOfLines={1}>{user == null ? "User Name" : user}</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{flex:1,paddingVertical:16,paddingHorizontal:16}}>
                    <View style={{backgroundColor:"white",paddingVertical:8,paddingHorizontal:16,borderRadius:5}}>
                        <TextInput placeholder="New Password" secureTextEntry={true} onChangeText={(txt)=>{setPassword(txt)}}/>
                    </View>
                    <View style={{backgroundColor:"white",paddingVertical:8,paddingHorizontal:16,borderRadius:5,marginTop:8}}>
                        <TextInput placeholder="Confirm Password" secureTextEntry={true} onChangeText={(txt)=>{setConfirmPassword(txt)}}/>
                    </View>
                    {/* <View style={{borderBottomWidth:1,borderBottomColor:"rgba(0,0,0,0.1)",paddingHorizontal:16,height:54,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                        <Text style={{fontSize:20,fontWeight:"bold"}}>Class</Text>
                        <Text style={{fontSize:16}}>{user == null ?  "Class" : user['class_name']}</Text>
                    </View>
                    <View style={{borderBottomWidth:1,borderBottomColor:"rgba(0,0,0,0.1)",paddingHorizontal:16,height:54,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                        <Text style={{fontSize:20,fontWeight:"bold"}}>School</Text>
                        <Text style={{fontSize:16}}>{user == null ?  "Class" : user['school_name']}</Text>
                    </View>
                    <View style={{borderBottomWidth:1,borderBottomColor:"rgba(0,0,0,0.1)",paddingHorizontal:16,height:54,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                        <Text style={{fontSize:20,fontWeight:"bold"}}>Pin</Text>
                        <View style={{paddingHorizontal:12,paddingVertical:4,backgroundColor:"rgba(255,102,0,0.1)",borderRadius:5}}>
                            <TextInput placeholder={user == null ? "Pin" :user['otp']} maxLength={4} keyboardType="numeric" onChangeText={(t)=>{setPin(t)}}/>
                        </View>
                    </View> */}
                </View> 
            </ScrollView>
            <TouchableOpacity onPress={handleSaveDate}>
                <View style={{backgroundColor:colorPrimary,paddingHorizontal:16,paddingVertical:12,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{fontSize:22,color:'white'}}>Update Password</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default EditProfileScreen;