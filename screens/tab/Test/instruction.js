import React from 'react';
import {View,Text, ScrollView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../../components/header';
import {useNavigation,useRoute} from '@react-navigation/native';
import { colorPrimary } from '../../../constants/colors';
import { width } from '../../../constants/dimensions';


export default function InstructionScreen(){
    const route = useRoute();
    const navigation = useNavigation();
    return (
        <View style={{flex:1}}>
            <Header pagename={route.params.data['title']} isShowNotiBell={false}/>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{flexDirection:"row",alignItems:"center",height:74,backgroundColor:"rgba(255,165,0,0.1)"}}>
                    <Icon name="chevron-left" size={54} color={colorPrimary}/>
                    <View>
                        <Text style={{fontSize:16}}><Text style={{fontWeight:"bold"}}>Test:</Text> {route.params.data['title']}</Text>
                        <Text style={{fontSize:16}}><Text style={{fontWeight:"bold"}}>Duration:</Text> {route.params.data['duration']} minutes</Text>
                    </View>
                </View>
                <View style={{paddingHorizontal:12,paddingVertical:12,alignItems:"center"}}>
                    <Text style={{fontSize:24,fontWeight:"600",marginVertical:16}}>Instructions</Text>
                    <View style={{padding:24,backgroundColor:"white",width:width-24,borderRadius:3,elevation:2}}>
                        <View style={{flexDirection:"row",marginVertical:8}}>
                            <Icon name="chevron-right" size={14} style={{marginTop:3}}/>
                            <Text style={{fontSize:14}}>{route.params.data['instructions']}</Text>
                        </View>
                        {/* <View style={{flexDirection:"row",marginVertical:8}}>
                            <Icon name="chevron-right" size={14} style={{marginTop:3}}/>
                            <Text style={{fontSize:14}}>Questions may have negative marks, be careful while attempting a question.</Text>
                        </View>
                        <View style={{flexDirection:"row",marginVertical:8}}>
                            <Icon name="chevron-right" size={14} style={{marginTop:3}}/>
                            <Text style={{fontSize:14}}>Questions may have negative marks, be careful while attempting a question.</Text>
                        </View>
                        <View style={{flexDirection:"row",marginVertical:8}}>
                            <Icon name="chevron-right" size={14} style={{marginTop:3}}/>
                            <Text style={{fontSize:14}}>Questions may have negative marks, be careful while attempting a question.</Text>
                        </View> */}
                        <TouchableOpacity onPress={()=>{navigation.navigate("QuizScreen",{data:route.params.data,subject:route.params.subject,mcqid:route.params.mcqid})}} activeOpacity={0.8}>
                            <View style={{width:width - 90,height:44,backgroundColor:colorPrimary,borderRadius:8,marginTop:16,alignSelf:"center",justifyContent:"center",alignItems:"center"}}>
                                    <Text style={{fontSize:18,color:"white",fontWeight:"bold"}}>START TEST</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}