import React from 'react';
import {View,Text, SafeAreaView,Image, ScrollView,TextInput, TouchableOpacity,ActivityIndicator} from 'react-native';
import Header from '../../components/header';
import { colorPrimary } from '../../constants/colors';
import {LinearGradient} from 'expo-linear-gradient';
import { height, width } from '../../constants/dimensions';
import Icon from 'react-native-vector-icons/Fontisto';
import { rootlink } from '../../constants/link';
import * as SecureStore from 'expo-secure-store';
import {useNavigation} from '@react-navigation/native';

async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }
  
  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    return result;
  }

const PDFScreen = ()=>{
    const navigation = useNavigation();
    let [subjects,setSubjects] = React.useState(null);
    let [loading,setLoading] = React.useState(false);

    React.useEffect(()=>{
        setLoading(true);
        getValueFor('studentdetail').then((value)=>{
            const json = JSON.parse(value);
            fetch(`${rootlink}/pdflist`,{method:"POST",
            headers:{
                'Accept':'application/json',
                'Content-Type': 'application/json',
            }
            ,body:JSON.stringify({"userid":json['id'],"school_id":json['school_id'],"class_id":json['class_id']})})
            .then(response => response.json())
            .then((json)=>{
                console.log(json);
                setLoading(false);
                if(json.length === 0 ){
                    setSubjects(
                        <View style={{height:height- 114,width:width - 24,overflow:"hidden",backgroundColor:"white",alignItems:"center",justifyContent:"center"}}>
                            <Image source={require('../../assets/online_video.png')} style={{resizeMode:"contain",height:width - 60 , width:width }}/>
                            <Text style={{fontWeight:"bold",fontSize:16,textAlign:"center",color:colorPrimary}}>Currently no any PDF{'\n'}for your class</Text>
                        </View>
                        )
                }else{
                    let data = json;
                    setSubjects(
                        data.map((subject)=>{
                            return (
                            <TouchableOpacity key={subject['name']} activeOpacity={0.8} onPress={()=>{navigation.navigate('SubjectPDFScreen',{pdfs:subject['pdfs'],title:subject['name']})}}>
                                <View  style={{backgroundColor:"white",padding:20,marginVertical:4}}>
                                    <Text style={{fontSize:24,color:colorPrimary}}>{subject['name']}</Text>
                                    <Text style={{fontSize:14,color:"black"}}>{subject['class']} | PDF</Text>
                                </View>
                            </TouchableOpacity>
                            )
                        })
                    )
                }
            })
        })
    },[])

    return (
        <View style={{flex:1}}>
            <Header pagename="PDF"/>
            {loading ? <View style={{flex:1,height:height,width:width,alignItems:"center",justifyContent:"center"}}>
                <ActivityIndicator color={colorPrimary} size="large"/>
            </View> :
            <ScrollView >
                <View style={{padding:12}}>
                    {/* <View style={{backgroundColor:"white",padding:20,marginVertical:4}}>
                        <Text style={{fontSize:24,color:colorPrimary}}>Section Name</Text>
                        <Text style={{fontSize:14,color:"black"}}>Class 13 | JEE Main</Text>
                    </View>
                    <View style={{backgroundColor:"white",padding:20,marginVertical:4}}>
                        <Text style={{fontSize:24,color:colorPrimary}}>Section Name</Text>
                        <Text style={{fontSize:14,color:"black"}}>Class 13 | JEE Main</Text>
                    </View>
                    <View style={{backgroundColor:"white",padding:20,marginVertical:4}}>
                        <Text style={{fontSize:24,color:colorPrimary}}>Section Name</Text>
                        <Text style={{fontSize:14,color:"black"}}>Class 13 | JEE Main</Text>
                    </View> */}
                    {subjects}
                </View>
            </ScrollView>
            }
        </View>
    )
}

export default PDFScreen;