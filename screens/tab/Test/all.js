import React from 'react';
import {View,Text, ScrollView, TouchableHighlight, TouchableOpacity,RefreshControl,Image, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colorPrimary } from '../../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import { getValueFromStorage } from '../../../functions/securestorage';
import { customRequest } from '../../../functions/request';
import { height, width } from '../../../constants/dimensions';


const AttempCard = (props)=>{
    const navigation = useNavigation()
    return (
        <View style={{borderColor:"rgba(0,0,0,0.1)",borderWidth:1,marginVertical:6,borderRadius:3,backgroundColor:"white"}}>
            <View style={{height:64,borderLeftColor:colorPrimary,borderWidth:2,borderBottomColor:"transparent",borderTopColor:"transparent",borderRightColor:"transparent",justifyContent:"center"}}>
                <Text style={{fontSize:20,marginLeft:12}}>{props.title == null ? "Special Friday Quiz" : props.title}</Text>
            </View>
            <View style={{paddingHorizontal:12,paddingVertical:12}}>
                <View style={{flexDirection:"row",alignItems:"center",marginBottom:12}}>
                    <Text style={{color:"gray"}}>Duration: {props.data['duration']} minutes</Text>
                    <Text style={{color:"gray",marginLeft:20}}>Total Marks: {props.data['total_marks']}</Text>
                </View>
                <View style={{backgroundColor:"rgba(0,0,0,0.1)",height:1}}/>
                <TouchableHighlight onPress={()=>{navigation.navigate('InstructionScreen',{data:props.data,subject:props.subject,mcqid:props.mcqid})}} underlayColor="transparent">
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
    const navigation = useNavigation();
    return (
    <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:12}}>
        <Text style={{fontWeight:"bold",fontSize:15}}>{props.title}</Text>
        {props.isShowViewAll == null ?
        <TouchableOpacity onPress={()=>{navigation.navigate('ViewAllAttempScreen',{title:props.title})}} activeOpacity={0.5} >
            <View style={{flexDirection:"row",alignItems:"center"}}>
                {/* <Text style={{color:"gray",fontSize:13,fontWeight:"bold"}}>VIEW ALL</Text> */}
                {/* <Icon name="chevron-right" size={16}/> */}
            </View>
        </TouchableOpacity> : <View/>
        }
    </View>
    )
}

export default function AllTabScreen(){
    let [subjects,setSubjects] = React.useState(
        <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
            <ActivityIndicator color={colorPrimary} size="large" />
        </View>
    );
    const [refreshing, setRefreshing] = React.useState(false);
    let [loading,setLoading] = React.useState(true);

    
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getMCQs().then((v)=>{
            setRefreshing(false)
        })
    }, []);

    async function getMCQs(){
        // setSubjects(
           
        // );
        getValueFromStorage('studentdetail').then((user)=>{
            customRequest('mcqs',{'class_id':user['class_id'],'student_id':user['id'],'school_id':user['school_id']}).then((res)=>{
                setLoading(false);
                if(res.length == 0){
                    setSubjects(
                        <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                            <Image source={require('../../../assets/test.png')} style={{resizeMode:"contain",height:180,width:width}}/>
                            <Text style={{fontSize:15,textAlign:"center",fontWeight:"bold",color:colorPrimary}}>Currently no any {'\n'}online test for you.</Text>
                        </View>
                    )
                }else{
                    setSubjects(
                        <ScrollView showsVerticalScrollIndicator={false } refreshControl={<RefreshControl refreshing={refreshing}
                                onRefresh={onRefresh}/>}>
                            <View style={{paddingHorizontal:12,paddingVertical:12}}>
                               { res.map((subject)=>{
                                    return (
                                        <View key={Math.random()}>
                                            <AttempTitle title={subject['subject_name']}/>
                                            <AttempCard title={subject['mcqs'][0]['title']} mcqid={subject['mcqs'][0]['id']} data={subject['mcqs'][0]} subject={subject['subject_name']}/>
                                        </View>
                                    )
                               
                            })
                        }
                        </View>
                        </ScrollView> 
                    )
                }
            })
        })
    }

    React.useEffect(()=>{
       getMCQs()
    },[])



    return (
        <View style={{flex:1}}>
            {subjects}
                    {/* <AttempTitle title="DAILY TRIVIA CHALLANGE" isShowViewAll={false}/>
                    <AttempCard title="Friday Special Quiz"/>
                    <AttempTitle title="JEE TRIVIA CHALLANGE"/>
                    <AttempCard title="Basic Maths Quiz"/>
                    <AttempTitle title="NEET TRIVIA CHALLANGE"/>
                    <AttempCard title="Baisc Biology Quiz"/> */}
              
        </View>
    )
}