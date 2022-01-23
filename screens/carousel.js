import React from 'react';
import {View,Text,Image,StatusBar, TouchableHighlight} from 'react-native';
import { colorPrimary } from '../constants/colors';
import { width } from '../constants/dimensions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Carousel from 'react-native-snap-carousel';
import * as SecureStore from 'expo-secure-store';
import {useNavigation} from '@react-navigation/native';
import updatetoken from '../functions/updatetoken';
import { getPlainValueFromStorage } from '../functions/securestorage';

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    return result;
  }
  


const CarouselsScreen = ()=>{
    const navigation = useNavigation();

    React.useEffect(()=>{
        getPlainValueFromStorage('carouselended').then((res)=>{
            if(res === 'yes'){
                getPlainValueFromStorage('role').then((res)=>{
                    if(res === "teacher" ){
                        navigation.navigate('TeacherTabNavigation')
                    }else if(res === "student"){
                        navigation.navigate('TabNavigation')
                    }
                })
            }
        })
    },[]);

    let [activeSlideIndex,setActiveSlideIndex] = React.useState(0);

    const carouselitem = ({item,index})=>{
        return (
            <View style={{flex:1}}>
                <Text style={{fontSize:22,textAlign:"center",paddingHorizontal:64,paddingVertical:24}}>{item.text}</Text>
                <Image source={item.img} style={{width:width,height:200,resizeMode:"contain"}}/>
            </View>
        )
    }
    const carouselData = [];
    carouselData.push({"img":require('../assets/videocall.png'),"text":"Attemp Quizzes & Moct Tests to get an edge over others"});
    carouselData.push({"img":require('../assets/communication.png'),"text":"Attend Live Classes everyday with Master Teachers"});
    carouselData.push({"img":require("../assets/booklover.png"),"text":"One-Stop-Solution for all your Study Material needs"})

    return (
        <View style={{flex:1}}>
            <StatusBar backgroundColor={colorPrimary}/>
            <View style={{flexDirection:"row",alignItems:"center",margin:20}}>
                <Icon name="help" color={colorPrimary} style={{marginLeft:"auto"}} size={20}/>
                <Text style={{alignSelf:"flex-end",color:colorPrimary,fontSize:16}}>Help</Text>
            </View>
            <View style={{flex:1,marginTop:28}}>
                <Carousel
                    layout="default"
                    autoplay={true}
                    loop={true}
                    data={carouselData}
                    renderItem={carouselitem}
                    itemWidth={width - 24}
                    sliderWidth={width}
                    onSnapToItem={(index) => { setActiveSlideIndex(index)} }
                /> 
            </View>
                <View style={{zIndex:1,flexDirection:'row',alignItems:'center',borderRadius:60,width:width - 90,height:54,position:"absolute",bottom:128,backgroundColor:colorPrimary,alignSelf:"center",alignItems:"center",justifyContent:"center"}}>
                    <TouchableHighlight onPress={()=>{navigation.navigate('StudentLoginScreen');save('carouselended',"yes")}} underlayColor="transparent">
                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <Text style={{color:"white",fontSize:16}}>
                                Continue As Student
                            </Text>
                            <Icon name="chevron-right" color="white" size={20}/>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={{zIndex:1,flexDirection:'row',alignItems:'center',borderRadius:60,width:width - 90,height:54,position:"absolute",bottom:64,backgroundColor:colorPrimary,alignSelf:"center",alignItems:"center",justifyContent:"center"}}>
                    <TouchableHighlight onPress={()=>{navigation.navigate('TeacherLoginScreen');save('carouselended',"yes")}} underlayColor="transparent">
                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <Text style={{color:"white",fontSize:16}}>
                                Continue As Teacher
                            </Text>
                            <Icon name="chevron-right" color="white" size={20}/>
                        </View>
                    </TouchableHighlight>
                </View>
        </View>
    )
}

export default CarouselsScreen;