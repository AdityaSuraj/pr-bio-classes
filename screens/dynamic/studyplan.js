import React from 'react';
import {View,Text,ScrollView, TouchableOpacity, ActivityIndicator,Modal,Image} from 'react-native';
import Header from '../../components/header';
import { colorPrimary } from '../../constants/colors';
import { height, width } from '../../constants/dimensions';
import { customRequest } from '../../functions/request';
import {useNavigation} from '@react-navigation/native';

export default function StudyPlanScreen(){
    let [plans,setPlans] = React.useState(null);
    let [loading,setLoading] = React.useState(true);
    const [modalVisible, setModalVisible] = React.useState(false);
    const navigation = useNavigation();


    function handleBuyPlan(planid){
        setModalVisible(true);
        customRequest('createpaymentlink',{'plan_id':planid}).then((res)=>{
            console.log(res);
            navigation.navigate('PaymentScreen',{link:res['payment_link']});
        })
    }

    React.useEffect(()=>{
        customRequest('studyplan').then((res)=>{
            console.log(res);
            setLoading(false);
            if(res.length == 0){
                setPlans(
                    <View style={{height:height - 100,width:width- 12,justifyContent:"center"}}>
                        <Image source={require('../../assets/payment.png')} style={{height:240,width:width - 12,resizeMode:'contain'}}/>
                        <Text style={{textAlign:"center",fontSize:16,color:colorPrimary}}>Oops! Currently no{'\n'}any payment plan available</Text>
                    </View>
                )
            }else{
                setPlans(
                    res.map((plan)=>{
                        return (
                            <View key={plan['id']} style={{width:width - 12,backgroundColor:"white",borderRadius:5,overflow:"hidden",marginVertical:4}}>
                                <View style={{borderRightWidth:3,borderLeftWidth:3,borderRightColor:colorPrimary,borderLeftColor:colorPrimary,padding:12}}>
                                    <Text style={{fontSize:20,fontWeight:"bold"}}>{plan['name']}</Text>
                                </View>
                                <View style={{padding:8}}>
                                    <Text style={{fontSize:16}}>{plan['description']}</Text>
                                    <Text style={{fontSize:14,fontWeight:"bold",color:"gray"}}>Validity: {plan['validity']} days</Text>
                                    <Text style={{fontSize:20,fontWeight:"bold",color:colorPrimary}}>₹{plan['price']}</Text>
                                    <TouchableOpacity style={{alignSelf:"flex-end"}} activeOpacity={0.8} onPress={handleBuyPlan.bind(this,plan['id'])}>
                                        <Text style={{fontSize:16,fontWeight:"bold",color:"white",backgroundColor:colorPrimary,borderRadius:5,paddingVertical:8,paddingHorizontal:16}}>Buy Now</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })
                )
            }
        })
    },[])

    return (
        <View style={{flex:1}}>
            <Header pagename="Study Plans"/>
            <Modal
                animationType="none"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
                >
                    <View style={{flex:1,alignItems:"center",justifyContent:"center",'alignItems':"center"}}>
                        <View style={{height:94,width:94,backgroundColor:"white",padding:12,borderRadius:5,elevation:2,justifyContent:"center"}}>
                            <ActivityIndicator color={colorPrimary} size="large"/>
                            <Text style={{color:colorPrimary,marginTop:6}}>Processing</Text>
                        </View>
                    </View>
            </Modal>
                {loading ? 
                <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                    <ActivityIndicator color={colorPrimary} size="large"/>
                </View>
                :
                <View style={{flex:1,paddingHorizontal:6}}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {plans}
                    </ScrollView>
                </View>
                }
        </View>
    )
}