import React from 'react';
import {View,Text, ActivityIndicator,ScrollView} from 'react-native';
import Header from '../../../components/header';
import { colorPrimary } from '../../../constants/colors';
import AttemptedTabScreen from './../Test/attempted';
import AllTabScreen from './../Test/all';
import {useRoute}  from '@react-navigation/native';
import RadioGroup from 'react-native-radio-buttons-group';




function Question(props){
  let [rbData,setRbData] = React.useState([]);

  React.useEffect(()=>{
      let emptyop = [
          {
              'id':"1",
              'label':props.ques['a'],
              'value':'a'
          },
          {
              'id':"2",
              'label':props.ques['b'],
              'value':'b'
          },
          {
              'id':"3",
              'label':props.ques['c'],
              'value':'c'
          },
          {
              'id':"4",
              'label':props.ques['d'],
              'value':'d'
          }
      ]
      setRbData(emptyop)
      JSON.parse(props.response).forEach(res => {
        if(res['qno'] === props.ques['qno']){
        setRbData(
              [
                  {
                      'id':"1",
                      'label':props.ques['a'],
                      'value':'a',
                      'selected': res['selectedoption'] === 'a' ? true :false,
                  },
                  {
                      'id':"2",
                      'label':props.ques['b'],
                      'value':'b',
                      'selected': res['selectedoption'] === 'b' ? true :false,
                  },
                  {
                      'id':"3",
                      'label':props.ques['c'],
                      'value':'c',
                      'selected': res['selectedoption'] === 'c' ? true :false,
                  },
                  {
                      'id':"4",
                      'label':props.ques['d'],
                      'value':'d',
                      'selected': res['selectedoption'] === 'd' ? true :false,
                  }
              ]
          )
        }
      });

     
      
  },[props.ques,props.response])

  return (
      <View style={{padding:12,backgroundColor:"white",marginVertical:3,borderRadius:2,elevation:1}}>
          <View >
              <Text style={{fontSize:17,fontWeight:"600"}}><Text style={{color:"green",fontWeight:"bold"}}>Q{props.ques['qno']}. </Text>{props.ques['question']}</Text>
              <View style={{alignItems:"flex-start",paddingVertical:6}}>
                  <RadioGroup radioButtons={rbData}/>
                  <View style={{position:"absolute",top:0,left:0,right:0,bottom:0,backgroundColor:"transparent"}}></View>
              </View>
          </View>
          {
            JSON.parse(props.response).map(soln => {
              if(soln['qno'] === props.ques['qno']){
                if(soln['selectedoption'] === props.ques['correct_option']){
                  return <Text key={soln['qno']} style={{color:"green"}}>Your answer is correct</Text>
                }else{
                  return <Text key={soln['qno']} style={{color:"red"}}>Wrong answer{'\n'}Correct answer is option: {props.ques['correct_option']}</Text>
                }
              }else{
                return <View key={soln['qno']}/>
              }
            })
          }
      </View>
  )
}



function ViewAnswerScreen() {
  const route = useRoute();
  let [mcq,setMcq] = React.useState(null);

  React.useEffect(()=>{
    console.log(route.params.mcq['response'])
    setMcq(
      JSON.parse(route.params.mcq['mcqitem']['mcqs']).map((que)=>{

        return <Question key={que['id']} ques={que} response={route.params.mcq['response']}/>
      })
    )

  },[])

  return (
    <View style={{flex:1}}>
      <Header pagename={route.params.title}/>
      <View style={{flex:1,paddingHorizontal:6}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {mcq}
        </ScrollView>
      </View>
    </View>
  );
}

export default ViewAnswerScreen;