import React,{useState} from 'react';
import {View,Text, ScrollView,Image,CheckBox, TouchableOpacity,BackHandler} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../../components/header';
import {useNavigation,useRoute} from '@react-navigation/native';
import { colorPrimary } from '../../../constants/colors';
import { width } from '../../../constants/dimensions';
import CountDown from 'react-native-countdown-component';
import RadioGroup from 'react-native-radio-buttons-group';
import { deleteFromStorage, getValueFromStorage, saveInStorage } from '../../../functions/securestorage';
import { customRequest } from '../../../functions/request';



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

        getValueFromStorage('quiz').then((quiz)=>{
            // console.log(quiz);
            if(quiz === null){
                setRbData(emptyop)
            }else{
                quiz.forEach((qz) => {
                    if(qz['qno'] !== props.ques['qno']){
                    }else{
                        setRbData(
                            [
                                {
                                    'id':"1",
                                    'label':props.ques['a'],
                                    'value':'a',
                                    'selected': qz['selectedoption'] === 'a' ? true :false,
                                },
                                {
                                    'id':"2",
                                    'label':props.ques['b'],
                                    'value':'b',
                                    'selected': qz['selectedoption'] === 'b' ? true :false,
                                },
                                {
                                    'id':"3",
                                    'label':props.ques['c'],
                                    'value':'c',
                                    'selected': qz['selectedoption'] === 'c' ? true :false,
                                },
                                {
                                    'id':"4",
                                    'label':props.ques['d'],
                                    'value':'d',
                                    'selected': qz['selectedoption'] === 'd' ? true :false,
                                }
                            ]
                        )
                    }
                });
            }
        })
        
        BackHandler.addEventListener('hardwareBackPress',()=>{
            deleteFromStorage('quiz')
        })

    },[props.ques,props.deselect])


    function handleAnswer(options){
        options.forEach((op)=>{
            if(op['selected']){
                getValueFromStorage('quiz').then((v)=>{
                    if(v == null){
                        saveInStorage('quiz',JSON.stringify([{"qno":props.ques['qno'],'selectedoption':op['value']}]));
                    }else{
                        let qz = v;
                        let qninarr = new Array();
                        qz.forEach((qu)=>{
                            qninarr.push(qu['qno']);
                        })
                        if(!(qninarr.includes(props.ques['qno']))){
                            qz.push({"qno":props.ques['qno'],'selectedoption':op['value']})
                        }else{
                            qz.forEach((qu,index)=>{
                                if(qu['qno'] === props.ques['qno']){
                                    qz[index]['selectedoption']  = op['value'];
                                }
                            })
                        }
                        saveInStorage('quiz',JSON.stringify(qz));
                    }
                })
            }
        })
    }

    return (
        <View>
            <Text style={{color:"green",fontWeight:"bold"}}>Q{props.ques['qno']}</Text>
            <View style={{padding:12,backgroundColor:"white",marginVertical:6,borderRadius:4,elevation:1}}>
                <Text style={{fontSize:17,fontWeight:"600"}}>{props.ques['question']}</Text>
                <View style={{alignItems:"flex-start",paddingVertical:6}}>
                    <RadioGroup onPress={handleAnswer}  radioButtons={rbData}/>
                </View>
            </View>
        </View>
    )
}


export default function QuizScreen(){
    const route = useRoute();
    const navigation = useNavigation();
    let [questions,setQuestions] = React.useState(null);
    let [currentQuestion,setCurrentQuestion] = React.useState(JSON.parse(route.params.data['mcqs'])[0]);
    let [deselectStat,setDeslectStat] = React.useState(false);

    React.useEffect(()=>{
        setQuestions(
            JSON.parse(route.params.data['mcqs']).map((que)=>{
                return (
                    <TouchableOpacity key={que['qno']} onPress={()=>{setCurrentQuestion(que)}}>
                        <View style={{height:34,width:34,backgroundColor:currentQuestion['qno'] == que['qno'] ? "dodgerblue" :  "white",alignItems:"center",justifyContent:"center",elevation:1,borderRadius:3,margin:4}}>
                            <Text style={{color:currentQuestion['qno'] === que['qno'] ? "white" : "black"}}>Q{que['qno']}</Text>
                        </View>
                    </TouchableOpacity>
                )
            })
        )
    },[currentQuestion])

    function handleDeselect(){
        let current = currentQuestion;
        current['deselect'] = true;
        getValueFromStorage('quiz').then((quiz)=>{
            if(quiz !== null){
                let filtered = quiz.filter((val,index)=>{
                    return val['qno'] !==  currentQuestion['qno'];
                })
                console.log(filtered);
                saveInStorage('quiz',JSON.stringify(filtered));
                setDeslectStat(!deselectStat);
            }
        })
    }

    function handleNextQues(){
        JSON.parse(route.params.data['mcqs']).forEach((mcq,index) => {
            if(mcq['qno'] === currentQuestion['qno']){
                if((JSON.parse(route.params.data['mcqs']).length -1) !== index){
                    setCurrentQuestion(JSON.parse(route.params.data['mcqs'])[index+1])
                }
            }
        });
    }

    function handleEndTest(){
        getValueFromStorage('studentdetail').then((stu)=>{
            getValueFromStorage('quiz').then((quiz)=>{
                customRequest('submitmcq',{'user_id':stu['id'],'mcq_id':route.params.mcqid,'response':quiz}).then((res)=>{
                    console.log(res);
                })
            })
        })
    }

    return (
        <View style={{flex:1}}>
            <Header pagename={route.params.data['title']} isShowNotiBell={false}/>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{flexDirection:"row",alignItems:"center",height:84,backgroundColor:"rgba(255,165,0,0.1)",paddingHorizontal:12}}>
                    <View style={{width:width/2}}>
                        <Text style={{fontSize:22}}>{route.params.data['title']}</Text> 
                        <Text style={{color:"skyblue"}}>Read Instructions</Text>
                    </View>
                    <View>
                        <Image source={require("../../../assets/logo.png")} style={{width:width/2,resizeMode:"contain"}}/>
                    </View>
                </View>
                <View style={{backgroundColor:"rgba(0,165,255,0.1)",paddingHorizontal:12,flexDirection:"row",alignItems:"center",justifyContent:"space-between",height:54}}>
                    {/* <Text style={{fontSize:24,fontWeight:"bold",color:"gray"}}>{timer}</Text> */}
                    <CountDown
                        until={60 * route.params.data['duration']}
                        size={16}
                        onFinish={() => alert('Finished')}
                        digitStyle={{backgroundColor: '#FFF'}}
                        digitTxtStyle={{color: '#1CC625'}}
                        timeToShow={['M', 'S']}
                        timeLabels={{m: '', s: ''}}
                    />
                    <TouchableOpacity onPress={handleEndTest} activeOpacity={0.8}>
                        <View style={{backgroundColor:colorPrimary,paddingHorizontal:18,paddingVertical:4,borderRadius:3}}>
                            <Text style={{color:"white",fontWeight:"bold"}}>END TEST</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{backgroundColor:"rgba(0,165,255,0.4)",paddingHorizontal:12,height:12}}/>
                <View style={{paddingHorizontal:12,paddingVertical:12}}>
                    <Question ques={currentQuestion} deselect={deselectStat}/>
                    <Text style={{color:"green",fontWeight:"bold"}}>{route.params.subject}</Text>
                    <View style={{flexDirection:"row",flexWrap:"wrap"}}>
                        {questions}
                    </View>
                </View>
            </ScrollView>
            <View style={{bottom:0,width:width,height:44,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingHorizontal:12}}>
                <TouchableOpacity onPress={handleDeselect} activeOpacity={0.8}>
                    <View style={{backgroundColor:"rgba(0,0,0,0.1)",paddingHorizontal:12,paddingVertical:4,borderRadius:4}}>
                        <Text style={{fontWeight:"bold"}}>DESELECT</Text>
                    </View>
                </TouchableOpacity>
                {/* <View style={{backgroundColor:"rgba(0,0,0,0.1)",marginLeft:"auto",paddingHorizontal:12,paddingVertical:4,borderRadius:4}}>
                    <Text style={{fontWeight:"bold"}}>SKIP</Text>
                </View> */}
                <TouchableOpacity onPress={handleNextQues} activeOpacity={0.8} style={{marginLeft:"auto"}}>
                    <View style={{backgroundColor:"white",borderColor:"green",borderWidth:1,paddingHorizontal:12,paddingVertical:4,borderRadius:4}}>
                        <Text style={{fontWeight:"bold",color:"green"}}>SAVE &amp; NEXT</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}