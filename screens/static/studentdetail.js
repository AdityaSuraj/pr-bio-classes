import React from 'react';
import {View,Text, SafeAreaView,Image, ScrollView,TextInput,Button,ActivityIndicator} from 'react-native';
import Header from '../../components/header';
import { colorPrimary } from '../../constants/colors';
import {LinearGradient} from 'expo-linear-gradient';
import { height, width } from '../../constants/dimensions';
import Icon from 'react-native-vector-icons/Fontisto';
import {useNavigation} from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { rootlink } from '../../constants/link';
import {Picker} from '@react-native-picker/picker';

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  return result;
}

async function deleteFromStorage(key) {
    let result = await SecureStore.deleteItemAsync(key);
}

const StudentDetailScreen = ()=>{
    const navigation = useNavigation();
    let [name,setName] = React.useState('');
    let [email,setEmail] = React.useState('');
    let [isLoading,setIsLoading] = React.useState(false);
    let [stuid,setStuid] = React.useState();
    let [selectedSchool,setSelectedSchool] = React.useState('');
    let [selectedClass,setSelectedClass] = React.useState('');
    let [schools,setSchools] = React.useState(null);
    let [classes,setClasses] = React.useState(null);

    React.useEffect(()=>{
        getValueFor('studentid').then((value)=>{
            setStuid(value);
        })

        getValueFor('schools').then((value)=>{
            let schools = JSON.parse(value);
            setSchools(
                schools.map((e)=>{
                    return <Picker.Item key={e['id']} value={e['id']} label={e['name']}/>
                })
            );
            setClasses(
                schools[0]['school_classes'].map((e)=>{
                    return <Picker.Item key={e['id'] + 5} value={e['id']} label={e['name']}/>
                })
            )
           
        });
    },[]);

    function handlePhoneRegistration(){
        setIsLoading(true);
        fetch(`${rootlink}/addstudentdetail`,{method:"POST",
        mode:"same-origin",
        credentials:'same-origin',
        headers:{
            'Accept':       'application/json',
            'Content-Type': 'application/json',
        }
        ,body:JSON.stringify(
            {
                'id':`${stuid}`,
                'name':name,
                'email':email,
                'class_id':selectedClass,
                'school_id':selectedSchool,
            }
        )})
        .then(response => response.json())
        .then((json)=>{
            setIsLoading(false);
            if(json['msg'] === "added successfully"){
                save('studentdetail',JSON.stringify(json['data']));
                save('detailended','yes');
                navigation.navigate('TabNavigation');
            }else if(json['msg'] == "Email already exists"){
                alert(json['msg']);
            }else{
                alert('Someting went wrong!!!');
            }
        })
    }

    return (
        
        <View style={{flex:1,backgroundColor:"rgba(255,165,0,0.05)",position:"relative"}}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{margin:10,borderRadius:5,backgroundColor:"white",alignItems:"center",padding:16}}>
                    <Image source={require("../../assets/logo.png")} style={{resizeMode:"contain",height:120,width:width,alignSelf:"center"}}/>
                    <Text style={{fontSize:18,fontWeight:"bold"}}>Fill Details</Text>
                    <View style={{borderRadius:5,borderWidth:1,borderColor:"gray",width:width-94,paddingHorizontal:12,paddingVertical:8,marginVertical:8,flexDirection:"row",alignItems:"center"}}>
                        <Icon name="person" size={18}/>
                        <TextInput placeholder="Name" style={{fontSize:16,marginLeft:12,flex:1}} onChangeText={(text)=>{setName(text);}} keyboardType="web-search" maxLength={24}/>
                    </View>
                    <View style={{borderRadius:5,borderWidth:1,borderColor:"gray",width:width-94,paddingHorizontal:12,paddingVertical:8,marginVertical:8,flexDirection:"row",alignItems:"center"}}>
                        <Icon name="email" size={18}/>
                        <TextInput placeholder="Email" style={{fontSize:16,marginLeft:12,flex:1}} onChangeText={(text)=>{setEmail(text);}} keyboardType="email-address" maxLength={36}/>
                    </View>
                    <View style={{borderRadius:5,borderWidth:1,borderColor:"gray",width:width-94,height:50,paddingHorizontal:12,paddingVertical:8,marginVertical:8,flexDirection:"row",alignItems:"center"}}>
                        <Icon name="crosshairs" size={18}/>
                        {/* <TextInput placeholder="School" style={{fontSize:16,marginLeft:12,flex:1}} onChangeText={(text)=>{setPreparingFor(text);}} keyboardType="web-search" maxLength={24}/> */}
                        <View style={{flex:1}}>
                            <Picker
                                selectedValue={selectedSchool}
                                onValueChange={(value,index)=>{
                                    setSelectedSchool(value);
                                    getValueFor('schools').then((val)=>{
                                        let json = JSON.parse(val);
                                        json.forEach(school => {
                                            if(school['id'] === selectedSchool){
                                                setClasses(
                                                    school['school_classes'].map((e)=>{
                                                        return <Picker.Item key={e['id'] + 5} value={e['id']} label={e['name']}/>
                                                    })
                                                );
                                            }
                                        });
                                    })
                                }}
                            >
                                {schools}
                            </Picker>
                        </View>
                    </View>
                    <View style={{borderRadius:5,borderWidth:1,borderColor:"gray",width:width-94,height:50,paddingHorizontal:12,paddingVertical:8,marginVertical:8,flexDirection:"row",alignItems:"center"}}>
                        <Icon name="laptop" size={18}/>
                        {/* <TextInput placeholder="Class" style={{fontSize:16,marginLeft:12,flex:1}} onChangeText={(text)=>{setClassid(text);}} keyboardType="web-search" maxLength={10}/> */}
                        <View style={{flex:1}}>
                            <Picker
                                    selectedValue={selectedClass}
                                    onValueChange={(value,index)=>{setSelectedClass(value)}}
                                >
                                    {classes}
                                </Picker>
                        </View>

                    </View>
                    <View style={{marginVertical:12}}>
                        <Button title="Submit" onPress={handlePhoneRegistration} color={colorPrimary}></Button>
                    </View>
                </View>
            </ScrollView>
            {isLoading ? 
            <View style={{position:"absolute",top:0,left:0,right:0,bottom:0,alignItems:"center",justifyContent:"center",backgroundColor:"rgba(0,0,0,0.2)"}}>
                <ActivityIndicator size='large' color={colorPrimary}/>
            </View> 
            : <View/> 
            }
        </View>
    )
}

export default StudentDetailScreen;