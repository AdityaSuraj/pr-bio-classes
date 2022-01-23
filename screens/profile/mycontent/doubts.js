import React from 'react';
import {View,Text, SafeAreaView,Image, ScrollView,TextInput,TouchableOpacity,ActivityIndicator} from 'react-native';
import Header from '../../../components/header';
import { colorPrimary } from '../../../constants/colors';
import {LinearGradient} from 'expo-linear-gradient';
import { height, width } from '../../../constants/dimensions';
import Icon from 'react-native-vector-icons/Fontisto';
import {Picker} from '@react-native-picker/picker';
import { getValueFromStorage } from '../../../functions/securestorage';
import { customRequestMultipart ,customRequest} from '../../../functions/request';
import * as ImagePicker from 'expo-image-picker';





function SubmitNewDoubt(props){
    let [selectedSubject,setSelectedSubject] = React.useState(null);
    let [comment,setComment] = React.useState("");
    let [file,setFile] = React.useState(new Array());
    let [images,setImages] = React.useState(null);
    let [user,setUser] = React.useState(null);
    let [loading,setLoading] = React.useState(false);
    let [subjects,setSubjects] = React.useState(null);

    React.useEffect(()=>{
        getValueFromStorage('studentdetail').then((value)=>{
            setUser(value);
        })
        customRequest('subjects').then((subjects)=>{
            setSelectedSubject(subjects[0]['id'])
            setSubjects(
                subjects.map((subject)=>{
                    return <Picker.Item key={subject['id']} value={subject['id']} label={subject['name']}/>
                })
            )
        })
    },[])

    const handleFilePick = ()=>{
        ImagePicker.launchImageLibraryAsync({mediaTypes:ImagePicker.MediaTypeOptions.Images,allowsEditing:true,allowsMultipleSelection:true}).then((res)=>{
           if(res.cancelled == false){
               let files = file;
               files.push(res);
                setFile(
                    files
                );
                setImages(
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {
                        file.map((img)=>{
                            return (
                                <Image key={Math.random()} source={{uri:img.uri}} style={{height:120,width:70,resizeMode:"contain"}}/>
                            )
                        })
                    }
                    </ScrollView>
                )
           }
        })
        console.log(file);
    }
    
    function handleSubmit(){
        if(selectedSubject === null || comment === ""){
            alert("Add comment to your homework");
        }else if(file.length === 0 ){
            alert('Select images to upload');
        }else{

            setLoading(true);
            let formData = new FormData();
            formData.append('user_id',user['id']);
            formData.append('comment',comment)
            formData.append('subject_id',selectedSubject);
            let index = 0;
            file.forEach((file)=>{
                formData.append(`file[${index}]`,{uri:file.uri,name:file.uri.toString().split('/')[file.uri.toString().split('/').length - 1],type:'image/jpg'});
                index = index + 1;
            })
            customRequestMultipart('submitdoubt',formData).then((res)=>{
                setLoading(false);
                if(res['msg'] === "success" ){
                    setComment("");
                    setFile(new Array());
                    setImages(<View/>);
                    alert('Your doubt submitted successfully, teacher will respond soon');
    
                }else{
                    alert('Something went wrong! Kindly try to submit again');
                }
            })
        }
    }

    return (
        <View style={{flex:1,padding:8}}>
            {loading ? 
                <View style={{position:"absolute",zIndex:4,top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0,0,0,0.1)",justifyContent:"center",alignItems:"center"}}>
                    <ActivityIndicator color={colorPrimary} size="large"/>
                </View>
            : <View/>}
            <View style={{paddingHorizontal:8,paddingVertical:4,backgroundColor:"white",borderRadius:5}}>
                <Picker selectedValue={selectedSubject}
                    onValueChange={(value,index)=>{
                        setSelectedSubject(value);
                    }}
                >
                    {subjects}
                </Picker>
            </View>
            <View style={{marginLeft:"auto",width:width - 16,paddingHorizontal:16,paddingVertical:12,backgroundColor:"white",borderRadius:5,marginVertical:6}}>
                    <TextInput multiline={true} value={comment} numberOfLines={8} placeholder="Doubt" onChangeText={(val)=>{setComment(val)}}/>
            </View>
            {file === null? <View/> : images}
            <TouchableOpacity onPress={handleFilePick} activeOpacity={0.6}>
                <View style={{marginLeft:"auto",width:width - 16,paddingHorizontal:16,paddingVertical:12,backgroundColor:"white",borderRadius:5,marginVertical:6}}>
                    <Text style={{color:colorPrimary,fontWeight:"bold",textAlign:"center"}}>Select doubt image</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit} activeOpacity={0.6}>
                <View style={{marginLeft:"auto",marginRight:"auto",paddingHorizontal:16,paddingVertical:12,backgroundColor:colorPrimary,borderRadius:5,marginVertical:6}}>
                    <Text style={{color:"white",fontWeight:"bold",textAlign:"center"}}>Submit Doubt</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

function OpenDoubts(props){
    if(props.open.length === 0) {
        return ( 
            <View style={{flex:1,alignItems:"center",justifyContent:"center",height:height - 240}}>
                <Icon name="yacht" size={64} color={colorPrimary}/>
                <Text style={{textAlign:"center",color:"gray",marginTop:12}}>It seems you have not asked any doubt {'\n'} yet or your doubts are in still open!</Text>
            </View>
        )
    }else{
        return (
            <View>
            {
                props.open.map((open)=>{
                    return (
                        <View key={open['id']} style={{padding:8,marginVertical:2,marginHorizontal:8,backgroundColor:"white"}}>
                            <Text style={{fontSize:18,fontWeight:"bold"}}>{open['subject_name']}</Text>
                            <Text style={{marginVertical:6,marginHorizontal:6,fontSize:16
                            }}>{open['doubt']}</Text>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                {
                                    open['images'].map((img)=>{
                                        return (
                                            <Image key={Math.random()} source={{uri:img}} style={{height:100,width:90,resizeMode:"contain",marginHorizontal:3}}/>
                                        )
                                    })
                                }
                            </ScrollView>
                            <View style={{flexDirection:"row",alignItems:"center",marginTop:6}}>
                                    <Icon name="clock" size={12}/>
                                    <Text style={{marginLeft:6,fontWeight:"600",fontSize:12}}>{open['submit_ts']}</Text>
                            </View>
                        </View>
                    )
                })
            }
            </View>
        )
    }
}

function AnsweredDoubts(props){
    if(props.answered.length === 0) {
        return ( 
            <View style={{flex:1,alignItems:"center",justifyContent:"center",height:height - 240}}>
                <Icon name="yacht" size={64} color={colorPrimary}/>
                <Text style={{textAlign:"center",color:"gray",marginTop:12}}>It seems you have not asked any doubt {'\n'} yet or your doubts are in still open!</Text>
            </View>
        )
    }else{
        return (
            <View>
            {
                props.answered.map((answer)=>{
                    return (
                        <View key={answer['id']} style={{padding:8,marginVertical:3,marginHorizontal:6,backgroundColor:"white",borderRadius:5}}>
                            <Text style={{fontSize:18,fontWeight:"bold"}}>{answer['subject_name']}</Text>
                            <Text style={{marginVertical:6,marginHorizontal:6,fontSize:16
                            }}>{answer['doubt']}</Text>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                {
                                    answer['images'].map((img)=>{
                                        return (
                                            <Image key={Math.random()} source={{uri:img}} style={{height:100,width:90,resizeMode:"contain",marginHorizontal:3}}/>
                                        )
                                    })
                                }
                            </ScrollView>
                            <Text style={{fontSize:17,margin:6,padding:8,backgroundColor:colorPrimary,color:"white",borderRadius:5}}><Text style={{fontWeight:"bold",color:"yellow"}}>Teacher Response:</Text> {answer['teacher_answer']}</Text>
                            <View style={{flexDirection:"row",alignItems:"center",marginTop:3}}>
                                    <Icon name="clock" size={12}/>
                                    <Text style={{marginLeft:6,fontWeight:"600",fontSize:12}}>{answer['submit_ts']}</Text>
                            </View>
                        </View>
                    )
                })
            }
            </View>
        )
    }
}



const DoubtsScreen = ()=>{
    let [selectedTab,setSelectedTab] = React.useState('new');
    let [answered,setAnswered] = React.useState(new Array());
    let [open,setOpen] = React.useState(new Array());


    React.useEffect(()=>{
        let opendoubt = new Array();
        let ansdoubt = new Array();
        getValueFromStorage('studentdetail').then((user)=>{
            customRequest('mydoubts',{'user_id':user['id']}).then((res)=>{
                // console.log(res);
                res.forEach((doubt)=>{
                    if(doubt['teacher_answer'] == null){
                        opendoubt.push(doubt);
                    }else{
                        ansdoubt.push(doubt);
                    }
                })
                setOpen(opendoubt);
                setAnswered(ansdoubt);
            });
        })
    },[]);

    return (
        <View style={{flex:1}}>
            <Header pagename="Doubts"/>
            <ScrollView >
                <View style={{height:74,backgroundColor:"rgba(255,165,0,0.1)",flexDirection:"row",alignItems:"center",paddingHorizontal:16}}>
                    <TouchableOpacity onPress={()=>{setSelectedTab('new')}} activeOpacity={0.8}>
                        <View style={{paddingHorizontal:20,paddingVertical:6,backgroundColor:selectedTab === 'new' ? colorPrimary :"white",borderRadius:60,marginHorizontal:4}}>
                            <Text style={{color:selectedTab === 'new' ? 'white' : colorPrimary}}>New</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{setSelectedTab('open')}} activeOpacity={0.8}>
                        <View style={{paddingHorizontal:20,paddingVertical:6,backgroundColor:selectedTab === 'open' ? colorPrimary :"white",borderRadius:60,marginHorizontal:4}}>
                            <Text style={{color:selectedTab === 'open' ? 'white' :colorPrimary}}>OPEN</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{setSelectedTab('answered')}} activeOpacity={0.8}>
                        <View style={{paddingHorizontal:20,paddingVertical:6,backgroundColor:selectedTab === 'answered' ? colorPrimary :"white",borderRadius:60,marginHorizontal:4}}>
                            <Text style={{color:selectedTab === 'answered' ? 'white' :colorPrimary}}>ANSWERED</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {selectedTab === 'new' ? 
                    <SubmitNewDoubt/>:
                    selectedTab === 'open' ?
                        <OpenDoubts open={open}/> :
                            <AnsweredDoubts answered={answered}/>
                }
            
                
            </ScrollView>
        </View>
    )
}

export default DoubtsScreen;