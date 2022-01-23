import React from 'react';
import {View,Text, SafeAreaView,Image, ScrollView} from 'react-native';
import Header from '../../components/header';

const AboutScreen = ()=>{
    return (
        <View style={{flex:1,backgroundColor:"rbga(0,0,255,0.1)"}}>
            <Header pagename="About PR Bio Classes"/>
            <ScrollView >
                <Image source={require('../../assets/prlogo.png')} style={{height:120,width:160,resizeMode:"contain"}}/>
                <View style={{paddingHorizontal:16,marginBottom:14}}>
                    <Text style={{fontWeight:"bold",fontSize:16,marginTop:12}}>
                    Rupesh Kumar {'\n'}
(Msc. Botany, B.Ed, CTET, BSTET Qualified){'\n'}
8+ Years of teaching experience in biology.
</Text>
                    
                    {/* <Text style={{fontSize:18,fontWeight:"bold",marginTop:16}}>Follow us on</Text> */}
                    {/* <View style={{flexDirection:"row",marginVertical:12}}>
                        <Icon name="facebook" size={32} color="gray"style={{paddingHorizontal:8}}/>
                        <Icon name="twitter" size={32} color="gray" style={{paddingHorizontal:8}}/>
                        <Icon name="youtube-play" size={32} color="gray" style={{paddingHorizontal:8}}/>
                    </View> */}

                </View>
            </ScrollView>
        </View>
    )
}

export default AboutScreen;