import React from 'react';
import {View,Text, ActivityIndicator,TouchableHighlight, ScrollView,Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colorPrimary } from '../../../constants/colors';
import { customRequest } from '../../../functions/request';
import {useNavigation} from '@react-navigation/native';
import { height, width } from '../../../constants/dimensions';



export default function AttemptedTabScreen () {
    let [isLoading,setIsLoading] = React.useState(true);
    let [attemptedCard,setAttemptedCard] = React.useState(null);
    const navigation = useNavigation();
  
    React.useEffect(()=>{
      customRequest('attemptedmcq').then((res)=>{
        setIsLoading(false);
        if(res.length === 0){
          setAttemptedCard(
            <AfterLoadingAttempted/>
          )
        }else{
          setAttemptedCard(
            res.map((que)=>{
              return (
              <View key={que['id']} style={{borderColor:"rgba(0,0,0,0.1)",borderWidth:1,marginVertical:6,borderRadius:3,backgroundColor:"white"}}>
                  <View style={{height:64,borderLeftColor:colorPrimary,borderWidth:2,borderBottomColor:"transparent",borderTopColor:"transparent",borderRightColor:"transparent",justifyContent:"center"}}>
                      <Text style={{fontSize:20,marginLeft:12}}>{que['mcqitem']['title']}</Text>
                  </View>
                  <View style={{paddingHorizontal:12,paddingVertical:12}}>
                      <View style={{flexDirection:"row",alignItems:"center",marginBottom:12}}>
                          <Text style={{color:"gray"}}>Duration: {que['mcqitem']['duration']} minutes</Text>
                          <Text style={{color:"gray",marginLeft:20}}>Total Marks: {que['mcqitem']['total_marks']}</Text>
                      </View>
                      <View style={{flexDirection:"row",alignItems:"center",marginBottom:12}}>
                          <Text style={{color:"gray"}}>Marks Obtained: {que['marks_obtain']}</Text>
                      </View>
                      <View style={{backgroundColor:"rgba(0,0,0,0.1)",height:1}}/>
                      <TouchableHighlight onPress={()=>{navigation.navigate('ViewAnswerScreen',{title:que['mcqitem']['title'],mcq:que})}} underlayColor="transparent">
                          <View style={{alignSelf:"flex-end",alignItems:"center",flexDirection:"row",marginTop:12}}>
                              <Text style={{color:colorPrimary,fontSize:16}}>SHOW ANSWER</Text>
                              <Icon name="chevron-right" size={22} color={colorPrimary}/>
                          </View>
                      </TouchableHighlight>
                  </View>
              </View>
              )
            })
          )
        }
    })
      },[])
    
    return (
      <View style={{ flex: 1}} >
        {
          isLoading ? 
          <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <ActivityIndicator size="large" color={colorPrimary}/> 
          </View>
          :
          <View style={{paddingHorizontal:6}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {attemptedCard}
            </ScrollView>
          </View>
        }
      </View>
    )
  }
  
  const AfterLoadingAttempted = ()=>{
    return (
      <View style={{flex:1,alignItems:"center",justifyContent:"center",height:height - 192}}>
        <Image source={require('../../../assets/exam.png')} style={{width:width- 16,height:240,resizeMode:"contain"}}/>
        <Text style={{textAlign:"center",color:colorPrimary,fontSize:16}}>Opps! It seems you haven't {'\n'} attempted any test yet!</Text>
      </View>
    )
  }