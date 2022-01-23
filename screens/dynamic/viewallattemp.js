import React from 'react';
import {View,Text, ScrollView,TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/header';
import { colorPrimary } from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';


const AttempCard = (props)=>{
    const navigation = useNavigation()
    return (
        <View style={{borderColor:"rgba(0,0,0,0.1)",borderWidth:1,marginVertical:6,borderRadius:3,backgroundColor:"white"}}>
            <View style={{height:64,borderLeftColor:colorPrimary,borderWidth:2,borderBottomColor:"transparent",borderTopColor:"transparent",borderRightColor:"transparent",justifyContent:"center"}}>
                <Text style={{fontSize:20,marginLeft:12}}>{props.title == null ? "Special Friday Quiz" : props.title}</Text>
            </View>
            <View style={{paddingHorizontal:12,paddingVertical:12}}>
                <View style={{flexDirection:"row",alignItems:"center",marginBottom:12}}>
                    <Text style={{color:"gray"}}>Duration: 03 minutes</Text>
                    <Text style={{color:"gray",marginLeft:20}}>Total Marks: 60</Text>
                </View>
                <View style={{backgroundColor:"rgba(0,0,0,0.1)",height:1}}/>
                <TouchableHighlight onPress={()=>{navigation.navigate('InstructionScreen',{title:props.title})}} underlayColor="transparent">
                    <View style={{alignSelf:"flex-end",alignItems:"center",flexDirection:"row",marginTop:12}}>
                        <Text style={{color:colorPrimary,fontSize:16}}>ATTEMPT NOW</Text>
                        <Icon name="chevron-right" size={22} color={colorPrimary}/>
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    )
}

const AttempTitle = (props)=>{
    return (
    <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:12}}>
        <Text style={{fontWeight:"bold",fontSize:15}}>{props.title}</Text>
        <View style={{flexDirection:"row",alignItems:"center"}}>
            <Text style={{color:"gray",fontSize:13,fontWeight:"bold"}}>VIEW ALL</Text>
            <Icon name="chevron-right" size={16}/>
        </View>
    </View>
    )
}

export default function ViewAllAttempScreen({route}){
    return (
        <View style={{flex:1}}>
            <Header pagename={route.params.title} isShowNotiBell={false}/>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{paddingHorizontal:12,paddingVertical:12}}>
                    <AttempCard title="Friday Special Quiz"/>
                    <AttempCard title="Baisc Biology Quiz"/>
                    <AttempCard title="Baisc Biology Quiz"/>
                    <AttempCard title="Baisc Biology Quiz"/>
                    <AttempCard title="Baisc Biology Quiz"/>
                    <AttempCard title="Baisc Biology Quiz"/>
                    <AttempCard title="Baisc Biology Quiz"/>
                </View>
            </ScrollView>
        </View>
    )
}