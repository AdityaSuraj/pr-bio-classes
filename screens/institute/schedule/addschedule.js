import React from 'react';
import { View ,StatusBar,Text, ScrollView, TextInput, TouchableOpacity, Button,Modal,ActivityIndicator, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import {useNavigation} from '@react-navigation/native';
import { colorPrimary } from '../../../constants/colors';
import * as ImagePicker from 'expo-image-picker';
import { insituteCustomRequestMultipart, instituteCustomRequest } from '../../../functions/request';
import DateTimePicker from '@react-native-community/datetimepicker';
import { width } from '../../../constants/dimensions';
import {Picker} from '@react-native-picker/picker';

export default function AddScheduleScreen(){
    const navigation = useNavigation();
    let [name,setName] = React.useState('');
    let [duration,setDuration] = React.useState('');
    let [about,setAbout] = React.useState('');
    let [thumbnail,setThumbnail] = React.useState(null);
    let [modalVisible,setModalVisible] = React.useState(false);
    let [showTimePicker,setShowTimePicker] = React.useState(false);
    let [showDatePicker,setShowDatePicker] = React.useState(false);
    let [selectedCourse,setSelectedCourse] = React.useState(1);
    let [selectedTime,setSelectedTime] = React.useState(new Date());
    let [selectedDate,setSelectedDate] = React.useState(new Date());
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
        if(name === "" || about === "" ||duration === ""){
            alert('Fill all text fields!')
        }else{
            setModalVisible(true);
            let formData = new FormData();
            formData.append('course_id',selectedCourse)
            formData.append('name',name);
            formData.append('time',selectedTime.toLocaleTimeString());
            formData.append('date',`${selectedDate.getFullYear()}-${selectedDate.getMonth()}-${selectedDate.getDate()}`);
            formData.append('about',about);
            formData.append('duration',duration);
            formData.append('thumbnail',{name:thumbnail.uri.toString().split('/')[thumbnail.uri.toString().split('/').length - 1],type:"image/jpg",uri:thumbnail.uri});
            insituteCustomRequestMultipart('addschedule',formData).then((res)=>{
                setModalVisible(false);
                console.log(res);
                if(res['message'] === "success" ){

                    Alert.alert("Course created","Hurray! schedule created successfully",[
                        {
                            text:"OK",
                            onPress:()=>{
                                navigation.replace('InstituteScheduleScreen')
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
                <Text style={{fontSize:20,color:colorPrimary}}>Create Schedule</Text>
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
                            {pickerItems}
                        </Picker>
                    </View>
                    <View style={{elevation:1,marginVertical:3,borderRadius:3,paddingHorizontal:12,paddingVertical:10,backgroundColor:"white"}}>
                        <Text style={{color:colorPrimary}}>Schedule Title</Text>
                        <TextInput style={{fontSize:16}} onChangeText={(text)=>{setName(text)}}/>
                    </View>
                    <View style={{flexDirection:"row",alignItems:"center",marginVertical:3,justifyContent:"space-between"}}>
                        <TouchableOpacity activeOpacity={0.8} onPress={()=>{setShowTimePicker(true)}}>
                            <View style={{flexDirection:"row",elevation:1,alignItems:"center",paddingHorizontal:12,paddingVertical:12,backgroundColor:"white",borderRadius:3,width:(width- 12)/2  - 4}}>
                                <Icon name='clock' size={20}/>
                                <Text style={{marginLeft:6,fontSize:16}}>{selectedTime.toLocaleTimeString('hi-IN',{hour:"numeric",minute:"numeric",hour12: true})}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={()=>{setShowDatePicker(true)}}>
                            <View style={{flexDirection:"row",elevation:1,alignItems:"center",paddingHorizontal:12,paddingVertical:12,backgroundColor:"white",borderRadius:3,width:(width- 12)/2  - 4}}>
                                <Icon name='calendar' size={20}/>
                                <Text style={{marginLeft:6,fontSize:16}}>{selectedDate.getDate()}/{selectedDate.getMonth()}/{selectedDate.getFullYear()}</Text>
                            </View>
                        </TouchableOpacity>
                        {
                            (showTimePicker || showDatePicker) && 
                            <DateTimePicker
                                value={selectedTime}
                                mode={showDatePicker ? "date" : "time"}
                                display="default"
                                onChange={(event,currentDate)=>{
                                    setShowTimePicker(false);
                                    setShowDatePicker(false);
                                    setSelectedDate(currentDate)
                                    setSelectedTime(currentDate)
                                    console.log(currentDate);
                                }}
                            />
                        }
                    </View>
                    <View style={{elevation:1,marginVertical:3,borderRadius:3,paddingHorizontal:12,paddingVertical:10,backgroundColor:"white"}}>
                        <Text style={{color:colorPrimary}}>Duration</Text>
                        <TextInput style={{fontSize:16}} onChangeText={(text)=>{setDuration(text)}} />
                    </View>
                    <View style={{elevation:1,marginVertical:3,borderRadius:3,paddingHorizontal:12,paddingVertical:10,backgroundColor:"white"}}>
                        <Text style={{color:colorPrimary}}>About Class      </Text>
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