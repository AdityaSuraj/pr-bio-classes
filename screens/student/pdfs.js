import React from 'react';
import {View,Text, SafeAreaView,Image, ScrollView,TextInput, TouchableOpacity, ActivityIndicator} from 'react-native';
import {useNavigation,useRoute} from '@react-navigation/native';
import { customRequest } from '../../functions/request';
import Header from '../../components/header';
import { colorPrimary } from '../../constants/colors';
import { height, width } from '../../constants/dimensions';
import Icon from 'react-native-vector-icons/Fontisto';


const StudentPDFScreen = ()=>{
    const navigation = useNavigation();
    const route = useRoute();
    let [pdfs,setPDFs] = React.useState(null);
    let [loading,setLoading] = React.useState(true);

    React.useEffect(()=>{
        customRequest('pdfs',{'course':route.params.course}).then((res)=>{
            setLoading(false);
            if(res['pdfs'].length === 0){
                setPDFs(
                    <View style={{height:height - 106 ,width:width -16 ,backgroundColor:"white",borderRadius:5,alignItems:"center",justifyContent:"center"}}>
                        <Image source={require('../../assets/online_video.png')} style={{resizeMode:"contain",height:240,width:"100%"}}/>
                        <Text style={{fontWeight:"bold",fontSize:16,color:colorPrimary,textAlign:"center"}}>Currently no any free{'\n'}PDF available</Text>
                    </View>
                )
            }else{
                setPDFs(
                    res['pdfs'].map((pdf)=>{
                        return (
                            <View key={pdf['id']} id={pdf['id']} style={{marginBottom:8,alignItems:"center",padding:8,width:width/2 - 12,borderRadius:5,overflow:"hidden",elevation:1,backgroundColor:"white"}}>
                                <Icon name="acrobat-reader" size={64}/>
                                <Text>{pdf['title']}</Text>
                                <TouchableOpacity activeOpacity={0.8} onPress={()=>{navigation.navigate('ViewPDFScreen',{title:pdf['title'],path:pdf['files']})}}>
                                    <View style={{width:160 - 16,marginTop:8,backgroundColor:colorPrimary,borderRadius:5,paddingVertical:4,justifyContent:"center",alignItems:"center"}}><Text style={{color:"white",fontWeight:"bold"}}>Read Now</Text></View>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                )
            }
        });
    },[])

    return (
        <View style={{flex:1}}>
            <Header pagename="PDF For You"/>
            {
                loading ? 
                <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                    <ActivityIndicator size="large" color={colorPrimary}/>
                </View>
                :
                <ScrollView >
                    <View style={{padding:8,flexWrap:"wrap",flexDirection:"row",justifyContent:"space-between"}}>
                        {pdfs}
                    </View>
                </ScrollView>
            }
        </View>
    )
}

export default StudentPDFScreen;