import React from 'react';
import { View ,StatusBar,Text, ScrollView,Image, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import { colorPrimary } from '../../../constants/colors';
import { instituteCustomRequest} from '../../../functions/request';
import { width } from '../../../constants/dimensions';

export default function InstituteGalleryScreen(){
    const navigation = useNavigation();
    let [courses,setCourses] = React.useState(null);
    let [loading,setLoading] = React.useState(true);

    React.useEffect(()=>{
        instituteCustomRequest('galleries').then((res)=>{
            console.log(res);
            setLoading(false);
            if(res['data'].length === 0){
                setCourses(
                    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <Image source={require('../../../assets/booklover.png')} style={{height:240,width:260,resizeMode:"contain"}}/>
                        <Text style={{textAlign:"center",fontSize:16}}>You haven't added any{'\n'}image in your gallery</Text>
                    </View>
                )
            }else{
                setCourses(
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{flex:1,marginHorizontal:6,flexDirection:"row",justifyContent:"space-between",width:width - 12,flexWrap:"wrap"}}>
                        {
                            res['data'].map((gallery)=>{
                                return (
                                    <View key={gallery['id']} style={{width:(width-12)/2 - 3,elevation:1,borderRadius:5,overflow:"hidden",marginVertical:4,mbackgroundColor:"white"}}>
                                        <Image source={{uri:gallery['img']}} style={{height:160,width:(width-12)/2 - 3,resizeMode:"cover"}}/>
                                    </View>
                                )
                            })
                        }
                        </View>
                    </ScrollView>
                )
            }
        })
    },[]);

    return (
        <View style={{flex:1}}>
            <View style={{height:60,backgroundColor:"white",flexDirection:"row",justifyContent:"space-between",alignItems:"center",paddingHorizontal:16,elevation:1}}>
                <StatusBar backgroundColor={colorPrimary}/>
                <Text style={{fontSize:20,color:colorPrimary}}>Gallery</Text>
                <Icon  name="add" size={24} color={colorPrimary} onPress={()=>{navigation.navigate('AddGalleryScreen')}}/>
            </View>
            <View style={{flex:1}}>
                {loading ? 
                    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <ActivityIndicator size="large" color={colorPrimary}/>
                    </View>
                : courses}
            </View>
        </View>
    )
}