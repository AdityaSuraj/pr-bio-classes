import React from 'react';
import {View,Text, SafeAreaView} from 'react-native';
import Header from '../../components/header';
import { colorPrimary } from '../../constants/colors';
import {LinearGradient} from 'expo-linear-gradient';
import { height, width } from '../../constants/dimensions';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PlayScreen = ()=>{
    return (
        <View style={{flex:1,backgroundColor:"rgba(255,165,0,0.05)",height:height}}>
            <Header pagename="Play"/>
            <LinearGradient colors={[colorPrimary, 'orange']} start={{x:0,y:0}} end={{x:1,y:1}} style={{height:height/ 2 - 40,width:width,position:"absolute",bottom:0,borderTopRightRadius:100,borderTopLeftRadius:100}}/>
            <View style={{flex:1,alignItems:"center",paddingHorizontal:12,justifyContent:'center'}}>
                <Text style={{fontSize:16,color:"gray",marginTop:12}}>Next Game Starts at</Text>
                <Text style={{fontSize:20,fontWeight:"bold"}}>11:00 AM, Today</Text>
                <Text style={{fontSize:28,fontWeight:"bold",marginVertical:16}}>₹500 Prize</Text>
                <View style={{width:width - 24,marginHorizontal:12,backgroundColor:"white",borderRadius:16}}>
                    <View style={{padding:16}}>
                        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                            <Text style={{color:"gray",fontWeight:"bold",fontSize:15}}>Quiz Topic</Text>
                            <Text style={{fontWeight:"bold",fontSize:15}}>Special Unit Conversion</Text>
                        </View>
                        <Text style={{fontWeight:"bold",fontSize:18,alignSelf:"flex-end"}}>Quiz</Text>
                        <View style={{justifyContent:"center",alignItems:"center",height:54,width:width - 60,backgroundColor:"rgba(0,0,0,0.3)",borderRadius:10,marginVertical:6}}>
                            <Text style={{color:"white",fontSize:16}}>Join the Game</Text>
                        </View>
                        <Text style={{alignSelf:"center",marginVertical:12,color:colorPrimary,fontWeight:"bold",fontSize:16}}>Remind Me</Text>
                    </View>
                    <View style={{borderWidth:1,borderColor:"rgba(0,0,0,0.1)",height:72,width:width - 24,flexDirection:"row",alignItems:'center',justifyContent:"space-between",paddingHorizontal:16}}>
                        <Text>Total Earning</Text>
                        <Text>0</Text>
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",height:64,paddingHorizontal:16}}>
                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <Icon name="favorite" size={28} color="red"/>
                            <Text style={{fontSize:18,fontWeight:"bold",marginLeft:4}}>1 Live</Text>
                        </View>
                        <Text style={{fontSize:16,fontWeight:"bold",color:colorPrimary}}>Earn More</Text>
                    </View>
                </View>
                <View style={{width:width-24,flexDirection:"row",marginVertical:16,justifyContent:"space-between"}}>
                    <View style={{flexDirection:"row",alignItems:"center",height:54,width:width - 90,backgroundColor:"white",borderRadius:10,paddingHorizontal:16}}>
                        <Icon name="leaderboard" size={24} color={colorPrimary}/>
                        <Text style={{color:colorPrimary,fontSize:16,marginLeft:54}}>Leaderboard</Text>
                    </View>
                    <View style={{alignItems:"center",justifyContent:"center",height:54,width:54,backgroundColor:"white",borderRadius:10}}>
                        <Icon name="share" size={24} color={colorPrimary}/>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default PlayScreen;