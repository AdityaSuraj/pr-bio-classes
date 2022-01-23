import React from 'react';
import {View,Text, SafeAreaView,Image, ScrollView,TextInput, TouchableHighlight, TouchableOpacity} from 'react-native';
import Header from '../../components/header';
import { colorPrimary } from '../../constants/colors';
import {LinearGradient} from 'expo-linear-gradient';
import { height, width } from '../../constants/dimensions';
import Icon from 'react-native-vector-icons/Fontisto';
import {useNavigation} from '@react-navigation/native';

const MyContentScreen = ()=>{
    const navigation = useNavigation();

    return (
        <View style={{flex:1,backgroundColor:"rgba(255,165,0,0.05)"}}>
            <Header pagename="My Contents"/>
            <ScrollView >
                <View style={{paddingHorizontal:12,paddingVertical:12}}>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{navigation.navigate('DoubtsScreen')}}>
                        <View style={{flexDirection:"row",alignItems:"center",padding:20,backgroundColor:"white",borderRadius:4,marginVertical:4}}>
                            <Icon name="camera" size={26} color={colorPrimary}/>
                            <Text style={{fontSize:20,marginLeft:16}}>Doubts</Text>
                            <Icon name="angle-right" size={14} color="black" style={{marginLeft:"auto"}}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} onPress={()=>{navigation.navigate('HomeworkScreen')}}>
                        <View style={{flexDirection:"row",alignItems:"center",padding:20,backgroundColor:"white",borderRadius:4,marginVertical:4}}>
                            <Icon name="flag" size={26} color={colorPrimary}/>
                            <Text style={{fontSize:20,marginLeft:16}}>Homework</Text>
                            <Icon name="angle-right" size={14} color="black" style={{marginLeft:"auto"}}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} onPress={()=>{navigation.navigate('AssignmentScreen')}}>
                        <View style={{flexDirection:"row",alignItems:"center",padding:20,backgroundColor:"white",borderRadius:4,marginVertical:4}}>
                            <Icon name="desktop" size={26} color={colorPrimary}/>
                            <Text style={{fontSize:20,marginLeft:16}}>Assignments</Text>
                            <Icon name="angle-right" size={14} color="black" style={{marginLeft:"auto"}}/>
                        </View>
                    </TouchableOpacity>
                    {/* <View style={{flexDirection:"row",alignItems:"center",padding:20,backgroundColor:"white",borderRadius:4,marginVertical:4}}>
                        <Icon name="calendar" size={26} color={colorPrimary}/>
                        <Text style={{fontSize:20,marginLeft:16}}>Tests</Text>
                        <Icon name="angle-right" size={14} color="black" style={{marginLeft:"auto"}}/>
                    </View> */}
                    
                </View>
            </ScrollView>
        </View>
    )
}

export default MyContentScreen;