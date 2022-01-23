import React from 'react';
import {View,Text, Image, ScrollView, TouchableHighlight, Share, Button, TouchableOpacity,RefreshControl} from 'react-native';
import { colorPrimary } from '../../constants/colors';
import Icon from 'react-native-vector-icons/Fontisto';
import { width } from '../../constants/dimensions';
import {useNavigation} from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { customRequest } from '../../functions/request';
import { getValueFromStorage } from '../../functions/securestorage';


async function deleteFromStorage(key) {
    let result = await SecureStore.deleteItemAsync(key);
}

function InstituteProfileScreen (){
    const navigation = useNavigation();

    function handleLogout(){
        deleteFromStorage("carouselended");
        deleteFromStorage('token');
        customRequest('logout');
        navigation.replace('CarouselScreen');
    }

 
    return (
        <View style={{flex:1}}>
            {/* <Button title="test" onPress={()=>{alert(userdetail['email'])}}></Button> */}
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* <TouchableOpacity onPress={()=>{navigation.navigate('EditInstituteProfileScreen')}}> */}
                    <View style={{flexDirection:"row",alignItems:"center",paddingHorizontal:12,paddingVertical:12}}>
                        <Image source={require("../../assets/prlogo.png")} style={{height:76,width:76,borderRadius:90,resizeMode:"cover",backgroundColor:"white"}}/>
                        <Text style={{fontSize:20,marginLeft:14}}>{"PR Bio Classes"}</Text>
                        <Icon name="angle-right" style={{marginLeft:"auto",marginRight:12}}/>
                    </View>
                {/* </TouchableOpacity> */}
                <View style={{height:2,width:width,backgroundColor:"rgba(0,0,0,0.1)"}}></View>
                <View style={{paddingHorizontal:12}}>
                    <TouchableHighlight onPress={()=>{navigation.navigate('StudentClassVideoScreen')}} underlayColor="rgba(0,0,0,0.01)">
                        <View style={{flexDirection:"row",alignItems:"center",height:64}}>
                            <Icon name="play" style={{fontSize:20,marginRight:16}}/>
                            <View>
                                <Text style={{fontSize:18,fontWeight:"bold"}}>Classroom</Text>
                                <Text style={{fontSize:12,color:"gray"}}>Live Classes And Recorded Videos</Text>
                            </View>
                            <Icon name="angle-right" style={{marginLeft:"auto",marginRight:12}}/>
                        </View> 
                    </TouchableHighlight>
                    <View style={{height:1,backgroundColor:"rgba(0,0,0,0.1)"}}></View>
                    <TouchableHighlight onPress={()=>{navigation.navigate('StudentPDFScreen')}} underlayColor="rgba(0,0,0,0.01)">
                        <View style={{flexDirection:"row",alignItems:"center",height:64}}>
                            <Icon name="acrobat-reader" style={{fontSize:20,marginRight:16}}/>
                            <View>
                                <Text style={{fontSize:18,fontWeight:"bold"}}>PDF</Text>
                                <Text style={{fontSize:12,color:"gray"}}>Question papers, Notes etc.</Text>
                            </View>
                            <Icon name="angle-right" style={{marginLeft:"auto",marginRight:12}}/>
                        </View>
                    </TouchableHighlight>
                    <View style={{height:1,backgroundColor:"rgba(0,0,0,0.1)"}}></View>
                    <TouchableHighlight onPress={()=>{navigation.navigate('StudentBookmarkedVideoScreen')}} underlayColor="rgba(0,0,0,0.01)">
                        <View style={{flexDirection:"row",alignItems:"center",height:64}}>
                            <Icon name="bookmark" style={{fontSize:20,marginRight:16}}/>
                            <View>
                                <Text style={{fontSize:18,fontWeight:"bold"}}>Bookmared Videos</Text>
                                <Text style={{fontSize:12,color:"gray"}}>Videos you have bookmarked</Text>
                            </View>
                            <Icon name="angle-right" style={{marginLeft:"auto",marginRight:12}}/>
                        </View>
                    </TouchableHighlight>
                    <View style={{height:1,backgroundColor:"rgba(0,0,0,0.1)"}}></View>
                    <TouchableHighlight onPress={()=>{navigation.navigate('AboutScreen')}} underlayColor="rgba(0,0,0,0.01)">
                        <View style={{flexDirection:"row",alignItems:"center",height:64}}>
                            <Icon name="info" style={{fontSize:20,marginRight:16}}/>
                            <View>
                                <Text style={{fontSize:18,fontWeight:"bold"}}>About Us</Text>
                                <Text style={{fontSize:12,color:"gray"}}>Know About PR Bio Classes</Text>
                            </View>
                            <Icon name="angle-right" style={{marginLeft:"auto",marginRight:12}}/>
                        </View>
                    </TouchableHighlight>
                    <View style={{height:1,backgroundColor:"rgba(0,0,0,0.1)"}}></View>
                    <TouchableHighlight onPress={()=>{navigation.navigate('PrivacyPolicyScreen')}} underlayColor="rgba(0,0,0,0.01)">
                        <View style={{flexDirection:"row",alignItems:"center",height:64}}>
                            <Icon name="fire" style={{fontSize:20,marginRight:16}}/>
                            <View>
                                <Text style={{fontSize:18,fontWeight:"bold"}}>Privacy Policy</Text>
                                <Text style={{fontSize:12,color:"gray"}}>Privacy Policy of PR Bio Classes</Text>
                            </View>
                            <Icon name="angle-right" style={{marginLeft:"auto",marginRight:12}}/>
                        </View>
                    </TouchableHighlight>
                    <View style={{height:1,backgroundColor:"rgba(0,0,0,0.1)"}}></View>
                    <TouchableHighlight onPress={()=>{navigation.navigate('TermsAndConditionsScreen')}} underlayColor="rgba(0,0,0,0.01)">
                        <View style={{flexDirection:"row",alignItems:"center",height:64}}>
                            <Icon name="file-1" style={{fontSize:20,marginRight:16}}/>
                            <View>
                                <Text style={{fontSize:18,fontWeight:"bold"}}>Terms And Conditions</Text>
                                <Text style={{fontSize:12,color:"gray"}}>T&amp;C of PR Bio Classes</Text>
                            </View>
                            <Icon name="angle-right" style={{marginLeft:"auto",marginRight:12}}/>
                        </View>
                    </TouchableHighlight>
                    <View style={{height:1,backgroundColor:"rgba(0,0,0,0.1)"}}></View>
                    {/* <View style={{flexDirection:"row",alignItems:"center",height:64}}>
                        <Icon name="player-settings" style={{fontSize:20,marginRight:16}}/>
                        <View>
                            <Text style={{fontSize:18}}>Settings</Text>
                        </View>
                        <Icon name="angle-right" style={{marginLeft:"auto",marginRight:12}}/>
                    </View> */}
                    {/* <View style={{height:1,backgroundColor:"rgba(0,0,0,0.1)"}}></View> */}
                    <TouchableHighlight onPress={()=>{Share.share({"message":"App Link Will go here","title":"Share PR Biology Classes App"})}} underlayColor="rgba(0,0,0,0.01)">
                        <View style={{flexDirection:"row",alignItems:"center",height:64}}>
                            <Icon name="share" style={{fontSize:20,marginRight:16}}/>
                            <View>
                                <Text style={{fontSize:18}}>Refer a Friend</Text>
                            </View>
                            <Icon name="angle-right" style={{marginLeft:"auto",marginRight:12}}/>
                        </View>
                    </TouchableHighlight>
                    <View style={{height:1,backgroundColor:"rgba(0,0,0,0.1)"}}></View>
                    <TouchableHighlight onPress={()=>{navigation.navigate("HelpScreen")}} underlayColor="rgba(0,0,0,0.01)">
                        <View style={{flexDirection:"row",alignItems:"center",height:64}}>
                            <Icon name="question" style={{fontSize:20,marginRight:16}}/>
                            <View>
                                <Text style={{fontSize:18}}>Help</Text>
                            </View>
                            <Icon name="angle-right" style={{marginLeft:"auto",marginRight:12}}/>
                        </View>
                    </TouchableHighlight>
                  
                </View>
                <View style={{height:1,backgroundColor:"rgba(0,0,0,0.1)"}}></View>
                <TouchableHighlight onPress={handleLogout} underlayColor="white" activeOpacity={0.6}>
                    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",height:64}}>
                        <View>
                            <Text style={{fontSize:18,color:colorPrimary}}>LOGOUT</Text>
                        </View>
                    </View>
                </TouchableHighlight>
                {/* <View style={{height:1,backgroundColor:"rgba(0,0,0,0.1)"}}></View> */}
            </ScrollView>

        </View>
    )
}

export default InstituteProfileScreen;